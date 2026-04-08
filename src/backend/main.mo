import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Types "./types/tournament";
import TournamentApi "./mixins/tournament-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let tournaments = List.empty<Types.Tournament>();
  let teams       = List.empty<Types.Team>();
  let players     = List.empty<Types.Player>();
  let matches     = List.empty<Types.Match>();

  let _nextTournamentId = { var value : Nat = 1 };
  let _nextTeamId       = { var value : Nat = 1 };
  let _nextPlayerId     = { var value : Nat = 1 };
  let _nextMatchId      = { var value : Nat = 1 };

  include TournamentApi(
    accessControlState,
    tournaments,
    teams,
    players,
    matches,
    _nextTournamentId,
    _nextTeamId,
    _nextPlayerId,
    _nextMatchId,
  );
};
