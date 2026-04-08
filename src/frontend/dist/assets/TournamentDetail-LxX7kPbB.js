import { j as jsxRuntimeExports, S as SkeletonCard, M as MatchStatus, k as useParams, b as useNavigate, l as useGetTournament, m as useGetMatchesByTournament, h as useGetLeagueStandings, g as useGetTeamsByTournament, n as useGetKnockoutBracket, o as LoadingSpinner, a as TournamentFormat, B as Button, L as Link, U as Users, d as Trophy, C as Calendar, T as TournamentStatus } from "./index-BMd2UGmK.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-wNLEOILW.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { R as RecentResultCard } from "./RecentResultCard-C49qyB9v.js";
import { m as motion, S as StandingsTable } from "./StandingsTable-CyA_fHcs.js";
import { A as ArrowLeft } from "./arrow-left-CWgP63wG.js";
function getTeamName(teams, teamId) {
  var _a;
  if (teamId == null) return "TBD";
  return ((_a = teams.find((t) => t.id === teamId)) == null ? void 0 : _a.name) ?? "TBD";
}
function getTeamColor(teams, teamId) {
  var _a;
  if (teamId == null) return "#6b7280";
  return ((_a = teams.find((t) => t.id === teamId)) == null ? void 0 : _a.color) ?? "#6b7280";
}
function getMatchForBracket(matches, bracketMatch) {
  if (bracketMatch.matchId == null) return void 0;
  return matches.find((m) => m.id === bracketMatch.matchId);
}
function BracketMatchCard({
  bracketMatch,
  match,
  teams
}) {
  const homeName = getTeamName(teams, bracketMatch.homeTeamId);
  const awayName = getTeamName(teams, bracketMatch.awayTeamId);
  const homeColor = getTeamColor(teams, bracketMatch.homeTeamId);
  const awayColor = getTeamColor(teams, bracketMatch.awayTeamId);
  const homeScore = match ? Number(match.homeScore) : null;
  const awayScore = match ? Number(match.awayScore) : null;
  const isCompleted = (match == null ? void 0 : match.status) === MatchStatus.completed;
  const isLive = (match == null ? void 0 : match.status) === MatchStatus.live;
  const winnerId = bracketMatch.winnerId;
  const homeIsWinner = winnerId != null && winnerId === bracketMatch.homeTeamId;
  const awayIsWinner = winnerId != null && winnerId === bracketMatch.awayTeamId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-52 bg-card border border-border rounded-lg overflow-hidden shadow-fixture",
      "data-ocid": `bracket-match-${bracketMatch.round}`,
      children: [
        isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1 bg-secondary/10 border-b border-secondary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-secondary tracking-wider", children: "LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 px-3 py-2.5 ${homeIsWinner ? "bg-accent/8" : ""} border-b border-border/60`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-2.5 w-2.5 rounded-full shrink-0",
                  style: { backgroundColor: homeColor }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs flex-1 truncate font-medium ${homeIsWinner ? "text-foreground font-semibold" : "text-muted-foreground"}`,
                  children: homeName
                }
              ),
              homeScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-bold tabular-nums ${homeIsWinner ? "text-foreground" : "text-muted-foreground"}`,
                  children: homeScore
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 px-3 py-2.5 ${awayIsWinner ? "bg-accent/8" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-2.5 w-2.5 rounded-full shrink-0",
                  style: { backgroundColor: awayColor }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs flex-1 truncate font-medium ${awayIsWinner ? "text-foreground font-semibold" : "text-muted-foreground"}`,
                  children: awayName
                }
              ),
              awayScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-bold tabular-nums ${awayIsWinner ? "text-foreground" : "text-muted-foreground"}`,
                  children: awayScore
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-0.5 ${isCompleted ? "bg-primary/40" : isLive ? "bg-secondary" : "bg-border"}`
          }
        )
      ]
    }
  );
}
function getRoundLabel(round, maxRound) {
  const r = Number(round);
  const max = Number(maxRound);
  if (r === max) return "Final";
  if (r === max - 1) return "Semi-Finals";
  if (r === max - 2) return "Quarter-Finals";
  return `Round ${r}`;
}
function KnockoutBracket({
  bracket,
  matches,
  teams,
  isLoading = false
}) {
  var _a;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-8 overflow-x-auto pb-4", children: [1, 2, 3].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 min-w-[208px]", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }, r)) });
  }
  if (bracket.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 text-muted-foreground text-sm", children: "No knockout bracket available yet." });
  }
  const rounds = bracket.reduce(
    (acc, m) => {
      const list = acc.get(m.round) ?? [];
      list.push(m);
      acc.set(m.round, list);
      return acc;
    },
    /* @__PURE__ */ new Map()
  );
  const sortedRounds = Array.from(rounds.entries()).sort(
    ([a], [b]) => a < b ? -1 : 1
  );
  const maxRound = ((_a = sortedRounds[sortedRounds.length - 1]) == null ? void 0 : _a[0]) ?? 1n;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-8 min-w-max", children: sortedRounds.map(([round, roundMatches]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 pb-2 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold tracking-widest text-muted-foreground uppercase", children: getRoundLabel(round, maxRound) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: roundMatches.map((bm) => {
      var _a2, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        BracketMatchCard,
        {
          bracketMatch: bm,
          match: getMatchForBracket(matches, bm),
          teams
        },
        `${round}-${((_a2 = bm.matchId) == null ? void 0 : _a2.toString()) ?? ((_b = bm.homeTeamId) == null ? void 0 : _b.toString()) ?? Math.random()}`
      );
    }) })
  ] }, round.toString())) }) });
}
const formatLabels = {
  [TournamentFormat.league]: "LEAGUE",
  [TournamentFormat.knockout]: "KNOCKOUT",
  [TournamentFormat.hybrid]: "HYBRID"
};
const statusColors = {
  [TournamentStatus.active]: "bg-secondary/15 text-secondary border-secondary/30",
  [TournamentStatus.upcoming]: "bg-accent/15 text-accent-foreground border-accent/30",
  [TournamentStatus.completed]: "bg-muted text-muted-foreground border-border"
};
const statusLabels = {
  [TournamentStatus.active]: "ACTIVE",
  [TournamentStatus.upcoming]: "UPCOMING",
  [TournamentStatus.completed]: "COMPLETED"
};
function TeamInitials({ name }) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: name.slice(0, 3).toUpperCase() });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: (parts[0][0] + parts[1][0]).toUpperCase() });
}
function FixtureCard({
  match,
  teams
}) {
  const home = teams.find((t) => t.id === match.homeTeamId);
  const away = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isDone = match.status === MatchStatus.completed;
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);
  const homeWon = isDone && homeScore > awayScore;
  const awayWon = isDone && awayScore > homeScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-lg border overflow-hidden bg-card shadow-fixture hover:shadow-elevated transition-smooth ${isLive ? "border-secondary/40" : "border-border"}`,
      "data-ocid": `fixture-card-${match.id}`,
      children: [
        isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-4 py-1.5 bg-secondary/10 border-b border-secondary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-secondary tracking-widest", children: "LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-start gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                style: { backgroundColor: (home == null ? void 0 : home.color) ?? "#6b7280" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TeamInitials, { name: (home == null ? void 0 : home.name) ?? "?" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm font-semibold truncate max-w-full ${homeWon ? "text-foreground" : "text-muted-foreground"}`,
                children: (home == null ? void 0 : home.name) ?? "TBD"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 shrink-0 px-2", children: [
            isDone || isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-2xl font-display font-bold tabular-nums ${homeWon ? "text-foreground" : "text-muted-foreground"}`,
                  children: homeScore
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "–" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-2xl font-display font-bold tabular-nums ${awayWon ? "text-foreground" : "text-muted-foreground"}`,
                  children: awayScore
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-muted-foreground", children: new Date(
              Number(match.scheduledAt / 1000000n)
            ).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold tracking-widest uppercase text-muted-foreground", children: isLive ? "LIVE" : isDone ? "FT" : new Date(
              Number(match.scheduledAt / 1000000n)
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-end gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                style: { backgroundColor: (away == null ? void 0 : away.color) ?? "#6b7280" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TeamInitials, { name: (away == null ? void 0 : away.name) ?? "?" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm font-semibold truncate max-w-full text-right ${awayWon ? "text-foreground" : "text-muted-foreground"}`,
                children: (away == null ? void 0 : away.name) ?? "TBD"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-0.5 ${isLive ? "bg-secondary" : isDone ? "bg-primary/30" : "bg-transparent"}`
          }
        )
      ]
    }
  );
}
function TeamsGrid({ teams }) {
  if (teams.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "users",
        title: "No teams yet",
        description: "Teams will appear here once added to this tournament."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 shadow-fixture hover:shadow-elevated transition-smooth",
      "data-ocid": "team-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm",
            style: { backgroundColor: team.color || "#6b7280" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TeamInitials, { name: team.name })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground text-center truncate w-full", children: team.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1 w-8 rounded-full",
            style: { backgroundColor: team.color || "#6b7280" }
          }
        )
      ]
    },
    team.id.toString()
  )) });
}
function TournamentDetailPage() {
  const { tournamentId } = useParams({ from: "/tournaments/$tournamentId" });
  const tid = BigInt(tournamentId);
  const navigate = useNavigate();
  const { data: tournament, isLoading: loadingT } = useGetTournament(tid);
  const { data: matches = [], isLoading: loadingM } = useGetMatchesByTournament(tid);
  const { data: standings = [], isLoading: loadingS } = useGetLeagueStandings(tid);
  const { data: teams = [], isLoading: loadingTeams } = useGetTeamsByTournament(tid);
  const { data: bracket = [], isLoading: loadingBracket } = useGetKnockoutBracket(tid);
  if (loadingT)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true, label: "Loading tournament..." });
  if (!tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "trophy",
        title: "Tournament not found",
        description: "This tournament may have been removed.",
        actionLabel: "Back to Tournaments",
        onAction: () => navigate({ to: "/tournaments" })
      }
    );
  }
  const isLeague = tournament.format === TournamentFormat.league || tournament.format === TournamentFormat.hybrid;
  const isKnockout = tournament.format === TournamentFormat.knockout || tournament.format === TournamentFormat.hybrid;
  const liveMatches = matches.filter((m) => m.status === MatchStatus.live);
  const completedMatches = matches.filter(
    (m) => m.status === MatchStatus.completed
  );
  const upcomingMatches = matches.filter(
    (m) => m.status === MatchStatus.scheduled
  );
  const defaultTab = isLeague ? "standings" : "fixtures";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "tournament-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", asChild: true, className: "mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tournaments", "aria-label": "Back to tournaments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground truncate", children: tournament.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-[10px] font-bold tracking-wider border ${statusColors[tournament.status]}`,
              children: statusLabels[tournament.status]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            tournament.totalTeams.toString(),
            " teams"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
            formatLabels[tournament.format]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            matches.length,
            " fixtures"
          ] })
        ] })
      ] })
    ] }),
    liveMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-secondary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-widest uppercase text-secondary", children: "Live Now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: liveMatches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecentResultCard, { match: m, teams }, m.id.toString())) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: defaultTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-auto flex-wrap gap-1 bg-muted/40 p-1", children: [
        isLeague && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "standings", "data-ocid": "tab-standings", children: "Standings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "fixtures", "data-ocid": "tab-fixtures", children: "Fixtures" }),
        isKnockout && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bracket", "data-ocid": "tab-bracket", children: "Bracket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "teams", "data-ocid": "tab-teams", children: "Teams" })
      ] }),
      isLeague && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "standings", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-fixture", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-[0.15em] uppercase text-foreground", children: "League Table" }) }),
        loadingS ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : standings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: "chart",
            title: "No standings yet",
            description: "Standings update after matches are completed.",
            "data-ocid": "empty-standings-detail"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(StandingsTable, { standings, teams })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fixtures", className: "mt-5", children: loadingM || loadingTeams ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading fixtures..." }) : matches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "calendar",
          title: "No fixtures yet",
          description: "Fixtures will appear here once generated.",
          "data-ocid": "empty-fixtures"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        completedMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3", children: [
            "Results (",
            completedMatches.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: completedMatches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FixtureCard,
            {
              match: m,
              teams
            },
            m.id.toString()
          )) })
        ] }),
        upcomingMatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3", children: [
            "Upcoming (",
            upcomingMatches.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: upcomingMatches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FixtureCard,
            {
              match: m,
              teams
            },
            m.id.toString()
          )) })
        ] })
      ] }) }),
      isKnockout && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bracket", className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-fixture", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-[0.15em] uppercase text-foreground", children: "Knockout Bracket" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          KnockoutBracket,
          {
            bracket,
            matches,
            teams,
            isLoading: loadingBracket || loadingTeams
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "teams", className: "mt-5", children: loadingTeams ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TeamsGrid, { teams }) })
    ] })
  ] });
}
export {
  TournamentDetailPage as default
};
