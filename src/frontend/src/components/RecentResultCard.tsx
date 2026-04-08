import { MatchStatus } from "../types";
import type { MatchView, TeamView } from "../types";

interface RecentResultCardProps {
  match: MatchView;
  teams: TeamView[];
}

function TeamInitials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return <>{name.slice(0, 3).toUpperCase()}</>;
  return <>{(parts[0][0] + parts[1][0]).toUpperCase()}</>;
}

function TeamCrest({ color, name }: { color: string; name: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-sm shrink-0"
      style={{ backgroundColor: color || "#6b7280" }}
      aria-label={name}
    >
      <TeamInitials name={name} />
    </div>
  );
}

export function RecentResultCard({ match, teams }: RecentResultCardProps) {
  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isCompleted = match.status === MatchStatus.completed;
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);

  const homeWon = isCompleted && homeScore > awayScore;
  const awayWon = isCompleted && awayScore > homeScore;

  return (
    <div
      className="relative bg-card border border-border rounded-lg overflow-hidden shadow-fixture hover:shadow-elevated transition-smooth"
      data-ocid="result-card"
    >
      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-secondary/15 border border-secondary/30">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold text-secondary tracking-wider">
            LIVE
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          {/* Home team */}
          <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <TeamCrest
              color={homeTeam?.color ?? "#6b7280"}
              name={homeTeam?.name ?? "?"}
            />
            <span
              className={`text-[11px] font-semibold text-center truncate w-full px-1 ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
            >
              {homeTeam?.name ?? "TBD"}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-0.5 px-3">
            {isCompleted || isLive ? (
              <div className="flex items-center gap-2">
                <span
                  className={`text-3xl font-display font-bold tabular-nums leading-none ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {homeScore}
                </span>
                <span className="text-lg text-muted-foreground font-light">
                  –
                </span>
                <span
                  className={`text-3xl font-display font-bold tabular-nums leading-none ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {awayScore}
                </span>
              </div>
            ) : (
              <div className="text-sm font-medium text-muted-foreground">
                {new Date(
                  Number(match.scheduledAt / 1_000_000n),
                ).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
            <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground mt-0.5">
              {isLive ? "LIVE" : isCompleted ? "FT" : "vs"}
            </span>
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <TeamCrest
              color={awayTeam?.color ?? "#6b7280"}
              name={awayTeam?.name ?? "?"}
            />
            <span
              className={`text-[11px] font-semibold text-center truncate w-full px-1 ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
            >
              {awayTeam?.name ?? "TBD"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className={`h-1 w-full ${isLive ? "bg-secondary" : isCompleted ? "bg-primary/30" : "bg-border"}`}
      />
    </div>
  );
}
