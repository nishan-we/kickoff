import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCompleteMatch,
  useGenerateFixtures,
  useGetMatchesByTournament,
  useGetTeamsByTournament,
  useListTournaments,
  useUpdateScore,
} from "../hooks/use-tournament";
import { MatchStatus } from "../types";
import type { MatchView, TeamId, TeamView, TournamentId } from "../types";

interface ScoreRowProps {
  match: MatchView;
  teams: TeamView[];
  tournamentId: TournamentId;
}

function teamName(teams: TeamView[], id: TeamId) {
  return teams.find((t) => t.id === id)?.name ?? "TBD";
}

function teamColor(teams: TeamView[], id: TeamId) {
  return teams.find((t) => t.id === id)?.color ?? "#6366f1";
}

function ScoreRow({ match, teams, tournamentId }: ScoreRowProps) {
  const [homeScore, setHomeScore] = useState(match.homeScore.toString());
  const [awayScore, setAwayScore] = useState(match.awayScore.toString());
  const { mutate: updateScore, isPending: updatingScore } = useUpdateScore();
  const { mutate: completeMatch, isPending: completing } = useCompleteMatch();

  const isCompleted = match.status === MatchStatus.completed;
  const isLive = match.status === MatchStatus.live;

  function handleSave() {
    updateScore(
      {
        matchId: match.id,
        homeScore: BigInt(homeScore),
        awayScore: BigInt(awayScore),
        tournamentId,
      },
      {
        onSuccess: () => toast.success("Score updated!"),
        onError: (e) => toast.error(e.message),
      },
    );
  }

  function handleComplete() {
    completeMatch(
      { matchId: match.id, tournamentId },
      {
        onSuccess: () => toast.success("Match marked as Full Time"),
        onError: (e) => toast.error(e.message),
      },
    );
  }

  const homeColor = teamColor(teams, match.homeTeamId);
  const awayColor = teamColor(teams, match.awayTeamId);

  return (
    <div
      className={`rounded-lg border transition-smooth ${
        isCompleted
          ? "border-border bg-muted/30 opacity-70"
          : isLive
            ? "border-accent/50 bg-accent/5"
            : "border-border bg-card hover:border-primary/30"
      }`}
      data-ocid="admin-score-row"
    >
      {/* Match header row */}
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: homeColor }}
          />
          <span className="font-display font-semibold text-sm truncate">
            {teamName(teams, match.homeTeamId)}
          </span>
        </div>

        {/* Score display / status */}
        <div className="flex flex-col items-center shrink-0 px-2">
          {isCompleted ? (
            <span className="text-base font-bold font-mono tabular-nums text-muted-foreground">
              {match.homeScore.toString()} – {match.awayScore.toString()}
            </span>
          ) : isLive ? (
            <span className="text-base font-bold font-mono tabular-nums text-accent">
              {match.homeScore.toString()} – {match.awayScore.toString()}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground font-mono">vs</span>
          )}
          {isCompleted && (
            <Badge variant="outline" className="text-[10px] mt-0.5">
              FT
            </Badge>
          )}
          {isLive && (
            <Badge
              variant="default"
              className="text-[10px] mt-0.5 animate-pulse"
            >
              LIVE
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2.5 min-w-0 flex-1 justify-end">
          <span className="font-display font-semibold text-sm truncate">
            {teamName(teams, match.awayTeamId)}
          </span>
          <div
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: awayColor }}
          />
        </div>
      </div>

      {/* Score edit controls */}
      {!isCompleted && (
        <div className="px-4 pb-3 pt-1 border-t border-border/50 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() =>
                  setHomeScore(String(Math.max(0, Number(homeScore) + 1)))
                }
                className="h-5 w-7 flex items-center justify-center rounded-sm bg-muted hover:bg-muted-foreground/20 transition-colors"
                aria-label="Increment home score"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setHomeScore(String(Math.max(0, Number(homeScore) - 1)))
                }
                className="h-5 w-7 flex items-center justify-center rounded-sm bg-muted hover:bg-muted-foreground/20 transition-colors"
                aria-label="Decrement home score"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <Input
              type="number"
              min="0"
              max="99"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="w-14 text-center font-mono font-bold text-base"
              aria-label={`${teamName(teams, match.homeTeamId)} score`}
              data-ocid="admin-home-score"
            />
          </div>

          <span className="text-muted-foreground font-bold">–</span>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              max="99"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="w-14 text-center font-mono font-bold text-base"
              aria-label={`${teamName(teams, match.awayTeamId)} score`}
              data-ocid="admin-away-score"
            />
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() =>
                  setAwayScore(String(Math.max(0, Number(awayScore) + 1)))
                }
                className="h-5 w-7 flex items-center justify-center rounded-sm bg-muted hover:bg-muted-foreground/20 transition-colors"
                aria-label="Increment away score"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setAwayScore(String(Math.max(0, Number(awayScore) - 1)))
                }
                className="h-5 w-7 flex items-center justify-center rounded-sm bg-muted hover:bg-muted-foreground/20 transition-colors"
                aria-label="Decrement away score"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              disabled={updatingScore}
              data-ocid="admin-save-score"
            >
              {updatingScore ? "Saving..." : "Save Score"}
            </Button>
            <Button
              size="sm"
              onClick={handleComplete}
              disabled={completing}
              data-ocid="admin-complete-match"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" aria-hidden />
              {completing ? "..." : "Full Time"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ScoreEditor() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [selectedId, setSelectedId] = useState("");

  const activeTournamentId = selectedId
    ? BigInt(selectedId)
    : (tournaments[0]?.id ?? null);

  const { data: matches = [], isLoading: loadingM } =
    useGetMatchesByTournament(activeTournamentId);
  const { data: teams = [] } = useGetTeamsByTournament(activeTournamentId);
  const { mutate: generateFixtures, isPending: generatingFixtures } =
    useGenerateFixtures();

  if (isLoading) return <Skeleton className="h-40" />;

  if (tournaments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No tournaments yet. Create one first.
      </p>
    );
  }

  const pending = matches.filter((m) => m.status !== MatchStatus.completed);
  const completed = matches.filter((m) => m.status === MatchStatus.completed);

  return (
    <div className="space-y-5" data-ocid="score-editor">
      {/* Tournament selector + generate button */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={selectedId || tournaments[0]?.id.toString()}
          onValueChange={setSelectedId}
        >
          <SelectTrigger className="w-56" data-ocid="admin-score-tournament">
            <SelectValue placeholder="Select tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.map((t) => (
              <SelectItem key={t.id.toString()} value={t.id.toString()}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeTournamentId && matches.length === 0 && (
          <Button
            variant="outline"
            onClick={() =>
              generateFixtures(activeTournamentId, {
                onSuccess: () => toast.success("Fixtures generated!"),
                onError: (e) => toast.error(e.message),
              })
            }
            disabled={generatingFixtures}
            data-ocid="admin-generate-fixtures"
          >
            <Zap className="h-4 w-4 mr-1.5" aria-hidden />
            {generatingFixtures ? "Generating..." : "Generate Fixtures"}
          </Button>
        )}
      </div>

      {/* Pending matches */}
      {loadingM ? (
        <div className="space-y-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : matches.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No fixtures yet. Click "Generate Fixtures" to create the schedule.
        </p>
      ) : (
        <div className="space-y-4">
          {pending.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Pending / Live ({pending.length})
              </p>
              <div className="space-y-2">
                {pending.map((m) => (
                  <ScoreRow
                    key={m.id.toString()}
                    match={m}
                    teams={teams}
                    tournamentId={activeTournamentId!}
                  />
                ))}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Completed ({completed.length})
              </p>
              <div className="space-y-2">
                {completed.map((m) => (
                  <ScoreRow
                    key={m.id.toString()}
                    match={m}
                    teams={teams}
                    tournamentId={activeTournamentId!}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
