import { ChevronRight, Users } from "lucide-react";
import type { TeamView } from "../types";

interface TeamCardProps {
  team: TeamView;
  playerCount?: number;
  onClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamCard({ team, playerCount, onClick }: TeamCardProps) {
  const initials = getInitials(team.name);
  const color = team.color || "#6366f1";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left rounded-lg border border-border bg-card hover:shadow-elevated transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid="team-card"
      aria-label={`View ${team.name} details`}
    >
      {/* Color accent banner */}
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Team crest / initials */}
          <div
            className="h-12 w-12 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
              {team.name}
            </h3>
            {playerCount !== undefined && (
              <p className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <Users className="h-3 w-3" aria-hidden />
                {playerCount} {playerCount === 1 ? "player" : "players"}
              </p>
            )}
          </div>

          <ChevronRight
            className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150"
            aria-hidden
          />
        </div>

        {/* Color swatch label */}
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          <span className="text-xs text-muted-foreground font-mono truncate">
            {color}
          </span>
        </div>
      </div>
    </button>
  );
}
