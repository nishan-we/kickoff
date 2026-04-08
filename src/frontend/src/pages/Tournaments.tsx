import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Calendar, Plus, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { useListTournaments } from "../hooks/use-tournament";
import { useIsAdmin } from "../hooks/use-tournament";
import { TournamentFormat, TournamentStatus } from "../types";
import type { TournamentView } from "../types";

function formatLabel(f: TournamentFormat) {
  const map: Record<TournamentFormat, string> = {
    [TournamentFormat.league]: "League",
    [TournamentFormat.knockout]: "Knockout",
    [TournamentFormat.hybrid]: "League + Knockout",
  };
  return map[f] ?? f;
}

function statusColor(s: TournamentStatus) {
  if (s === TournamentStatus.active) return "default";
  if (s === TournamentStatus.upcoming) return "secondary";
  return "outline";
}

function TournamentRow({ tournament }: { tournament: TournamentView }) {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id.toString() }}
      data-ocid="tournament-list-row"
    >
      <Card className="hover:shadow-fixture transition-shadow duration-200 cursor-pointer group">
        <CardContent className="py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10">
              <Trophy className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {tournament.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatLabel(tournament.format)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {tournament.totalTeams.toString()}
            </span>
            <Badge variant={statusColor(tournament.status)}>
              {tournament.status.charAt(0).toUpperCase() +
                tournament.status.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function TournamentsPage() {
  const { data: tournaments, isLoading } = useListTournaments();
  const { data: isAdmin } = useIsAdmin();
  const [search, setSearch] = useState("");

  const filtered = (tournaments ?? []).filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6" data-ocid="tournaments-page">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold">Tournaments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tournaments?.length ?? 0} total
          </p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link to="/admin">
              <Plus className="h-4 w-4 mr-1.5" aria-hidden />
              New Tournament
            </Link>
          </Button>
        )}
      </div>

      <div className="relative max-w-xs">
        <Input
          placeholder="Search tournaments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="tournament-search"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-20" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="trophy"
          title={search ? "No results found" : "No tournaments yet"}
          description={
            search
              ? "Try a different search term"
              : "Create a tournament to start organizing matches"
          }
          data-ocid="tournaments-empty"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <TournamentRow key={t.id.toString()} tournament={t} />
          ))}
        </div>
      )}

      {/* Mobile-friendly floating action */}
      {isAdmin && (
        <div className="fixed bottom-20 right-4 lg:hidden z-30">
          <Button
            asChild
            size="icon"
            className="h-12 w-12 rounded-full shadow-elevated"
            data-ocid="fab-new-tournament"
          >
            <Link to="/admin" aria-label="New tournament">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
