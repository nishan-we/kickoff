import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/tournament";
import TournamentLib "../lib/tournament";

mixin (
  accessControlState : AccessControl.AccessControlState,
  tournaments : List.List<Types.Tournament>,
  teams : List.List<Types.Team>,
  players : List.List<Types.Player>,
  matches : List.List<Types.Match>,
  nextTournamentId : { var value : Nat },
  nextTeamId : { var value : Nat },
  nextPlayerId : { var value : Nat },
  nextMatchId : { var value : Nat },
) {

  // ── Tournament management (admin only) ──────────────────────────────────

  public shared ({ caller }) func createTournament(
    input : Types.CreateTournamentInput
  ) : async Types.TournamentView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create tournaments");
    };
    let id = nextTournamentId.value;
    nextTournamentId.value += 1;
    let t = TournamentLib.createTournament(tournaments, id, input, Time.now());
    TournamentLib.tournamentToView(t);
  };

  public shared ({ caller }) func updateTournamentStatus(
    tournamentId : Common.TournamentId,
    status : Types.TournamentStatus,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update tournament status");
    };
    TournamentLib.updateTournamentStatus(tournaments, tournamentId, status);
  };

  // ── Team management (admin only) ────────────────────────────────────────

  public shared ({ caller }) func addTeam(
    input : Types.AddTeamInput
  ) : async Types.TeamView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add teams");
    };
    let id = nextTeamId.value;
    nextTeamId.value += 1;
    let team = TournamentLib.addTeam(teams, id, input);
    TournamentLib.teamToView(team);
  };

  // ── Player management (admin only) ──────────────────────────────────────

  public shared ({ caller }) func addPlayer(
    input : Types.AddPlayerInput
  ) : async Types.PlayerView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add players");
    };
    let id = nextPlayerId.value;
    nextPlayerId.value += 1;
    let player = TournamentLib.addPlayer(players, id, input);
    TournamentLib.playerToView(player);
  };

  public shared ({ caller }) func editPlayer(
    input : Types.EditPlayerInput
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can edit players");
    };
    TournamentLib.editPlayer(players, input);
  };

  // ── Fixture generation (admin only) ─────────────────────────────────────

  public shared ({ caller }) func generateFixtures(
    tournamentId : Common.TournamentId
  ) : async [Types.MatchView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can generate fixtures");
    };
    let startId = nextMatchId.value;
    let created = TournamentLib.generateFixtures(tournaments, teams, matches, startId, tournamentId, Time.now());
    nextMatchId.value += created.size();
    created.map<Types.Match, Types.MatchView>(TournamentLib.matchToView);
  };

  // ── Score editing (admin only) ───────────────────────────────────────────

  public shared ({ caller }) func updateScore(
    input : Types.UpdateScoreInput
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update scores");
    };
    TournamentLib.updateScore(matches, input);
  };

  public shared ({ caller }) func completeMatch(
    matchId : Common.MatchId
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can complete matches");
    };
    TournamentLib.completeMatch(matches, matchId, Time.now());
  };

  // ── Read-only queries (public / spectator access) ────────────────────────

  public query func listTournaments() : async [Types.TournamentView] {
    TournamentLib.listTournaments(tournaments);
  };

  public query func getTournament(
    tournamentId : Common.TournamentId
  ) : async ?Types.TournamentView {
    switch (TournamentLib.getTournament(tournaments, tournamentId)) {
      case (?t) ?TournamentLib.tournamentToView(t);
      case null null;
    };
  };

  public query func getTeamsByTournament(
    tournamentId : Common.TournamentId
  ) : async [Types.TeamView] {
    TournamentLib.getTeamsByTournament(teams, tournamentId);
  };

  public query func getPlayersByTeam(
    teamId : Common.TeamId
  ) : async [Types.PlayerView] {
    TournamentLib.getPlayersByTeam(players, teamId);
  };

  public query func getPlayersByTournament(
    tournamentId : Common.TournamentId
  ) : async [Types.PlayerView] {
    TournamentLib.getPlayersByTournament(players, tournamentId);
  };

  public query func getMatchesByTournament(
    tournamentId : Common.TournamentId
  ) : async [Types.MatchView] {
    TournamentLib.getMatchesByTournament(matches, tournamentId);
  };

  public query func getRecentResults(
    tournamentId : Common.TournamentId,
    limit : Nat,
  ) : async [Types.MatchView] {
    TournamentLib.getRecentResults(matches, tournamentId, limit);
  };

  public query func getLeagueStandings(
    tournamentId : Common.TournamentId
  ) : async [Types.LeagueStandingRow] {
    TournamentLib.computeLeagueStandings(matches, teams, tournamentId);
  };

  public query func getKnockoutBracket(
    tournamentId : Common.TournamentId
  ) : async [Types.KnockoutBracketMatch] {
    TournamentLib.computeKnockoutBracket(matches, teams, tournamentId);
  };
};
