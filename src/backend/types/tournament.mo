import Common "common";

module {
  public type TournamentFormat = {
    #league;
    #knockout;
    #hybrid; // league + knockout
  };

  public type TournamentStatus = {
    #upcoming;
    #active;
    #completed;
  };

  public type Tournament = {
    id : Common.TournamentId;
    name : Text;
    format : TournamentFormat;
    totalTeams : Nat;
    status : TournamentStatus;
    createdAt : Common.Timestamp;
  };

  public type Team = {
    id : Common.TeamId;
    tournamentId : Common.TournamentId;
    name : Text;
    color : Text;
  };

  public type Player = {
    id : Common.PlayerId;
    teamId : Common.TeamId;
    tournamentId : Common.TournamentId;
    name : Text;
    number : Nat;
    position : Text;
  };

  public type MatchStatus = {
    #scheduled;
    #live;
    #completed;
  };

  public type MatchPhase = {
    #leagueStage;
    #knockoutRound : Nat; // round number (1 = final, 2 = semi, etc.)
  };

  public type Match = {
    id : Common.MatchId;
    tournamentId : Common.TournamentId;
    homeTeamId : Common.TeamId;
    awayTeamId : Common.TeamId;
    homeScore : Nat;
    awayScore : Nat;
    status : MatchStatus;
    phase : MatchPhase;
    scheduledAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
  };

  // Shared (API-boundary) types — no var fields

  public type TournamentView = {
    id : Common.TournamentId;
    name : Text;
    format : TournamentFormat;
    totalTeams : Nat;
    status : TournamentStatus;
    createdAt : Common.Timestamp;
  };

  public type TeamView = {
    id : Common.TeamId;
    tournamentId : Common.TournamentId;
    name : Text;
    color : Text;
  };

  public type PlayerView = {
    id : Common.PlayerId;
    teamId : Common.TeamId;
    tournamentId : Common.TournamentId;
    name : Text;
    number : Nat;
    position : Text;
  };

  public type MatchView = {
    id : Common.MatchId;
    tournamentId : Common.TournamentId;
    homeTeamId : Common.TeamId;
    awayTeamId : Common.TeamId;
    homeScore : Nat;
    awayScore : Nat;
    status : MatchStatus;
    phase : MatchPhase;
    scheduledAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
  };

  public type LeagueStandingRow = {
    teamId : Common.TeamId;
    teamName : Text;
    played : Nat;
    won : Nat;
    drawn : Nat;
    lost : Nat;
    goalsFor : Nat;
    goalsAgainst : Nat;
    goalDifference : Int;
    points : Nat;
    position : Nat;
  };

  public type KnockoutBracketMatch = {
    round : Nat;
    matchId : ?Common.MatchId;
    homeTeamId : ?Common.TeamId;
    awayTeamId : ?Common.TeamId;
    winnerId : ?Common.TeamId;
  };

  // Input types for creating/editing

  public type CreateTournamentInput = {
    name : Text;
    format : TournamentFormat;
    totalTeams : Nat;
  };

  public type AddTeamInput = {
    tournamentId : Common.TournamentId;
    name : Text;
    color : Text;
  };

  public type AddPlayerInput = {
    teamId : Common.TeamId;
    tournamentId : Common.TournamentId;
    name : Text;
    number : Nat;
    position : Text;
  };

  public type EditPlayerInput = {
    playerId : Common.PlayerId;
    name : Text;
    number : Nat;
    position : Text;
  };

  public type UpdateScoreInput = {
    matchId : Common.MatchId;
    homeScore : Nat;
    awayScore : Nat;
  };
};
