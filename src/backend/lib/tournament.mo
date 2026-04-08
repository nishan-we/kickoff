import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/tournament";

module {

  // ── View helpers ─────────────────────────────────────────────────────────

  public func tournamentToView(t : Types.Tournament) : Types.TournamentView {
    { id = t.id; name = t.name; format = t.format; totalTeams = t.totalTeams; status = t.status; createdAt = t.createdAt };
  };

  public func teamToView(t : Types.Team) : Types.TeamView {
    { id = t.id; tournamentId = t.tournamentId; name = t.name; color = t.color };
  };

  public func playerToView(p : Types.Player) : Types.PlayerView {
    { id = p.id; teamId = p.teamId; tournamentId = p.tournamentId; name = p.name; number = p.number; position = p.position };
  };

  public func matchToView(m : Types.Match) : Types.MatchView {
    { id = m.id; tournamentId = m.tournamentId; homeTeamId = m.homeTeamId; awayTeamId = m.awayTeamId; homeScore = m.homeScore; awayScore = m.awayScore; status = m.status; phase = m.phase; scheduledAt = m.scheduledAt; completedAt = m.completedAt };
  };

  // ── Tournament ────────────────────────────────────────────────────────────

  public func createTournament(
    tournaments : List.List<Types.Tournament>,
    nextId : Nat,
    input : Types.CreateTournamentInput,
    now : Common.Timestamp,
  ) : Types.Tournament {
    let t : Types.Tournament = {
      id = nextId;
      name = input.name;
      format = input.format;
      totalTeams = input.totalTeams;
      status = #upcoming;
      createdAt = now;
    };
    tournaments.add(t);
    t;
  };

  public func getTournament(
    tournaments : List.List<Types.Tournament>,
    id : Common.TournamentId,
  ) : ?Types.Tournament {
    tournaments.find(func(t) { t.id == id });
  };

  public func listTournaments(
    tournaments : List.List<Types.Tournament>,
  ) : [Types.TournamentView] {
    tournaments.toArray().map<Types.Tournament, Types.TournamentView>(tournamentToView);
  };

  public func updateTournamentStatus(
    tournaments : List.List<Types.Tournament>,
    id : Common.TournamentId,
    status : Types.TournamentStatus,
  ) {
    tournaments.mapInPlace(func(t) {
      if (t.id == id) { { t with status } } else { t };
    });
  };

  // ── Teams ─────────────────────────────────────────────────────────────────

  public func addTeam(
    teams : List.List<Types.Team>,
    nextId : Nat,
    input : Types.AddTeamInput,
  ) : Types.Team {
    let team : Types.Team = {
      id = nextId;
      tournamentId = input.tournamentId;
      name = input.name;
      color = input.color;
    };
    teams.add(team);
    team;
  };

  public func getTeamsByTournament(
    teams : List.List<Types.Team>,
    tournamentId : Common.TournamentId,
  ) : [Types.TeamView] {
    let arr : [Types.Team] = teams.toArray();
    arr.filter(func(t) { t.tournamentId == tournamentId })
      .map<Types.Team, Types.TeamView>(teamToView);
  };

  // ── Players ───────────────────────────────────────────────────────────────

  public func addPlayer(
    players : List.List<Types.Player>,
    nextId : Nat,
    input : Types.AddPlayerInput,
  ) : Types.Player {
    let player : Types.Player = {
      id = nextId;
      teamId = input.teamId;
      tournamentId = input.tournamentId;
      name = input.name;
      number = input.number;
      position = input.position;
    };
    players.add(player);
    player;
  };

  public func editPlayer(
    players : List.List<Types.Player>,
    input : Types.EditPlayerInput,
  ) {
    players.mapInPlace(func(p) {
      if (p.id == input.playerId) {
        { p with name = input.name; number = input.number; position = input.position };
      } else { p };
    });
  };

  public func getPlayersByTeam(
    players : List.List<Types.Player>,
    teamId : Common.TeamId,
  ) : [Types.PlayerView] {
    let arr : [Types.Player] = players.toArray();
    arr.filter(func(p) { p.teamId == teamId })
      .map<Types.Player, Types.PlayerView>(playerToView);
  };

  public func getPlayersByTournament(
    players : List.List<Types.Player>,
    tournamentId : Common.TournamentId,
  ) : [Types.PlayerView] {
    let arr : [Types.Player] = players.toArray();
    arr.filter(func(p) { p.tournamentId == tournamentId })
      .map<Types.Player, Types.PlayerView>(playerToView);
  };

  // ── Fixtures ──────────────────────────────────────────────────────────────

  // Round-robin schedule: each pair plays once (home/away determined by order)
  func makeLeagueFixtures(
    teamIds : [Common.TeamId],
    matches : List.List<Types.Match>,
    tournamentId : Common.TournamentId,
    startId : Nat,
    now : Common.Timestamp,
  ) : Nat {
    var id = startId;
    let n = teamIds.size();
    for (i in Nat.range(0, n)) {
      for (j in Nat.range(i + 1, n)) {
        let m : Types.Match = {
          id = id;
          tournamentId;
          homeTeamId = teamIds[i];
          awayTeamId = teamIds[j];
          homeScore = 0;
          awayScore = 0;
          status = #scheduled;
          phase = #leagueStage;
          scheduledAt = now;
          completedAt = null;
        };
        matches.add(m);
        id += 1;
      };
    };
    id;
  };

  // Single-elimination knockout: number of rounds = ceiling(log2(n))
  // We create TBD bracket slots for first round
  func makeKnockoutFixtures(
    teamIds : [Common.TeamId],
    matches : List.List<Types.Match>,
    tournamentId : Common.TournamentId,
    startId : Nat,
    now : Common.Timestamp,
    roundNumber : Nat,
  ) : Nat {
    var id = startId;
    let n = teamIds.size();
    var i = 0;
    while (i + 1 < n) {
      let m : Types.Match = {
        id = id;
        tournamentId;
        homeTeamId = teamIds[i];
        awayTeamId = teamIds[i + 1];
        homeScore = 0;
        awayScore = 0;
        status = #scheduled;
        phase = #knockoutRound roundNumber;
        scheduledAt = now;
        completedAt = null;
      };
      matches.add(m);
      id += 1;
      i += 2;
    };
    id;
  };

  public func generateFixtures(
    tournaments : List.List<Types.Tournament>,
    teams : List.List<Types.Team>,
    matches : List.List<Types.Match>,
    nextMatchId : Nat,
    tournamentId : Common.TournamentId,
    now : Common.Timestamp,
  ) : [Types.Match] {
    let tOpt = getTournament(tournaments, tournamentId);
    let tournament = switch (tOpt) {
      case (?t) t;
      case null { return [] };
    };
    // Collect teams for this tournament
    let teamsArr : [Types.Team] = teams.toArray();
    let tTeamIds = teamsArr.filter(func(t) { t.tournamentId == tournamentId })
      .map(func(t : Types.Team) : Common.TeamId { t.id });

    let sizeBefore = matches.size();
    var nextId = nextMatchId;

    switch (tournament.format) {
      case (#league) {
        nextId := makeLeagueFixtures(tTeamIds, matches, tournamentId, nextId, now);
      };
      case (#knockout) {
        nextId := makeKnockoutFixtures(tTeamIds, matches, tournamentId, nextId, now, 1);
      };
      case (#hybrid) {
        // League stage first, then knockout stage with same teams
        nextId := makeLeagueFixtures(tTeamIds, matches, tournamentId, nextId, now);
        nextId := makeKnockoutFixtures(tTeamIds, matches, tournamentId, nextId, now, 1);
      };
    };

    // Return only the newly created matches
    let sizeAfter = matches.size();
    matches.sliceToArray(sizeBefore, sizeAfter);
  };

  public func getMatchesByTournament(
    matches : List.List<Types.Match>,
    tournamentId : Common.TournamentId,
  ) : [Types.MatchView] {
    let arr : [Types.Match] = matches.toArray();
    arr.filter(func(m) { m.tournamentId == tournamentId })
      .map<Types.Match, Types.MatchView>(matchToView);
  };

  public func updateScore(
    matches : List.List<Types.Match>,
    input : Types.UpdateScoreInput,
  ) {
    matches.mapInPlace(func(m) {
      if (m.id == input.matchId) {
        { m with homeScore = input.homeScore; awayScore = input.awayScore; status = #live };
      } else { m };
    });
  };

  public func completeMatch(
    matches : List.List<Types.Match>,
    matchId : Common.MatchId,
    now : Common.Timestamp,
  ) {
    matches.mapInPlace(func(m) {
      if (m.id == matchId) {
        { m with status = #completed; completedAt = ?now };
      } else { m };
    });
  };

  public func getRecentResults(
    matches : List.List<Types.Match>,
    tournamentId : Common.TournamentId,
    limit : Nat,
  ) : [Types.MatchView] {
    let arr : [Types.Match] = matches.toArray();
    let completed = arr.filter(func(m) {
      m.tournamentId == tournamentId and m.status == #completed
    });
    // Sort descending by completedAt (most recent first)
    let sorted = completed.sort(func(a : Types.Match, b : Types.Match) : { #less; #equal; #greater } {
      let ta = switch (a.completedAt) { case (?t) t; case null 0 };
      let tb = switch (b.completedAt) { case (?t) t; case null 0 };
      Int.compare(tb, ta);
    });
    let taken = if (sorted.size() <= limit) sorted else sorted.sliceToArray(0, limit);
    taken.map<Types.Match, Types.MatchView>(matchToView);
  };

  // ── Standings ─────────────────────────────────────────────────────────────

  public func computeLeagueStandings(
    matches : List.List<Types.Match>,
    teams : List.List<Types.Team>,
    tournamentId : Common.TournamentId,
  ) : [Types.LeagueStandingRow] {
    let teamsArr : [Types.Team] = teams.toArray();
    let matchesArr : [Types.Match] = matches.toArray();
    let tTeams = teamsArr.filter(func(t) { t.tournamentId == tournamentId });
    let tMatches = matchesArr.filter(func(m) {
      m.tournamentId == tournamentId and m.status == #completed and m.phase == #leagueStage
    });

    // Build rows per team
    let rows = tTeams.map(func(team : Types.Team) : Types.LeagueStandingRow {
      var played = 0;
      var won = 0;
      var drawn = 0;
      var lost = 0;
      var goalsFor = 0;
      var goalsAgainst = 0;

      for (m in tMatches.values()) {
        if (m.homeTeamId == team.id) {
          played += 1;
          goalsFor += m.homeScore;
          goalsAgainst += m.awayScore;
          if (m.homeScore > m.awayScore) { won += 1 }
          else if (m.homeScore == m.awayScore) { drawn += 1 }
          else { lost += 1 };
        } else if (m.awayTeamId == team.id) {
          played += 1;
          goalsFor += m.awayScore;
          goalsAgainst += m.homeScore;
          if (m.awayScore > m.homeScore) { won += 1 }
          else if (m.awayScore == m.homeScore) { drawn += 1 }
          else { lost += 1 };
        };
      };

      let points = won * 3 + drawn;
      let gd : Int = goalsFor.toInt() - goalsAgainst.toInt();

      {
        teamId = team.id;
        teamName = team.name;
        played;
        won;
        drawn;
        lost;
        goalsFor;
        goalsAgainst;
        goalDifference = gd;
        points;
        position = 0; // filled after sort
      };
    });

    // Sort: points desc, then goal difference desc, then goals for desc
    let sorted = rows.sort(func(a : Types.LeagueStandingRow, b : Types.LeagueStandingRow) : { #less; #equal; #greater } {
      if (a.points > b.points) { #less }
      else if (a.points < b.points) { #greater }
      else if (a.goalDifference > b.goalDifference) { #less }
      else if (a.goalDifference < b.goalDifference) { #greater }
      else if (a.goalsFor > b.goalsFor) { #less }
      else if (a.goalsFor < b.goalsFor) { #greater }
      else { #equal };
    });

    // Assign position
    sorted.mapEntries(func(row : Types.LeagueStandingRow, i : Nat) : Types.LeagueStandingRow {
      { row with position = i + 1 };
    });
  };

  public func computeKnockoutBracket(
    matches : List.List<Types.Match>,
    _teams : List.List<Types.Team>,
    tournamentId : Common.TournamentId,
  ) : [Types.KnockoutBracketMatch] {
    let matchesArr : [Types.Match] = matches.toArray();
    let tMatches = matchesArr.filter(func(m) {
      m.tournamentId == tournamentId and
      (switch (m.phase) { case (#knockoutRound _) true; case _ false })
    });

    tMatches.map(func(m : Types.Match) : Types.KnockoutBracketMatch {
      let round = switch (m.phase) { case (#knockoutRound r) r; case _ 0 };
      let winnerId : ?Common.TeamId = if (m.status == #completed) {
        if (m.homeScore > m.awayScore) { ?m.homeTeamId }
        else if (m.awayScore > m.homeScore) { ?m.awayTeamId }
        else { null };
      } else { null };
      {
        round;
        matchId = ?m.id;
        homeTeamId = ?m.homeTeamId;
        awayTeamId = ?m.awayTeamId;
        winnerId;
      };
    });
  };
};
