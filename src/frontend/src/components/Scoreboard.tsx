import { Badge } from "@/components/ui/badge";
import { MatchStatus } from "../types";
import type { MatchView, TeamView } from "../types";

interface ScoreboardProps {
  match: MatchView;
  teams: TeamView[];
}

function phaseLabel(phase: MatchView["phase"]): string {
  if (phase.__kind__ === "leagueStage") return "League Stage";
  const r = Number(phase.knockoutRound);
  const map: Record<number, string> = {
    1: "Final",
    2: "Semi-Final",
    4: "Quarter-Final",
    8: "Round of 16",
  };
  return map[r] ?? `Round of ${r * 2}`;
}

function formatDateTime(ts: bigint) {
  const d = new Date(Number(ts) / 1_000_000);
  return {
    date: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

function LivePulse() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
    </span>
  );
}

function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === MatchStatus.live) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary/15 border border-secondary/30">
        <LivePulse />
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">
          LIVE
        </span>
      </div>
    );
  }
  if (status === MatchStatus.completed) {
    return (
      <Badge
        variant="outline"
        className="text-xs font-bold uppercase tracking-widest px-3 py-1"
      >
        FULL TIME
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="text-xs font-medium uppercase tracking-widest px-3 py-1 bg-muted text-muted-foreground border-0"
    >
      UPCOMING
    </Badge>
  );
}

function TeamBlock({
  team,
  score,
  align,
  isDecided,
}: {
  team: TeamView | undefined;
  score: bigint;
  align: "left" | "right";
  isDecided: boolean;
}) {
  const isRight = align === "right";
  return (
    <div
      className={`flex flex-col gap-3 flex-1 min-w-0 ${isRight ? "items-start" : "items-end"}`}
    >
      {/* Color stripe */}
      {team?.color && (
        <span
          className={`h-1 w-14 rounded-full ${isRight ? "ml-0" : "mr-0"}`}
          style={{ background: team.color }}
        />
      )}
      <h2
        className={`font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight break-words ${isRight ? "text-left" : "text-right"}`}
      >
        {team?.name ?? "TBD"}
      </h2>
      {isDecided && (
        <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tabular-nums text-foreground leading-none">
          {score.toString()}
        </span>
      )}
    </div>
  );
}

export function Scoreboard({ match, teams }: ScoreboardProps) {
  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);
  const isDecided =
    match.status === MatchStatus.completed || match.status === MatchStatus.live;
  const isLive = match.status === MatchStatus.live;
  const { date, time } = formatDateTime(match.scheduledAt);

  return (
    <div
      className={[
        "rounded-xl overflow-hidden border",
        isLive
          ? "border-secondary/40 bg-gradient-to-b from-secondary/8 to-card"
          : "border-border bg-card",
      ].join(" ")}
      data-ocid="scoreboard"
    >
      {/* Top metadata strip */}
      <div
        className={[
          "flex items-center justify-between px-5 py-2.5 border-b text-[11px] font-semibold uppercase tracking-widest",
          isLive
            ? "bg-secondary/10 border-secondary/20 text-secondary"
            : "bg-muted/50 border-border text-muted-foreground",
        ].join(" ")}
      >
        <span>{phaseLabel(match.phase)}</span>
        <StatusBadge status={match.status} />
      </div>

      {/* Main scoreboard body */}
      <div className="px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Home */}
          <TeamBlock
            team={homeTeam}
            score={match.homeScore}
            align="right"
            isDecided={isDecided}
          />

          {/* Divider */}
          <div className="flex flex-col items-center shrink-0 gap-2">
            {isDecided ? (
              <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-muted-foreground/40 leading-none select-none">
                –
              </span>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-muted-foreground font-mono">
                  vs
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {time}
                </span>
              </div>
            )}
          </div>

          {/* Away */}
          <TeamBlock
            team={awayTeam}
            score={match.awayScore}
            align="left"
            isDecided={isDecided}
          />
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="px-5 py-3 border-t border-border bg-muted/30 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
        <span>{date}</span>
        {!isDecided && <span>{time}</span>}
        {match.completedAt && (
          <span className="ml-auto text-[11px]">
            Completed{" "}
            {new Date(Number(match.completedAt) / 1_000_000).toLocaleDateString(
              "en-GB",
              { day: "numeric", month: "short", year: "numeric" },
            )}
          </span>
        )}
      </div>
    </div>
  );
}
