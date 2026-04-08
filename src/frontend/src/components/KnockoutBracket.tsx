import { MatchStatus } from "../types";
import type { KnockoutBracketMatch, MatchView, TeamView } from "../types";
import { SkeletonCard } from "./LoadingSpinner";

interface KnockoutBracketProps {
  bracket: KnockoutBracketMatch[];
  matches: MatchView[];
  teams: TeamView[];
  isLoading?: boolean;
}

function getTeamName(teams: TeamView[], teamId?: bigint): string {
  if (teamId == null) return "TBD";
  return teams.find((t) => t.id === teamId)?.name ?? "TBD";
}

function getTeamColor(teams: TeamView[], teamId?: bigint): string {
  if (teamId == null) return "#6b7280";
  return teams.find((t) => t.id === teamId)?.color ?? "#6b7280";
}

function getMatchForBracket(
  matches: MatchView[],
  bracketMatch: KnockoutBracketMatch,
): MatchView | undefined {
  if (bracketMatch.matchId == null) return undefined;
  return matches.find((m) => m.id === bracketMatch.matchId);
}

function BracketMatchCard({
  bracketMatch,
  match,
  teams,
}: {
  bracketMatch: KnockoutBracketMatch;
  match?: MatchView;
  teams: TeamView[];
}) {
  const homeName = getTeamName(teams, bracketMatch.homeTeamId);
  const awayName = getTeamName(teams, bracketMatch.awayTeamId);
  const homeColor = getTeamColor(teams, bracketMatch.homeTeamId);
  const awayColor = getTeamColor(teams, bracketMatch.awayTeamId);
  const homeScore = match ? Number(match.homeScore) : null;
  const awayScore = match ? Number(match.awayScore) : null;
  const isCompleted = match?.status === MatchStatus.completed;
  const isLive = match?.status === MatchStatus.live;
  const winnerId = bracketMatch.winnerId;

  const homeIsWinner = winnerId != null && winnerId === bracketMatch.homeTeamId;
  const awayIsWinner = winnerId != null && winnerId === bracketMatch.awayTeamId;

  return (
    <div
      className="w-52 bg-card border border-border rounded-lg overflow-hidden shadow-fixture"
      data-ocid={`bracket-match-${bracketMatch.round}`}
    >
      {/* Live badge */}
      {isLive && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 border-b border-secondary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[9px] font-bold text-secondary tracking-wider">
            LIVE
          </span>
        </div>
      )}

      {/* Home row */}
      <div
        className={`flex items-center gap-2 px-3 py-2.5 ${homeIsWinner ? "bg-accent/8" : ""} border-b border-border/60`}
      >
        <span
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: homeColor }}
        />
        <span
          className={`text-xs flex-1 truncate font-medium ${homeIsWinner ? "text-foreground font-semibold" : "text-muted-foreground"}`}
        >
          {homeName}
        </span>
        {homeScore !== null && (
          <span
            className={`text-sm font-bold tabular-nums ${homeIsWinner ? "text-foreground" : "text-muted-foreground"}`}
          >
            {homeScore}
          </span>
        )}
      </div>

      {/* Away row */}
      <div
        className={`flex items-center gap-2 px-3 py-2.5 ${awayIsWinner ? "bg-accent/8" : ""}`}
      >
        <span
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: awayColor }}
        />
        <span
          className={`text-xs flex-1 truncate font-medium ${awayIsWinner ? "text-foreground font-semibold" : "text-muted-foreground"}`}
        >
          {awayName}
        </span>
        {awayScore !== null && (
          <span
            className={`text-sm font-bold tabular-nums ${awayIsWinner ? "text-foreground" : "text-muted-foreground"}`}
          >
            {awayScore}
          </span>
        )}
      </div>

      {/* Status footer */}
      <div
        className={`h-0.5 ${isCompleted ? "bg-primary/40" : isLive ? "bg-secondary" : "bg-border"}`}
      />
    </div>
  );
}

function getRoundLabel(round: bigint, maxRound: bigint): string {
  const r = Number(round);
  const max = Number(maxRound);
  if (r === max) return "Final";
  if (r === max - 1) return "Semi-Finals";
  if (r === max - 2) return "Quarter-Finals";
  return `Round ${r}`;
}

export function KnockoutBracket({
  bracket,
  matches,
  teams,
  isLoading = false,
}: KnockoutBracketProps) {
  if (isLoading) {
    return (
      <div className="flex gap-8 overflow-x-auto pb-4">
        {[1, 2, 3].map((r) => (
          <div key={r} className="flex flex-col gap-4 min-w-[208px]">
            {[1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (bracket.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        No knockout bracket available yet.
      </div>
    );
  }

  // Group by round
  const rounds = bracket.reduce<Map<bigint, KnockoutBracketMatch[]>>(
    (acc, m) => {
      const list = acc.get(m.round) ?? [];
      list.push(m);
      acc.set(m.round, list);
      return acc;
    },
    new Map(),
  );

  const sortedRounds = Array.from(rounds.entries()).sort(([a], [b]) =>
    a < b ? -1 : 1,
  );

  const maxRound = sortedRounds[sortedRounds.length - 1]?.[0] ?? 1n;

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max">
        {sortedRounds.map(([round, roundMatches]) => (
          <div key={round.toString()} className="flex flex-col">
            {/* Round header */}
            <div className="mb-4 pb-2 border-b border-border">
              <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {getRoundLabel(round, maxRound)}
              </span>
            </div>

            {/* Matches in round */}
            <div className="flex flex-col gap-4">
              {roundMatches.map((bm) => (
                <BracketMatchCard
                  key={`${round}-${bm.matchId?.toString() ?? bm.homeTeamId?.toString() ?? Math.random()}`}
                  bracketMatch={bm}
                  match={getMatchForBracket(matches, bm)}
                  teams={teams}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
