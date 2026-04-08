import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { MatchStatus } from "../types";
import type { MatchView, TeamView } from "../types";

interface MatchCardProps {
  match: MatchView;
  teams: TeamView[];
  /** When true, wraps card in a link to tournament detail */
  linkable?: boolean;
}

function formatMatchDate(ts: bigint) {
  const d = new Date(Number(ts) / 1_000_000);
  return {
    date: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
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

function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === MatchStatus.live) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground animate-pulse">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground" />
        LIVE
      </span>
    );
  }
  if (status === MatchStatus.completed) {
    return (
      <Badge variant="outline" className="text-[10px] font-bold tracking-wider">
        FINAL
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="text-[10px] font-medium tracking-wide bg-muted text-muted-foreground border-0"
    >
      UPCOMING
    </Badge>
  );
}

function ScoreDisplay({
  match,
  homeTeam,
  awayTeam,
}: {
  match: MatchView;
  homeTeam: TeamView | undefined;
  awayTeam: TeamView | undefined;
}) {
  const isDecided =
    match.status === MatchStatus.completed || match.status === MatchStatus.live;
  const { time } = formatMatchDate(match.scheduledAt);

  return (
    <div className="flex items-center w-full gap-2 py-3 px-4">
      {/* Home team */}
      <div className="flex-1 flex flex-col items-end gap-0.5 min-w-0">
        <span
          className="font-display font-bold text-sm sm:text-base text-foreground truncate max-w-full text-right"
          title={homeTeam?.name ?? "TBD"}
        >
          {homeTeam?.name ?? "TBD"}
        </span>
        {homeTeam?.color && (
          <span
            className="h-1 w-8 rounded-full"
            style={{ background: homeTeam.color }}
          />
        )}
      </div>

      {/* Score / time centre block */}
      <div className="flex flex-col items-center shrink-0 px-3 sm:px-5 gap-1">
        {isDecided ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-display font-extrabold tabular-nums text-foreground leading-none">
              {match.homeScore.toString()}
            </span>
            <span className="text-lg font-bold text-muted-foreground leading-none">
              –
            </span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold tabular-nums text-foreground leading-none">
              {match.awayScore.toString()}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-base font-bold text-muted-foreground font-mono">
              vs
            </span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden />
              {time}
            </div>
          </div>
        )}
        <StatusBadge status={match.status} />
      </div>

      {/* Away team */}
      <div className="flex-1 flex flex-col items-start gap-0.5 min-w-0">
        <span
          className="font-display font-bold text-sm sm:text-base text-foreground truncate max-w-full"
          title={awayTeam?.name ?? "TBD"}
        >
          {awayTeam?.name ?? "TBD"}
        </span>
        {awayTeam?.color && (
          <span
            className="h-1 w-8 rounded-full"
            style={{ background: awayTeam.color }}
          />
        )}
      </div>
    </div>
  );
}

export function MatchCard({ match, teams, linkable = false }: MatchCardProps) {
  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isCompleted = match.status === MatchStatus.completed;
  const { date } = formatMatchDate(match.scheduledAt);

  const cardContent = (
    <div
      className={[
        "rounded-lg border transition-smooth overflow-hidden",
        isLive
          ? "border-secondary/50 bg-secondary/5 shadow-fixture"
          : isCompleted
            ? "border-border bg-card shadow-fixture"
            : "border-border bg-card",
        linkable
          ? "hover:shadow-elevated hover:border-primary/30 cursor-pointer"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-ocid="match-card"
    >
      {/* Phase bar */}
      <div
        className={[
          "flex items-center justify-between px-4 py-1.5 border-b text-[11px] font-semibold uppercase tracking-widest",
          isLive
            ? "bg-secondary/10 border-secondary/20 text-secondary"
            : "bg-muted/50 border-border text-muted-foreground",
        ].join(" ")}
      >
        <span>{phaseLabel(match.phase)}</span>
        <span className="flex items-center gap-1 font-normal normal-case tracking-normal">
          <Calendar className="h-3 w-3" aria-hidden />
          {date}
        </span>
      </div>

      <ScoreDisplay match={match} homeTeam={homeTeam} awayTeam={awayTeam} />
    </div>
  );

  if (linkable) {
    return (
      <Link
        to="/tournaments/$tournamentId"
        params={{ tournamentId: match.tournamentId.toString() }}
        aria-label={`Match: ${homeTeam?.name ?? "TBD"} vs ${awayTeam?.name ?? "TBD"}`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
