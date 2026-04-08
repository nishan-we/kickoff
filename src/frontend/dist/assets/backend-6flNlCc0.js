import { T as TournamentStatus, a as TournamentFormat, M as MatchStatus, ai as UserRole } from "./index-BMd2UGmK.js";
const mockBackend = {
  _initializeAccessControl: async () => void 0,
  addPlayer: async (input) => ({
    id: BigInt(10),
    name: input.name,
    number: input.number,
    teamId: input.teamId,
    position: input.position,
    tournamentId: input.tournamentId
  }),
  addTeam: async (input) => ({
    id: BigInt(10),
    name: input.name,
    color: input.color,
    tournamentId: input.tournamentId
  }),
  assignCallerUserRole: async () => void 0,
  completeMatch: async () => void 0,
  createTournament: async (input) => ({
    id: BigInt(10),
    name: input.name,
    format: input.format,
    totalTeams: input.totalTeams,
    status: TournamentStatus.upcoming,
    createdAt: BigInt(Date.now())
  }),
  editPlayer: async () => void 0,
  generateFixtures: async () => [
    {
      id: BigInt(1),
      status: MatchStatus.completed,
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(2),
      homeScore: BigInt(2),
      awayScore: BigInt(1),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now()),
      completedAt: BigInt(Date.now())
    },
    {
      id: BigInt(2),
      status: MatchStatus.scheduled,
      homeTeamId: BigInt(3),
      awayTeamId: BigInt(4),
      homeScore: BigInt(0),
      awayScore: BigInt(0),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now() + 864e5)
    }
  ],
  getCallerUserRole: async () => UserRole.admin,
  getKnockoutBracket: async () => [
    {
      round: BigInt(1),
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(2),
      matchId: BigInt(5),
      winnerId: BigInt(1)
    },
    {
      round: BigInt(1),
      homeTeamId: BigInt(3),
      awayTeamId: BigInt(4),
      matchId: BigInt(6),
      winnerId: BigInt(3)
    },
    {
      round: BigInt(2),
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(3),
      matchId: BigInt(7)
    }
  ],
  getLeagueStandings: async () => [
    {
      position: BigInt(1),
      teamId: BigInt(1),
      teamName: "Manchester City",
      played: BigInt(10),
      won: BigInt(8),
      drawn: BigInt(1),
      lost: BigInt(1),
      goalsFor: BigInt(24),
      goalsAgainst: BigInt(8),
      goalDifference: BigInt(16),
      points: BigInt(25)
    },
    {
      position: BigInt(2),
      teamId: BigInt(2),
      teamName: "Arsenal",
      played: BigInt(10),
      won: BigInt(7),
      drawn: BigInt(2),
      lost: BigInt(1),
      goalsFor: BigInt(20),
      goalsAgainst: BigInt(10),
      goalDifference: BigInt(10),
      points: BigInt(23)
    },
    {
      position: BigInt(3),
      teamId: BigInt(3),
      teamName: "Liverpool",
      played: BigInt(10),
      won: BigInt(6),
      drawn: BigInt(2),
      lost: BigInt(2),
      goalsFor: BigInt(18),
      goalsAgainst: BigInt(12),
      goalDifference: BigInt(6),
      points: BigInt(20)
    },
    {
      position: BigInt(4),
      teamId: BigInt(4),
      teamName: "Chelsea",
      played: BigInt(10),
      won: BigInt(5),
      drawn: BigInt(2),
      lost: BigInt(3),
      goalsFor: BigInt(15),
      goalsAgainst: BigInt(13),
      goalDifference: BigInt(2),
      points: BigInt(17)
    }
  ],
  getMatchesByTournament: async () => [
    {
      id: BigInt(1),
      status: MatchStatus.completed,
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(2),
      homeScore: BigInt(2),
      awayScore: BigInt(1),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now() - 864e5),
      completedAt: BigInt(Date.now() - 864e5)
    },
    {
      id: BigInt(2),
      status: MatchStatus.live,
      homeTeamId: BigInt(3),
      awayTeamId: BigInt(4),
      homeScore: BigInt(1),
      awayScore: BigInt(1),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now())
    },
    {
      id: BigInt(3),
      status: MatchStatus.scheduled,
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(3),
      homeScore: BigInt(0),
      awayScore: BigInt(0),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now() + 864e5)
    }
  ],
  getPlayersByTeam: async () => [
    {
      id: BigInt(1),
      name: "Erling Haaland",
      number: BigInt(9),
      teamId: BigInt(1),
      position: "Forward",
      tournamentId: BigInt(1)
    },
    {
      id: BigInt(2),
      name: "Kevin De Bruyne",
      number: BigInt(17),
      teamId: BigInt(1),
      position: "Midfielder",
      tournamentId: BigInt(1)
    }
  ],
  getPlayersByTournament: async () => [
    {
      id: BigInt(1),
      name: "Erling Haaland",
      number: BigInt(9),
      teamId: BigInt(1),
      position: "Forward",
      tournamentId: BigInt(1)
    },
    {
      id: BigInt(2),
      name: "Kevin De Bruyne",
      number: BigInt(17),
      teamId: BigInt(1),
      position: "Midfielder",
      tournamentId: BigInt(1)
    },
    {
      id: BigInt(3),
      name: "Bukayo Saka",
      number: BigInt(7),
      teamId: BigInt(2),
      position: "Forward",
      tournamentId: BigInt(1)
    }
  ],
  getRecentResults: async () => [
    {
      id: BigInt(1),
      status: MatchStatus.completed,
      homeTeamId: BigInt(1),
      awayTeamId: BigInt(2),
      homeScore: BigInt(3),
      awayScore: BigInt(1),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now() - 1728e5),
      completedAt: BigInt(Date.now() - 1728e5)
    },
    {
      id: BigInt(2),
      status: MatchStatus.completed,
      homeTeamId: BigInt(3),
      awayTeamId: BigInt(4),
      homeScore: BigInt(2),
      awayScore: BigInt(2),
      phase: { __kind__: "leagueStage", leagueStage: null },
      tournamentId: BigInt(1),
      scheduledAt: BigInt(Date.now() - 864e5),
      completedAt: BigInt(Date.now() - 864e5)
    }
  ],
  getTeamsByTournament: async () => [
    { id: BigInt(1), name: "Manchester City", color: "#6CABDD", tournamentId: BigInt(1) },
    { id: BigInt(2), name: "Arsenal", color: "#EF0107", tournamentId: BigInt(1) },
    { id: BigInt(3), name: "Liverpool", color: "#C8102E", tournamentId: BigInt(1) },
    { id: BigInt(4), name: "Chelsea", color: "#034694", tournamentId: BigInt(1) }
  ],
  getTournament: async () => ({
    id: BigInt(1),
    name: "Premier Cup 2026",
    format: TournamentFormat.hybrid,
    totalTeams: BigInt(4),
    status: TournamentStatus.active,
    createdAt: BigInt(Date.now() - 6048e5)
  }),
  isCallerAdmin: async () => true,
  listTournaments: async () => [
    {
      id: BigInt(1),
      name: "Premier Cup 2026",
      format: TournamentFormat.hybrid,
      totalTeams: BigInt(4),
      status: TournamentStatus.active,
      createdAt: BigInt(Date.now() - 6048e5)
    },
    {
      id: BigInt(2),
      name: "La Liga Challenge",
      format: TournamentFormat.league,
      totalTeams: BigInt(8),
      status: TournamentStatus.upcoming,
      createdAt: BigInt(Date.now() - 2592e5)
    },
    {
      id: BigInt(3),
      name: "Copa Knockout",
      format: TournamentFormat.knockout,
      totalTeams: BigInt(16),
      status: TournamentStatus.completed,
      createdAt: BigInt(Date.now() - 12096e5)
    }
  ],
  updateScore: async () => void 0,
  updateTournamentStatus: async () => void 0
};
export {
  mockBackend
};
