import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { MatchCard } from "../components/MatchCard";
import {
  useGetMatchesByTournament,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";
import { MatchStatus } from "../types";
import type { MatchView, TeamView, TournamentView } from "../types";

type FilterTab = "all" | "upcoming" | "completed" | "live";

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

function phaseOrder(phase: MatchView["phase"]): number {
  if (phase.__kind__ === "leagueStage") return 99;
  return Number(phase.knockoutRound);
}

function groupByPhase(
  matches: MatchView[],
): Array<{ label: string; matches: MatchView[] }> {
  const groups = new Map<string, { order: number; matches: MatchView[] }>();
  for (const m of matches) {
    const label = phaseLabel(m.phase);
    const entry = groups.get(label);
    if (entry) {
      entry.matches.push(m);
    } else {
      groups.set(label, { order: phaseOrder(m.phase), matches: [m] });
    }
  }
  return Array.from(groups.entries())
    .sort((a, b) => a[1].order - b[1].order)
    .map(([label, { matches }]) => ({ label, matches }));
}

function filterMatches(matches: MatchView[], tab: FilterTab): MatchView[] {
  if (tab === "upcoming")
    return matches.filter((m) => m.status === MatchStatus.scheduled);
  if (tab === "completed")
    return matches.filter((m) => m.status === MatchStatus.completed);
  if (tab === "live")
    return matches.filter((m) => m.status === MatchStatus.live);
  return matches;
}

function MatchCardSkeletons() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-lg border border-border bg-card overflow-hidden animate-pulse"
        >
          <div className="h-7 bg-muted/60 w-full" />
          <div className="flex items-center gap-4 px-4 py-4">
            <div className="flex-1 space-y-2 flex flex-col items-end">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-1 w-8" />
            </div>
            <div className="flex flex-col items-center gap-2 px-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-1 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TournamentFixturesSection({
  tournament,
  filter,
}: {
  tournament: TournamentView;
  filter: FilterTab;
}) {
  const { data: rawMatches = [], isLoading: loadingM } =
    useGetMatchesByTournament(tournament.id);
  const { data: teams = [], isLoading: loadingTeams } = useGetTeamsByTournament(
    tournament.id,
  );

  if (loadingM || loadingTeams) return <MatchCardSkeletons />;

  const filtered = filterMatches(rawMatches, filter);

  if (filtered.length === 0) return null;

  const groups = groupByPhase(filtered);

  return (
    <div className="space-y-6" data-ocid="tournament-fixtures-section">
      {groups.map(({ label, matches }) => (
        <div key={label} className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </h3>
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-mono">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="space-y-2.5">
            {matches.map((m) => (
              <MatchCard
                key={m.id.toString()}
                match={m}
                teams={teams as TeamView[]}
                linkable
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FixturesPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [selectedId, setSelectedId] = useState<string>("all");
  const [filter, setFilter] = useState<FilterTab>("all");

  const displayTournaments =
    selectedId === "all"
      ? tournaments
      : tournaments.filter((t) => t.id.toString() === selectedId);

  return (
    <div className="space-y-6" data-ocid="fixtures-page">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Fixtures & Results
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Scheduled and completed matches across all tournaments
          </p>
        </div>

        {/* Tournament filter */}
        {tournaments.length > 1 && (
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger
              className="w-52 shrink-0"
              data-ocid="fixture-filter-tournament"
            >
              <SelectValue placeholder="Filter tournament" />
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

      {/* Filter tabs */}
      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as FilterTab)}
        data-ocid="fixture-filter-tabs"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger
            value="all"
            data-ocid="filter-tab-all"
            className="flex-1 sm:flex-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="live"
            data-ocid="filter-tab-live"
            className="flex-1 sm:flex-none"
          >
            Live
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            data-ocid="filter-tab-upcoming"
            className="flex-1 sm:flex-none"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            data-ocid="filter-tab-completed"
            className="flex-1 sm:flex-none"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      {isLoading ? (
        <MatchCardSkeletons />
      ) : tournaments.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No fixtures yet"
          description="Fixtures appear once tournaments are created and fixtures are generated"
          data-ocid="fixtures-empty"
        />
      ) : (
        <div className="space-y-10">
          {displayTournaments.map((t) => (
            <section key={t.id.toString()} data-ocid="fixture-tournament-group">
              {/* Tournament heading — only show when more than one displayed */}
              {displayTournaments.length > 1 && (
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-sm font-display font-bold uppercase tracking-widest text-foreground">
                    {t.name}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
              )}
              <TournamentFixturesSection tournament={t} filter={filter} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
