import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/LoadingSpinner";
import { StandingsTable } from "../components/StandingsTable";
import {
  useGetLeagueStandings,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";
import { TournamentFormat, TournamentStatus } from "../types";
import type { TournamentView } from "../types";

function PodiumRow({ tournament }: { tournament: TournamentView }) {
  const { data: standings = [] } = useGetLeagueStandings(tournament.id);

  if (standings.length < 3) return null;

  const [second, first, third] = [standings[1], standings[0], standings[2]];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        {
          row: second,
          medal: "🥈",
          heightCls: "h-20",
          bgCls: "bg-muted border-muted-foreground/20",
        },
        {
          row: first,
          medal: "🥇",
          heightCls: "h-24",
          bgCls: "bg-accent/10 border-accent/30",
        },
        {
          row: third,
          medal: "🥉",
          heightCls: "h-18",
          bgCls: "bg-chart-5/8 border-chart-5/20",
        },
      ].map(({ row, medal, heightCls, bgCls }) =>
        row ? (
          <div
            key={row.teamId.toString()}
            className={`flex flex-col items-center justify-end rounded-lg border p-3 ${heightCls} ${bgCls}`}
          >
            <span className="text-2xl mb-1">{medal}</span>
            <span className="text-xs font-bold text-foreground truncate text-center w-full">
              {row.teamName}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">
              {row.points.toString()} pts
            </span>
          </div>
        ) : null,
      )}
    </div>
  );
}

function StandingsSection({ tournament }: { tournament: TournamentView }) {
  const { data: standings = [], isLoading } = useGetLeagueStandings(
    tournament.id,
  );
  const { data: teams = [] } = useGetTeamsByTournament(tournament.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PodiumRow tournament={tournament} />

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-fixture">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
            Full Table — {tournament.name}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {standings.length} teams
          </span>
        </div>

        {isLoading ? (
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : standings.length === 0 ? (
          <EmptyState
            icon="chart"
            title="No standings yet"
            description="Standings will appear once matches are played and scores are recorded."
            data-ocid="empty-standings"
          />
        ) : (
          <StandingsTable standings={standings} teams={teams} />
        )}
      </div>

      {/* Legend */}
      {standings.length > 0 && (
        <div className="flex items-center gap-5 flex-wrap pt-3 text-[10px] font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-0.5 bg-accent rounded" />
            1st place
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-0.5 bg-muted-foreground/30 rounded" />
            2nd — 3rd place
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function StandingsPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();

  const leagueTournaments = tournaments.filter(
    (t) =>
      t.format === TournamentFormat.league ||
      t.format === TournamentFormat.hybrid,
  );

  const defaultId =
    (
      leagueTournaments.find((t) => t.status === TournamentStatus.active) ??
      leagueTournaments[0]
    )?.id?.toString() ?? "";

  const [selectedId, setSelectedId] = useState<string>("");
  const resolvedId = selectedId || defaultId;
  const selectedTournament = leagueTournaments.find(
    (t) => t.id.toString() === resolvedId,
  );

  return (
    <div className="space-y-6" data-ocid="standings-page">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            League Standings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Current season table rankings
          </p>
        </div>

        {leagueTournaments.length > 1 && (
          <Select value={resolvedId} onValueChange={setSelectedId}>
            <SelectTrigger
              className="w-52"
              data-ocid="standings-tournament-select"
            >
              <SelectValue placeholder="Select tournament" />
            </SelectTrigger>
            <SelectContent>
              {leagueTournaments.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : leagueTournaments.length === 0 ? (
        <EmptyState
          icon="chart"
          title="No league standings"
          description="Standings are available for League and Hybrid format tournaments."
          data-ocid="standings-empty"
        />
      ) : selectedTournament ? (
        <StandingsSection tournament={selectedTournament} />
      ) : null}
    </div>
  );
}
