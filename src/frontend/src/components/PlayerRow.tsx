import { Badge } from "@/components/ui/badge";
import type { PlayerView, TeamView } from "../types";

interface PlayerRowProps {
  player: PlayerView;
  teams: TeamView[];
  rank?: number;
}

const positionColors: Record<string, string> = {
  Goalkeeper: "bg-accent/15 text-accent-foreground border-accent/30",
  Defender: "bg-primary/10 text-primary border-primary/20",
  Midfielder: "bg-secondary/10 text-secondary border-secondary/20",
  Forward: "bg-destructive/10 text-destructive border-destructive/20",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PlayerRow({ player, teams, rank }: PlayerRowProps) {
  const team = teams.find((t) => t.id === player.teamId);
  const initials = getInitials(player.name);
  const color = team?.color || "#6366f1";
  const positionClass =
    positionColors[player.position] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
      data-ocid="player-row"
    >
      {/* Rank */}
      {rank !== undefined && (
        <span className="text-xs font-mono text-muted-foreground w-5 text-center shrink-0">
          {rank}
        </span>
      )}

      {/* Avatar */}
      <div
        className="h-9 w-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
        style={{ backgroundColor: color }}
        aria-hidden
      >
        {initials}
      </div>

      {/* Name + team */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">
          {player.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {team?.name ?? "Unknown team"}
        </p>
      </div>

      {/* Jersey number */}
      <div className="shrink-0 flex flex-col items-center">
        <span className="text-lg font-bold font-mono leading-none text-foreground tabular-nums">
          {player.number.toString()}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
          No.
        </span>
      </div>

      {/* Position badge */}
      <Badge
        variant="outline"
        className={`shrink-0 text-xs font-medium hidden sm:inline-flex ${positionClass}`}
      >
        {player.position}
      </Badge>
    </div>
  );
}

// Compact table row variant for team detail page
interface PlayerTableRowProps {
  player: PlayerView;
  index: number;
}

export function PlayerTableRow({ player, index }: PlayerTableRowProps) {
  const positionClass =
    positionColors[player.position] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <tr
      className="border-t border-border hover:bg-muted/20 transition-colors"
      data-ocid="player-table-row"
    >
      <td className="px-4 py-3 text-xs font-mono text-muted-foreground text-right w-10">
        {index + 1}
      </td>
      <td className="px-4 py-3 font-bold font-mono tabular-nums text-right w-12">
        {player.number.toString()}
      </td>
      <td className="px-4 py-3 font-display font-semibold text-sm">
        {player.name}
      </td>
      <td className="px-4 py-3 text-right">
        <Badge
          variant="outline"
          className={`text-xs font-medium ${positionClass}`}
        >
          {player.position}
        </Badge>
      </td>
    </tr>
  );
}
