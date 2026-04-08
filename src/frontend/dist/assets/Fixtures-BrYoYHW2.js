import { c as createLucideIcon, M as MatchStatus, j as jsxRuntimeExports, C as Calendar, L as Link, u as useListTournaments, r as reactExports, m as useGetMatchesByTournament, g as useGetTeamsByTournament } from "./index-BMd2UGmK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-zBnqW-9V.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-wNLEOILW.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function formatMatchDate(ts) {
  const d = new Date(Number(ts) / 1e6);
  return {
    date: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  };
}
function phaseLabel$1(phase) {
  if (phase.__kind__ === "leagueStage") return "League Stage";
  const r = Number(phase.knockoutRound);
  const map = {
    1: "Final",
    2: "Semi-Final",
    4: "Quarter-Final",
    8: "Round of 16"
  };
  return map[r] ?? `Round of ${r * 2}`;
}
function StatusBadge({ status }) {
  if (status === MatchStatus.live) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-secondary-foreground" }),
      "LIVE"
    ] });
  }
  if (status === MatchStatus.completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] font-bold tracking-wider", children: "FINAL" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "secondary",
      className: "text-[10px] font-medium tracking-wide bg-muted text-muted-foreground border-0",
      children: "UPCOMING"
    }
  );
}
function ScoreDisplay({
  match,
  homeTeam,
  awayTeam
}) {
  const isDecided = match.status === MatchStatus.completed || match.status === MatchStatus.live;
  const { time } = formatMatchDate(match.scheduledAt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full gap-2 py-3 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-end gap-0.5 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-display font-bold text-sm sm:text-base text-foreground truncate max-w-full text-right",
          title: (homeTeam == null ? void 0 : homeTeam.name) ?? "TBD",
          children: (homeTeam == null ? void 0 : homeTeam.name) ?? "TBD"
        }
      ),
      (homeTeam == null ? void 0 : homeTeam.color) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "h-1 w-8 rounded-full",
          style: { background: homeTeam.color }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0 px-3 sm:px-5 gap-1", children: [
      isDecided ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl font-display font-extrabold tabular-nums text-foreground leading-none", children: match.homeScore.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-muted-foreground leading-none", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl font-display font-extrabold tabular-nums text-foreground leading-none", children: match.awayScore.toString() })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-muted-foreground font-mono", children: "vs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3", "aria-hidden": true }),
          time
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-start gap-0.5 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-display font-bold text-sm sm:text-base text-foreground truncate max-w-full",
          title: (awayTeam == null ? void 0 : awayTeam.name) ?? "TBD",
          children: (awayTeam == null ? void 0 : awayTeam.name) ?? "TBD"
        }
      ),
      (awayTeam == null ? void 0 : awayTeam.color) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "h-1 w-8 rounded-full",
          style: { background: awayTeam.color }
        }
      )
    ] })
  ] });
}
function MatchCard({ match, teams, linkable = false }) {
  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isCompleted = match.status === MatchStatus.completed;
  const { date } = formatMatchDate(match.scheduledAt);
  const cardContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "rounded-lg border transition-smooth overflow-hidden",
        isLive ? "border-secondary/50 bg-secondary/5 shadow-fixture" : isCompleted ? "border-border bg-card shadow-fixture" : "border-border bg-card",
        linkable ? "hover:shadow-elevated hover:border-primary/30 cursor-pointer" : ""
      ].filter(Boolean).join(" "),
      "data-ocid": "match-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: [
              "flex items-center justify-between px-4 py-1.5 border-b text-[11px] font-semibold uppercase tracking-widest",
              isLive ? "bg-secondary/10 border-secondary/20 text-secondary" : "bg-muted/50 border-border text-muted-foreground"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: phaseLabel$1(match.phase) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-normal normal-case tracking-normal", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3", "aria-hidden": true }),
                date
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreDisplay, { match, homeTeam, awayTeam })
      ]
    }
  );
  if (linkable) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/tournaments/$tournamentId",
        params: { tournamentId: match.tournamentId.toString() },
        "aria-label": `Match: ${(homeTeam == null ? void 0 : homeTeam.name) ?? "TBD"} vs ${(awayTeam == null ? void 0 : awayTeam.name) ?? "TBD"}`,
        children: cardContent
      }
    );
  }
  return cardContent;
}
function phaseLabel(phase) {
  if (phase.__kind__ === "leagueStage") return "League Stage";
  const r = Number(phase.knockoutRound);
  const map = {
    1: "Final",
    2: "Semi-Final",
    4: "Quarter-Final",
    8: "Round of 16"
  };
  return map[r] ?? `Round of ${r * 2}`;
}
function phaseOrder(phase) {
  if (phase.__kind__ === "leagueStage") return 99;
  return Number(phase.knockoutRound);
}
function groupByPhase(matches) {
  const groups = /* @__PURE__ */ new Map();
  for (const m of matches) {
    const label = phaseLabel(m.phase);
    const entry = groups.get(label);
    if (entry) {
      entry.matches.push(m);
    } else {
      groups.set(label, { order: phaseOrder(m.phase), matches: [m] });
    }
  }
  return Array.from(groups.entries()).sort((a, b) => a[1].order - b[1].order).map(([label, { matches: matches2 }]) => ({ label, matches: matches2 }));
}
function filterMatches(matches, tab) {
  if (tab === "upcoming")
    return matches.filter((m) => m.status === MatchStatus.scheduled);
  if (tab === "completed")
    return matches.filter((m) => m.status === MatchStatus.completed);
  if (tab === "live")
    return matches.filter((m) => m.status === MatchStatus.live);
  return matches;
}
function MatchCardSkeletons() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border bg-card overflow-hidden animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 bg-muted/60 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 flex flex-col items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1 w-8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1 w-8" })
          ] })
        ] })
      ]
    },
    n
  )) });
}
function TournamentFixturesSection({
  tournament,
  filter
}) {
  const { data: rawMatches = [], isLoading: loadingM } = useGetMatchesByTournament(tournament.id);
  const { data: teams = [], isLoading: loadingTeams } = useGetTeamsByTournament(
    tournament.id
  );
  if (loadingM || loadingTeams) return /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCardSkeletons, {});
  const filtered = filterMatches(rawMatches, filter);
  if (filtered.length === 0) return null;
  const groups = groupByPhase(filtered);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", "data-ocid": "tournament-fixtures-section", children: groups.map(({ label, matches }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
        matches.length,
        " match",
        matches.length !== 1 ? "es" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: matches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MatchCard,
      {
        match: m,
        teams,
        linkable: true
      },
      m.id.toString()
    )) })
  ] }, label)) });
}
function FixturesPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [selectedId, setSelectedId] = reactExports.useState("all");
  const [filter, setFilter] = reactExports.useState("all");
  const displayTournaments = selectedId === "all" ? tournaments : tournaments.filter((t) => t.id.toString() === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "fixtures-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Fixtures & Results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Scheduled and completed matches across all tournaments" })
      ] }),
      tournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedId, onValueChange: setSelectedId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-52 shrink-0",
            "data-ocid": "fixture-filter-tournament",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter tournament" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Tournaments" }),
          tournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString()))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: filter,
        onValueChange: (v) => setFilter(v),
        "data-ocid": "fixture-filter-tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "all",
              "data-ocid": "filter-tab-all",
              className: "flex-1 sm:flex-none",
              children: "All"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "live",
              "data-ocid": "filter-tab-live",
              className: "flex-1 sm:flex-none",
              children: "Live"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "upcoming",
              "data-ocid": "filter-tab-upcoming",
              className: "flex-1 sm:flex-none",
              children: "Upcoming"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsTrigger,
            {
              value: "completed",
              "data-ocid": "filter-tab-completed",
              className: "flex-1 sm:flex-none",
              children: "Completed"
            }
          )
        ] })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCardSkeletons, {}) : tournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "calendar",
        title: "No fixtures yet",
        description: "Fixtures appear once tournaments are created and fixtures are generated",
        "data-ocid": "fixtures-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: displayTournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "fixture-tournament-group", children: [
      displayTournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold uppercase tracking-widest text-foreground", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentFixturesSection, { tournament: t, filter })
    ] }, t.id.toString())) })
  ] });
}
export {
  FixturesPage as default
};
