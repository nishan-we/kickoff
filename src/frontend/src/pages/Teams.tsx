import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { TeamCard } from "../components/TeamCard";
import {
  useGetPlayersByTournament,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";
import type { TeamView, TournamentView } from "../types";

function TournamentTeamGrid({
  tournament,
}: {
  tournament: TournamentView;
}) {
  const navigate = useNavigate();
  const { data: teams = [], isLoading } = useGetTeamsByTournament(
    tournament.id,
  );
  const { data: players = [] } = useGetPlayersByTournament(tournament.id);

  const playerCountByTeam = players.reduce<Record<string, number>>((acc, p) => {
    const key = p.teamId.toString();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((n) => (
          <Skeleton key={n} className="h-28" />
        ))}
      </div>
    );
  }

  if (teams.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {teams.map((team: TeamView) => (
        <TeamCard
          key={team.id.toString()}
          team={team}
          playerCount={playerCountByTeam[team.id.toString()] ?? 0}
          onClick={() =>
            navigate({
              to: "/teams/$tournamentId/$teamId",
              params: {
                tournamentId: tournament.id.toString(),
                teamId: team.id.toString(),
              },
            })
          }
        />
      ))}
    </div>
  );
}

export default function TeamsPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [selectedId, setSelectedId] = useState<string>("all");

  const displayTournaments =
    selectedId === "all"
      ? tournaments
      : tournaments.filter((t) => t.id.toString() === selectedId);

  const totalTeamCount = tournaments.reduce(
    (sum, t) => sum + Number(t.totalTeams),
    0,
  );

  return (
    <div className="space-y-6" data-ocid="teams-page">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Teams
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? "Loading..." : `${totalTeamCount} registered teams`}
          </p>
        </div>

        {tournaments.length > 1 && (
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-52" data-ocid="teams-filter-tournament">
              <SelectValue placeholder="All Tournaments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tournaments</SelectItem>
              {tournaments.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <Skeleton key={n} className="h-28" />
          ))}
        </div>
      ) : tournaments.length === 0 ? (
        <EmptyState
          icon="users"
          title="No teams yet"
          description="Teams are added when setting up a tournament. Create a tournament first to register teams."
          data-ocid="teams-empty"
        />
      ) : (
        <div className="space-y-8">
          {displayTournaments.map((t) => (
            <section key={t.id.toString()}>
              {displayTournaments.length > 1 && (
                <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-5 rounded-full bg-primary"
                    aria-hidden
                  />
                  {t.name}
                </h2>
              )}
              <TournamentTeamGrid tournament={t} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
