import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "../components/EmptyState";
import { KnockoutBracket } from "../components/KnockoutBracket";
import { LoadingSpinner, SkeletonCard } from "../components/LoadingSpinner";
import { RecentResultCard } from "../components/RecentResultCard";
import { StandingsTable } from "../components/StandingsTable";
import {
  useGetKnockoutBracket,
  useGetLeagueStandings,
  useGetMatchesByTournament,
  useGetTeamsByTournament,
  useGetTournament,
} from "../hooks/use-tournament";
import { MatchStatus, TournamentFormat, TournamentStatus } from "../types";
import type { MatchView, TeamView } from "../types";

const formatLabels: Record<TournamentFormat, string> = {
  [TournamentFormat.league]: "LEAGUE",
  [TournamentFormat.knockout]: "KNOCKOUT",
  [TournamentFormat.hybrid]: "HYBRID",
};

const statusColors: Record<TournamentStatus, string> = {
  [TournamentStatus.active]:
    "bg-secondary/15 text-secondary border-secondary/30",
  [TournamentStatus.upcoming]:
    "bg-accent/15 text-accent-foreground border-accent/30",
  [TournamentStatus.completed]: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<TournamentStatus, string> = {
  [TournamentStatus.active]: "ACTIVE",
  [TournamentStatus.upcoming]: "UPCOMING",
  [TournamentStatus.completed]: "COMPLETED",
};

function TeamInitials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return <>{name.slice(0, 3).toUpperCase()}</>;
  return <>{(parts[0][0] + parts[1][0]).toUpperCase()}</>;
}

function FixtureCard({
  match,
  teams,
}: { match: MatchView; teams: TeamView[] }) {
  const home = teams.find((t) => t.id === match.homeTeamId);
  const away = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isDone = match.status === MatchStatus.completed;
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);
  const homeWon = isDone && homeScore > awayScore;
  const awayWon = isDone && awayScore > homeScore;

  return (
    <div
      className={`rounded-lg border overflow-hidden bg-card shadow-fixture hover:shadow-elevated transition-smooth ${isLive ? "border-secondary/40" : "border-border"}`}
      data-ocid={`fixture-card-${match.id}`}
    >
      {isLive && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-secondary/10 border-b border-secondary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[9px] font-bold text-secondary tracking-widest">
            LIVE
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 px-4 py-4">
        {/* Home */}
        <div className="flex-1 flex flex-col items-start gap-1.5 min-w-0">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: home?.color ?? "#6b7280" }}
          >
            <TeamInitials name={home?.name ?? "?"} />
          </div>
          <span
            className={`text-sm font-semibold truncate max-w-full ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
          >
            {home?.name ?? "TBD"}
          </span>
        </div>

        {/* Score / time */}
        <div className="flex flex-col items-center gap-1 shrink-0 px-2">
          {isDone || isLive ? (
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-display font-bold tabular-nums ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
              >
                {homeScore}
              </span>
              <span className="text-lg text-muted-foreground">–</span>
              <span
                className={`text-2xl font-display font-bold tabular-nums ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
              >
                {awayScore}
              </span>
            </div>
          ) : (
            <span className="text-lg font-display font-bold text-muted-foreground">
              {new Date(
                Number(match.scheduledAt / 1_000_000n),
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground">
            {isLive
              ? "LIVE"
              : isDone
                ? "FT"
                : new Date(
                    Number(match.scheduledAt / 1_000_000n),
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
          </span>
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-end gap-1.5 min-w-0">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: away?.color ?? "#6b7280" }}
          >
            <TeamInitials name={away?.name ?? "?"} />
          </div>
          <span
            className={`text-sm font-semibold truncate max-w-full text-right ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
          >
            {away?.name ?? "TBD"}
          </span>
        </div>
      </div>

      {/* Status bar */}
      <div
        className={`h-0.5 ${isLive ? "bg-secondary" : isDone ? "bg-primary/30" : "bg-transparent"}`}
      />
    </div>
  );
}

function TeamsGrid({ teams }: { teams: TeamView[] }) {
  if (teams.length === 0) {
    return (
      <EmptyState
        icon="users"
        title="No teams yet"
        description="Teams will appear here once added to this tournament."
      />
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {teams.map((team) => (
        <div
          key={team.id.toString()}
          className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 shadow-fixture hover:shadow-elevated transition-smooth"
          data-ocid="team-card"
        >
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: team.color || "#6b7280" }}
          >
            <TeamInitials name={team.name} />
          </div>
          <span className="text-sm font-semibold text-foreground text-center truncate w-full">
            {team.name}
          </span>
          <div
            className="h-1 w-8 rounded-full"
            style={{ backgroundColor: team.color || "#6b7280" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function TournamentDetailPage() {
  const { tournamentId } = useParams({ from: "/tournaments/$tournamentId" });
  const tid = BigInt(tournamentId);
  const navigate = useNavigate();

  const { data: tournament, isLoading: loadingT } = useGetTournament(tid);
  const { data: matches = [], isLoading: loadingM } =
    useGetMatchesByTournament(tid);
  const { data: standings = [], isLoading: loadingS } =
    useGetLeagueStandings(tid);
  const { data: teams = [], isLoading: loadingTeams } =
    useGetTeamsByTournament(tid);
  const { data: bracket = [], isLoading: loadingBracket } =
    useGetKnockoutBracket(tid);

  if (loadingT)
    return <LoadingSpinner fullPage label="Loading tournament..." />;

  if (!tournament) {
    return (
      <EmptyState
        icon="trophy"
        title="Tournament not found"
        description="This tournament may have been removed."
        actionLabel="Back to Tournaments"
        onAction={() => navigate({ to: "/tournaments" })}
      />
    );
  }

  const isLeague =
    tournament.format === TournamentFormat.league ||
    tournament.format === TournamentFormat.hybrid;
  const isKnockout =
    tournament.format === TournamentFormat.knockout ||
    tournament.format === TournamentFormat.hybrid;

  const liveMatches = matches.filter((m) => m.status === MatchStatus.live);
  const completedMatches = matches.filter(
    (m) => m.status === MatchStatus.completed,
  );
  const upcomingMatches = matches.filter(
    (m) => m.status === MatchStatus.scheduled,
  );

  const defaultTab = isLeague ? "standings" : "fixtures";

  return (
    <div className="space-y-6" data-ocid="tournament-detail-page">
      {/* Back + Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild className="mt-0.5 shrink-0">
          <Link to="/tournaments" aria-label="Back to tournaments">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-2xl font-display font-bold text-foreground truncate">
              {tournament.name}
            </h1>
            <Badge
              className={`text-[10px] font-bold tracking-wider border ${statusColors[tournament.status]}`}
            >
              {statusLabels[tournament.status]}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {tournament.totalTeams.toString()} teams
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" />
              {formatLabels[tournament.format]}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {matches.length} fixtures
            </span>
          </div>
        </div>
      </div>

      {/* Live match strip */}
      {liveMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
              Live Now
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveMatches.map((m) => (
              <RecentResultCard key={m.id.toString()} match={m} teams={teams} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <Tabs defaultValue={defaultTab}>
        <TabsList className="h-auto flex-wrap gap-1 bg-muted/40 p-1">
          {isLeague && (
            <TabsTrigger value="standings" data-ocid="tab-standings">
              Standings
            </TabsTrigger>
          )}
          <TabsTrigger value="fixtures" data-ocid="tab-fixtures">
            Fixtures
          </TabsTrigger>
          {isKnockout && (
            <TabsTrigger value="bracket" data-ocid="tab-bracket">
              Bracket
            </TabsTrigger>
          )}
          <TabsTrigger value="teams" data-ocid="tab-teams">
            Teams
          </TabsTrigger>
        </TabsList>

        {/* Standings tab */}
        {isLeague && (
          <TabsContent value="standings" className="mt-5">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-fixture">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
                  League Table
                </span>
              </div>
              {loadingS ? (
                <div className="p-4 space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : standings.length === 0 ? (
                <EmptyState
                  icon="chart"
                  title="No standings yet"
                  description="Standings update after matches are completed."
                  data-ocid="empty-standings-detail"
                />
              ) : (
                <StandingsTable standings={standings} teams={teams} />
              )}
            </div>
          </TabsContent>
        )}

        {/* Fixtures tab */}
        <TabsContent value="fixtures" className="mt-5">
          {loadingM || loadingTeams ? (
            <LoadingSpinner label="Loading fixtures..." />
          ) : matches.length === 0 ? (
            <EmptyState
              icon="calendar"
              title="No fixtures yet"
              description="Fixtures will appear here once generated."
              data-ocid="empty-fixtures"
            />
          ) : (
            <div className="space-y-6">
              {completedMatches.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                    Results ({completedMatches.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {completedMatches.map((m) => (
                      <FixtureCard
                        key={m.id.toString()}
                        match={m}
                        teams={teams}
                      />
                    ))}
                  </div>
                </div>
              )}
              {upcomingMatches.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                    Upcoming ({upcomingMatches.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {upcomingMatches.map((m) => (
                      <FixtureCard
                        key={m.id.toString()}
                        match={m}
                        teams={teams}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Bracket tab */}
        {isKnockout && (
          <TabsContent value="bracket" className="mt-5">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-fixture">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
                  Knockout Bracket
                </span>
              </div>
              <div className="p-4">
                <KnockoutBracket
                  bracket={bracket}
                  matches={matches}
                  teams={teams}
                  isLoading={loadingBracket || loadingTeams}
                />
              </div>
            </div>
          </TabsContent>
        )}

        {/* Teams tab */}
        <TabsContent value="teams" className="mt-5">
          {loadingTeams ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <TeamsGrid teams={teams} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
