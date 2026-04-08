import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AddTeamInput {
    name: string;
    color: string;
    tournamentId: TournamentId;
}
export type Timestamp = bigint;
export interface TournamentView {
    id: TournamentId;
    status: TournamentStatus;
    totalTeams: bigint;
    name: string;
    createdAt: Timestamp;
    format: TournamentFormat;
}
export interface TeamView {
    id: TeamId;
    name: string;
    color: string;
    tournamentId: TournamentId;
}
export type MatchPhase = {
    __kind__: "knockoutRound";
    knockoutRound: bigint;
} | {
    __kind__: "leagueStage";
    leagueStage: null;
};
export interface EditPlayerInput {
    playerId: PlayerId;
    name: string;
    number: bigint;
    position: string;
}
export interface MatchView {
    id: MatchId;
    status: MatchStatus;
    completedAt?: Timestamp;
    awayTeamId: TeamId;
    homeTeamId: TeamId;
    homeScore: bigint;
    awayScore: bigint;
    phase: MatchPhase;
    tournamentId: TournamentId;
    scheduledAt: Timestamp;
}
export type MatchId = bigint;
export type TeamId = bigint;
export type PlayerId = bigint;
export type TournamentId = bigint;
export interface LeagueStandingRow {
    won: bigint;
    teamName: string;
    goalDifference: bigint;
    played: bigint;
    lost: bigint;
    goalsFor: bigint;
    goalsAgainst: bigint;
    teamId: TeamId;
    position: bigint;
    drawn: bigint;
    points: bigint;
}
export interface CreateTournamentInput {
    totalTeams: bigint;
    name: string;
    format: TournamentFormat;
}
export interface AddPlayerInput {
    name: string;
    number: bigint;
    teamId: TeamId;
    position: string;
    tournamentId: TournamentId;
}
export interface UpdateScoreInput {
    matchId: MatchId;
    homeScore: bigint;
    awayScore: bigint;
}
export interface KnockoutBracketMatch {
    winnerId?: TeamId;
    awayTeamId?: TeamId;
    homeTeamId?: TeamId;
    matchId?: MatchId;
    round: bigint;
}
export interface PlayerView {
    id: PlayerId;
    name: string;
    number: bigint;
    teamId: TeamId;
    position: string;
    tournamentId: TournamentId;
}
export enum MatchStatus {
    scheduled = "scheduled",
    live = "live",
    completed = "completed"
}
export enum TournamentFormat {
    knockout = "knockout",
    hybrid = "hybrid",
    league = "league"
}
export enum TournamentStatus {
    active = "active",
    upcoming = "upcoming",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPlayer(input: AddPlayerInput): Promise<PlayerView>;
    addTeam(input: AddTeamInput): Promise<TeamView>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeMatch(matchId: MatchId): Promise<void>;
    createTournament(input: CreateTournamentInput): Promise<TournamentView>;
    editPlayer(input: EditPlayerInput): Promise<void>;
    generateFixtures(tournamentId: TournamentId): Promise<Array<MatchView>>;
    getCallerUserRole(): Promise<UserRole>;
    getKnockoutBracket(tournamentId: TournamentId): Promise<Array<KnockoutBracketMatch>>;
    getLeagueStandings(tournamentId: TournamentId): Promise<Array<LeagueStandingRow>>;
    getMatchesByTournament(tournamentId: TournamentId): Promise<Array<MatchView>>;
    getPlayersByTeam(teamId: TeamId): Promise<Array<PlayerView>>;
    getPlayersByTournament(tournamentId: TournamentId): Promise<Array<PlayerView>>;
    getRecentResults(tournamentId: TournamentId, limit: bigint): Promise<Array<MatchView>>;
    getTeamsByTournament(tournamentId: TournamentId): Promise<Array<TeamView>>;
    getTournament(tournamentId: TournamentId): Promise<TournamentView | null>;
    isCallerAdmin(): Promise<boolean>;
    listTournaments(): Promise<Array<TournamentView>>;
    updateScore(input: UpdateScoreInput): Promise<void>;
    updateTournamentStatus(tournamentId: TournamentId, status: TournamentStatus): Promise<void>;
}
