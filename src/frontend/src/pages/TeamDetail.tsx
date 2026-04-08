import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Hash, Users } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PlayerTableRow } from "../components/PlayerRow";
import {
  useGetPlayersByTeam,
  useGetTeamsByTournament,
  useGetTournament,
} from "../hooks/use-tournament";

const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

function sortByPosition(a: { position: string }, b: { position: string }) {
  const ai = positionOrder.indexOf(a.position);
  const bi = positionOrder.indexOf(b.position);
  return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
}

export default function TeamDetailPage() {
  const { teamId, tournamentId } = useParams({
    from: "/teams/$tournamentId/$teamId",
  });
  const tid = BigInt(tournamentId);
  const teamIdBig = BigInt(teamId);
  const navigate = useNavigate();

  const { data: tournament, isLoading: loadingT } = useGetTournament(tid);
  const { data: teams = [], isLoading: loadingTeams } =
    useGetTeamsByTournament(tid);
  const { data: players = [], isLoading: loadingP } =
    useGetPlayersByTeam(teamIdBig);

  const team = teams.find((t) => t.id === teamIdBig);
  const color = team?.color || "#6366f1";
  const sortedPlayers = [...players].sort(sortByPosition);

  const positionCounts = sortedPlayers.reduce<Record<string, number>>(
    (acc, p) => {
      acc[p.position] = (acc[p.position] ?? 0) + 1;
      return acc;
    },
    {},
  );

  if (loadingT || loadingTeams) {
    return <LoadingSpinner fullPage label="Loading team..." />;
  }

  if (!team) {
    return (
      <EmptyState
        icon="users"
        title="Team not found"
        description="This team may have been removed."
        actionLabel="Back to Teams"
        onAction={() => navigate({ to: "/teams" })}
      />
    );
  }

  const initials = team.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6" data-ocid="team-detail-page">
      {/* Back nav */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/teams" aria-label="Back to teams">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          <Link to="/teams" className="hover:text-foreground transition-colors">
            Teams
          </Link>{" "}
          / <span className="text-foreground font-medium">{team.name}</span>
        </span>
      </div>

      {/* Team header card */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-fixture">
        {/* Color banner */}
        <div className="h-2 w-full" style={{ backgroundColor: color }} />

        <div className="p-6">
          <div className="flex items-center gap-5">
            {/* Large crest */}
            <div
              className="h-20 w-20 rounded-full shrink-0 flex items-center justify-center text-2xl font-bold text-white shadow-elevated"
              style={{ backgroundColor: color }}
              aria-hidden
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-display font-bold text-foreground truncate">
                {team.name}
              </h1>
              {tournament && (
                <p className="text-sm text-muted-foreground mt-1">
                  {tournament.name}
                </p>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="font-semibold">{players.length}</span>
                  <span className="text-muted-foreground">
                    {players.length === 1 ? "player" : "players"}
                  </span>
                </div>
                {Object.entries(positionCounts).map(([pos, count]) => (
                  <Badge key={pos} variant="outline" className="text-xs">
                    {count} {pos}
                    {count !== 1 ? "s" : ""}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster table */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground">
            Player Roster
          </h2>
          <span className="text-xs text-muted-foreground">
            ({players.length})
          </span>
        </div>

        {loadingP ? (
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="border-b border-border px-4 py-3">
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
        ) : sortedPlayers.length === 0 ? (
          <EmptyState
            icon="users"
            title="No players yet"
            description="Players will appear here once added to this team"
            data-ocid="team-detail-empty"
          />
        ) : (
          <div className="rounded-lg border border-border bg-card overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground w-10">
                    #
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground w-12">
                    <Hash className="h-3.5 w-3.5 inline" aria-label="Jersey" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">
                    Position
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player, i) => (
                  <PlayerTableRow
                    key={player.id.toString()}
                    player={player}
                    index={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
