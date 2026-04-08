import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Pencil, Shield, Trophy, User, Users, Zap } from "lucide-react";
import { useState } from "react";
import { AddPlayerForm } from "../components/AddPlayerForm";
import { AddTeamForm } from "../components/AddTeamForm";
import { CreateTournamentForm } from "../components/CreateTournamentForm";
import { EditPlayerModal } from "../components/EditPlayerModal";
import { ScoreEditor } from "../components/ScoreEditor";
import {
  useGetPlayersByTeam,
  useGetTeamsByTournament,
  useIsAdmin,
  useListTournaments,
} from "../hooks/use-tournament";
import type { PlayerView } from "../types";

// --- Player Management section (view + edit inline) ---
function PlayerManager() {
  const { data: tournaments = [] } = useListTournaments();
  const [tournamentId, setTournamentId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [editingPlayer, setEditingPlayer] = useState<PlayerView | null>(null);

  const { data: teams = [] } = useGetTeamsByTournament(
    tournamentId ? BigInt(tournamentId) : null,
  );
  const { data: players = [], isLoading: loadingP } = useGetPlayersByTeam(
    teamId ? BigInt(teamId) : null,
  );

  const selectedTeam = teams.find((t) => t.id.toString() === teamId);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <p className="text-sm font-medium">Tournament</p>
          <Select
            value={tournamentId}
            onValueChange={(v) => {
              setTournamentId(v);
              setTeamId("");
            }}
          >
            <SelectTrigger data-ocid="admin-edit-tournament">
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
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium">Team</p>
          <Select
            value={teamId}
            onValueChange={setTeamId}
            disabled={!tournamentId}
          >
            <SelectTrigger data-ocid="admin-edit-team">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loadingP && teamId ? (
        <div className="space-y-2">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-12" />
          ))}
        </div>
      ) : players.length === 0 && teamId ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No players registered for this team yet.
        </div>
      ) : players.length > 0 ? (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
                  #
                </th>
                <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground hidden sm:table-cell">
                  Position
                </th>
                <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr
                  key={p.id.toString()}
                  className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}
                  data-ocid="admin-player-row"
                >
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {p.number.toString()}
                  </td>
                  <td className="px-4 py-3 font-display font-medium">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {p.position}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingPlayer(p)}
                      aria-label={`Edit ${p.name}`}
                      data-ocid="admin-edit-player-btn"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" aria-hidden />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <EditPlayerModal
        player={editingPlayer}
        tournamentId={tournamentId ? BigInt(tournamentId) : 0n}
        teamId={teamId ? BigInt(teamId) : (selectedTeam?.id ?? 0n)}
        open={editingPlayer !== null}
        onClose={() => setEditingPlayer(null)}
      />
    </div>
  );
}

// --- Main Admin Page ---
export default function AdminPage() {
  const { identity, login } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (!identity) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-6"
        data-ocid="admin-login-gate"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-fixture">
          <Shield className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-display font-bold mb-2">
            Admin Access Required
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with Internet Identity to access the tournament
            administration panel.
          </p>
        </div>
        <Button size="lg" onClick={() => login()} data-ocid="admin-login-btn">
          Sign in with Internet Identity
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 pt-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 gap-4"
        data-ocid="admin-access-denied"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Shield className="h-8 w-8 text-destructive" aria-hidden />
        </div>
        <h1 className="text-xl font-display font-bold">Access Denied</h1>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          You do not have administrator privileges for this platform.
        </p>
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin-page">
      {/* Page header */}
      <div className="flex items-center gap-4 p-5 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
          <Shield className="h-6 w-6 text-primary" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-display font-bold">Admin Panel</h1>
            <Badge variant="default" className="text-xs">
              ADMIN
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage tournaments, teams, players, scores, and fixtures
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tournaments">
        <TabsList className="flex-wrap h-auto gap-1 p-1">
          <TabsTrigger
            value="tournaments"
            className="gap-1.5 text-xs sm:text-sm"
            data-ocid="admin-tab-tournaments"
          >
            <Trophy className="h-3.5 w-3.5" aria-hidden />
            Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="gap-1.5 text-xs sm:text-sm"
            data-ocid="admin-tab-teams"
          >
            <Users className="h-3.5 w-3.5" aria-hidden />
            Teams
          </TabsTrigger>
          <TabsTrigger
            value="players"
            className="gap-1.5 text-xs sm:text-sm"
            data-ocid="admin-tab-players"
          >
            <User className="h-3.5 w-3.5" aria-hidden />
            Add Player
          </TabsTrigger>
          <TabsTrigger
            value="edit-players"
            className="gap-1.5 text-xs sm:text-sm"
            data-ocid="admin-tab-edit-players"
          >
            <User className="h-3.5 w-3.5" aria-hidden />
            Edit Players
          </TabsTrigger>
          <TabsTrigger
            value="scores"
            className="gap-1.5 text-xs sm:text-sm"
            data-ocid="admin-tab-scores"
          >
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Scores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tournaments" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" aria-hidden />
                Create Tournament
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateTournamentForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" aria-hidden />
                Add Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AddTeamForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <User className="h-4 w-4 text-primary" aria-hidden />
                Register Player
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AddPlayerForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit-players" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <User className="h-4 w-4 text-primary" aria-hidden />
                Manage Squad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scores" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" aria-hidden />
                Match Scores & Fixtures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
