import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "../lib/backend-actor";
import type {
  AddPlayerInput,
  AddTeamInput,
  CreateTournamentInput,
  EditPlayerInput,
  KnockoutBracketMatch,
  LeagueStandingRow,
  MatchId,
  MatchView,
  PlayerView,
  TeamId,
  TeamView,
  TournamentId,
  TournamentView,
  UpdateScoreInput,
} from "../types";
import { type TournamentStatus, UserRole } from "../types";
// --- Queries ---

export function useListTournaments() {
  const { actor, isFetching } = useActor();
  return useQuery<TournamentView[]>({
    queryKey: ["tournaments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTournaments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTournament(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<TournamentView | null>({
    queryKey: ["tournament", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return null;
      return actor.getTournament(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useGetTeamsByTournament(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<TeamView[]>({
    queryKey: ["teams", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getTeamsByTournament(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useGetPlayersByTournament(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<PlayerView[]>({
    queryKey: ["players", "tournament", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getPlayersByTournament(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useGetPlayersByTeam(teamId: TeamId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<PlayerView[]>({
    queryKey: ["players", "team", teamId?.toString()],
    queryFn: async () => {
      if (!actor || teamId == null) return [];
      return actor.getPlayersByTeam(teamId);
    },
    enabled: !!actor && !isFetching && teamId != null,
  });
}

export function useGetMatchesByTournament(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<MatchView[]>({
    queryKey: ["matches", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getMatchesByTournament(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
    refetchInterval: 30000,
  });
}

export function useGetRecentResults(
  tournamentId: TournamentId | null,
  limit = 5n,
) {
  const { actor, isFetching } = useActor();
  return useQuery<MatchView[]>({
    queryKey: ["recent-results", tournamentId?.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getRecentResults(tournamentId, limit);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useGetLeagueStandings(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<LeagueStandingRow[]>({
    queryKey: ["standings", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getLeagueStandings(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useGetKnockoutBracket(tournamentId: TournamentId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<KnockoutBracketMatch[]>({
    queryKey: ["knockout", tournamentId?.toString()],
    queryFn: async () => {
      if (!actor || tournamentId == null) return [];
      return actor.getKnockoutBracket(tournamentId);
    },
    enabled: !!actor && !isFetching && tournamentId != null,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["caller-role"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

// --- Mutations ---

export function useCreateTournament() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<TournamentView, Error, CreateTournamentInput>({
    mutationFn: (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTournament(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tournaments"] }),
  });
}

export function useUpdateTournamentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { tournamentId: TournamentId; status: TournamentStatus }
  >({
    mutationFn: ({ tournamentId, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTournamentStatus(tournamentId, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tournaments"] });
      qc.invalidateQueries({ queryKey: ["tournament"] });
    },
  });
}

export function useAddTeam() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<TeamView, Error, AddTeamInput>({
    mutationFn: (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTeam(input);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["teams", vars.tournamentId.toString()],
      }),
  });
}

export function useAddPlayer() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<PlayerView, Error, AddPlayerInput>({
    mutationFn: (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.addPlayer(input);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["players", "tournament", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["players", "team", vars.teamId.toString()],
      });
    },
  });
}

export function useEditPlayer() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    EditPlayerInput & { tournamentId: TournamentId; teamId: TeamId }
  >({
    mutationFn: ({ playerId, name, number, position }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editPlayer({ playerId, name, number, position });
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["players", "tournament", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["players", "team", vars.teamId.toString()],
      });
    },
  });
}

export function useGenerateFixtures() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<MatchView[], Error, TournamentId>({
    mutationFn: (tournamentId) => {
      if (!actor) throw new Error("Not connected");
      return actor.generateFixtures(tournamentId);
    },
    onSuccess: (_, tid) =>
      qc.invalidateQueries({ queryKey: ["matches", tid.toString()] }),
  });
}

export function useUpdateScore() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    UpdateScoreInput & { tournamentId: TournamentId }
  >({
    mutationFn: ({ matchId, homeScore, awayScore }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateScore({ matchId, homeScore, awayScore });
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["matches", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["standings", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["recent-results", vars.tournamentId.toString()],
      });
    },
  });
}

export function useCompleteMatch() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { matchId: MatchId; tournamentId: TournamentId }
  >({
    mutationFn: ({ matchId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.completeMatch(matchId);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["matches", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["standings", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["knockout", vars.tournamentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["recent-results", vars.tournamentId.toString()],
      });
    },
  });
}
