import type { LeagueStandingRow, TeamView } from "../types";
import { SkeletonRow } from "./LoadingSpinner";

interface StandingsTableProps {
  standings: LeagueStandingRow[];
  teams?: TeamView[];
  isLoading?: boolean;
  highlightTeamId?: bigint;
  compact?: boolean;
}

function PositionBadge({ pos }: { pos: number }) {
  if (pos === 1)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-[11px] font-bold text-accent-foreground">
        {pos}
      </span>
    );
  if (pos === 2)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted border border-border text-[11px] font-bold text-muted-foreground">
        {pos}
      </span>
    );
  if (pos === 3)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-chart-5/10 border border-chart-5/30 text-[11px] font-bold text-chart-5">
        {pos}
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center text-[11px] font-medium text-muted-foreground">
      {pos}
    </span>
  );
}

function TeamColorDot({
  teams,
  teamId,
}: { teams?: TeamView[]; teamId: bigint }) {
  const team = teams?.find((t) => t.id === teamId);
  if (!team) return null;
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
      style={{ backgroundColor: team.color || "#6b7280" }}
    />
  );
}

export function StandingsTable({
  standings,
  teams,
  isLoading = false,
  highlightTeamId,
  compact = false,
}: StandingsTableProps) {
  const headerCls =
    "px-3 py-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-right";
  const cellCls =
    "px-3 py-3 text-sm tabular-nums text-right text-muted-foreground";
  const cellNumBold =
    "px-3 py-3 text-sm tabular-nums text-right font-bold text-foreground";

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse" aria-label="League standings">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className={`${headerCls} text-left w-8`}>#</th>
            <th className={`${headerCls} text-left min-w-[120px]`}>TEAM</th>
            <th className={headerCls}>MP</th>
            <th className={headerCls}>W</th>
            <th className={headerCls}>D</th>
            <th className={headerCls}>L</th>
            {!compact && <th className={headerCls}>GF</th>}
            {!compact && <th className={headerCls}>GA</th>}
            <th className={headerCls}>GD</th>
            <th className={`${headerCls} text-right pr-4`}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <SkeletonRow key={i} cols={compact ? 8 : 10} />
              ))
            : standings.map((row, idx) => {
                const pos = Number(row.position);
                const isHighlighted =
                  highlightTeamId != null && row.teamId === highlightTeamId;
                const isTop3 = pos <= 3;
                const rowBg = isHighlighted
                  ? "bg-primary/5"
                  : isTop3
                    ? pos === 1
                      ? "bg-accent/5"
                      : "bg-transparent"
                    : "";
                const borderLeft =
                  pos === 1
                    ? "border-l-2 border-l-accent"
                    : pos === 2 || pos === 3
                      ? "border-l-2 border-l-muted-foreground/30"
                      : "border-l-2 border-l-transparent";

                return (
                  <tr
                    key={row.teamId.toString()}
                    className={`border-b border-border/60 hover:bg-muted/30 transition-colors ${rowBg} ${borderLeft} ${idx === 0 ? "" : ""}`}
                    data-ocid={`standings-row-${pos}`}
                  >
                    <td className="px-3 py-2.5 w-8">
                      <PositionBadge pos={pos} />
                    </td>
                    <td className="px-3 py-2.5 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <TeamColorDot teams={teams} teamId={row.teamId} />
                        <span className="text-sm font-semibold text-foreground truncate">
                          {row.teamName}
                        </span>
                      </div>
                    </td>
                    <td className={cellCls}>{row.played.toString()}</td>
                    <td className={cellCls}>{row.won.toString()}</td>
                    <td className={cellCls}>{row.drawn.toString()}</td>
                    <td className={cellCls}>{row.lost.toString()}</td>
                    {!compact && (
                      <td className={cellCls}>{row.goalsFor.toString()}</td>
                    )}
                    {!compact && (
                      <td className={cellCls}>{row.goalsAgainst.toString()}</td>
                    )}
                    <td className={cellCls}>
                      {Number(row.goalDifference) > 0
                        ? `+${row.goalDifference}`
                        : row.goalDifference.toString()}
                    </td>
                    <td className={`${cellNumBold} pr-4`}>
                      {row.points.toString()}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
