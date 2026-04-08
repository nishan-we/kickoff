export type {
  TournamentView,
  TeamView,
  PlayerView,
  MatchView,
  LeagueStandingRow,
  KnockoutBracketMatch,
  CreateTournamentInput,
  AddTeamInput,
  AddPlayerInput,
  EditPlayerInput,
  UpdateScoreInput,
  TournamentId,
  TeamId,
  PlayerId,
  MatchId,
  Timestamp,
  MatchPhase,
} from "../backend.d.ts";

export {
  TournamentFormat,
  TournamentStatus,
  MatchStatus,
  UserRole,
} from "../backend";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

export interface TournamentContextValue {
  activeTournamentId: bigint | null;
  setActiveTournamentId: (id: bigint | null) => void;
}
