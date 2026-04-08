import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/LoadingSpinner";
import { RecentResultCard } from "../components/RecentResultCard";
import { StandingsTable } from "../components/StandingsTable";
import { TournamentCard } from "../components/TournamentCard";
import {
  useGetLeagueStandings,
  useGetRecentResults,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";
import { TournamentFormat, TournamentStatus } from "../types";
import type { TournamentView } from "../types";

function SectionHeader({ label, link }: { label: string; link?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
        {label}
      </h2>
      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function RecentResultsRow({
  activeTournament,
}: { activeTournament: TournamentView | undefined }) {
  const { data: matches = [], isLoading } = useGetRecentResults(
    activeTournament?.id ?? null,
    3n,
  );
  const { data: teams = [] } = useGetTeamsByTournament(
    activeTournament?.id ?? null,
  );

  if (!activeTournament) return null;

  return (
    <div className="mb-8">
      <SectionHeader
        label="Recent Results"
        link={`/tournaments/${activeTournament.id}`}
      />
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <p className="text-sm text-muted-foreground py-3">
          No results yet in this tournament.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match, i) => (
            <motion.div
              key={match.id.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              <RecentResultCard match={match} teams={teams} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniStandingsPanel({ tournament }: { tournament: TournamentView }) {
  const { data: standings = [], isLoading } = useGetLeagueStandings(
    tournament.id,
  );
  const { data: teams = [] } = useGetTeamsByTournament(tournament.id);
  const top5 = standings.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-fixture mb-8">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
          {tournament.name} — Standings
        </span>
        <Link
          to="/standings"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          Full table <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <StandingsTable
        standings={top5}
        teams={teams}
        isLoading={isLoading}
        compact
      />
    </div>
  );
}

export default function DashboardPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const navigate = useNavigate();

  const active = tournaments.filter(
    (t) => t.status === TournamentStatus.active,
  );
  const upcoming = tournaments.filter(
    (t) => t.status === TournamentStatus.upcoming,
  );
  const completed = tournaments.filter(
    (t) => t.status === TournamentStatus.completed,
  );

  const leagueTournament = active.find(
    (t) =>
      t.format === TournamentFormat.league ||
      t.format === TournamentFormat.hybrid,
  );

  const stats = [
    { label: "Tournaments", value: tournaments.length, icon: Trophy },
    { label: "Active", value: active.length, icon: TrendingUp },
    { label: "Upcoming", value: upcoming.length, icon: Calendar },
    { label: "Completed", value: completed.length, icon: BarChart2 },
  ];

  return (
    <div className="space-y-8" data-ocid="dashboard-page">
      {/* Hero banner */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-card border border-border shadow-elevated px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="relative space-y-0.5">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              Tournament Pro
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            {tournaments.length} tournament{tournaments.length !== 1 ? "s" : ""}{" "}
            · {active.length} active
          </p>
        </div>

        <div className="relative flex items-center gap-3">
          {active.length > 0 && (
            <Badge className="bg-secondary/15 text-secondary border border-secondary/30 font-bold text-[10px] tracking-wider">
              ● SEASON LIVE
            </Badge>
          )}
          <Button
            asChild
            variant="outline"
            size="sm"
            data-ocid="dashboard-view-all"
          >
            <Link to="/tournaments">
              All Tournaments <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
          >
            <Card className="bg-card border border-border">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    {label}
                  </p>
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Skeleton className="h-7 w-10" />
                ) : (
                  <p className="text-2xl font-display font-bold text-foreground tabular-nums">
                    {value}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent results */}
      {(isLoading || active.length > 0) && (
        <RecentResultsRow activeTournament={active[0]} />
      )}

      {/* Active tournaments */}
      {(isLoading || active.length > 0) && (
        <section>
          <SectionHeader label="Active Tournaments" link="/tournaments" />
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {active.map((t, i) => (
                <motion.div
                  key={t.id.toString()}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.32 }}
                >
                  <TournamentCard tournament={t} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Mini standings panel */}
      {leagueTournament && <MiniStandingsPanel tournament={leagueTournament} />}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <SectionHeader label="Upcoming Tournaments" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((t, i) => (
              <motion.div
                key={t.id.toString()}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.32 }}
              >
                <TournamentCard tournament={t} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <SectionHeader label="Completed Tournaments" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((t, i) => (
              <motion.div
                key={t.id.toString()}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.32 }}
              >
                <TournamentCard tournament={t} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!isLoading && tournaments.length === 0 && (
        <EmptyState
          icon="trophy"
          title="No tournaments yet"
          description="Create your first tournament to get started. Choose from League, Knockout, or Hybrid formats."
          actionLabel="Go to Admin"
          onAction={() => navigate({ to: "/admin" })}
          data-ocid="dashboard-empty"
        />
      )}
    </div>
  );
}
