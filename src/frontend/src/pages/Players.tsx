import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PlayerRow } from "../components/PlayerRow";
import {
  useGetPlayersByTournament,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";
import type { TournamentView } from "../types";

const POSITIONS = [
  "All Positions",
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
] as const;

type Position = (typeof POSITIONS)[number];

interface TournamentPlayersProps {
  tournament: TournamentView;
  search: string;
  position: Position;
  showTournamentHeader: boolean;
}

function TournamentPlayers({
  tournament,
  search,
  position,
  showTournamentHeader,
}: TournamentPlayersProps) {
  const { data: players = [], isLoading: loadingP } = useGetPlayersByTournament(
    tournament.id,
  );
  const { data: teams = [], isLoading: loadingT } = useGetTeamsByTournament(
    tournament.id,
  );

  const filtered = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.number.toString().includes(search);
    const matchesPosition =
      position === "All Positions" || p.position === position;
    return matchesSearch && matchesPosition;
  });

  // Sort by position then by jersey number
  const sorted = [...filtered].sort((a, b) => {
    const posOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
    const posA = posOrder.indexOf(a.position);
    const posB = posOrder.indexOf(b.position);
    if (posA !== posB)
      return (posA === -1 ? 99 : posA) - (posB === -1 ? 99 : posB);
    return Number(a.number - b.number);
  });

  if (loadingP || loadingT) {
    return (
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {[1, 2, 3].map((n) => (
          <div key={n} className="border-b border-border px-4 py-3">
            <Skeleton className="h-10" />
          </div>
        ))}
      </div>
    );
  }

  if (sorted.length === 0) return null;

  return (
    <section data-ocid="tournament-players-section">
      {showTournamentHeader && (
        <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-5 rounded-full bg-primary"
            aria-hidden
          />
          {tournament.name}
          <span className="font-normal normal-case tracking-normal ml-1">
            ({sorted.length})
          </span>
        </h2>
      )}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {sorted.map((p, i) => (
          <PlayerRow
            key={p.id.toString()}
            player={p}
            teams={teams}
            rank={i + 1}
          />
        ))}
      </div>
    </section>
  );
}

export default function PlayersPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("all");
  const [position, setPosition] = useState<Position>("All Positions");

  const displayTournaments =
    selectedId === "all"
      ? tournaments
      : tournaments.filter((t) => t.id.toString() === selectedId);

  return (
    <div className="space-y-6" data-ocid="players-page">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Players
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          All registered players across tournaments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            aria-hidden
          />
          <Input
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
            data-ocid="player-search"
            aria-label="Search players"
          />
        </div>

        <Select
          value={position}
          onValueChange={(v) => setPosition(v as Position)}
        >
          <SelectTrigger className="w-44" data-ocid="player-filter-position">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {POSITIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {tournaments.length > 1 && (
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger
              className="w-52"
              data-ocid="player-filter-tournament"
            >
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

      {/* List */}
      {isLoading ? (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="border-b border-border px-4 py-3">
              <Skeleton className="h-10" />
            </div>
          ))}
        </div>
      ) : tournaments.length === 0 ? (
        <EmptyState
          icon="users"
          title="No players yet"
          description="Players are added when teams are registered in a tournament. Create a tournament and add teams to get started."
          data-ocid="players-empty"
        />
      ) : (
        <div className="space-y-6">
          {displayTournaments.map((t) => (
            <TournamentPlayers
              key={t.id.toString()}
              tournament={t}
              search={search}
              position={position}
              showTournamentHeader={displayTournaments.length > 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
