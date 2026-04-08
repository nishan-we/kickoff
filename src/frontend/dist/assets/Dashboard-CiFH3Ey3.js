import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, U as Users, C as Calendar, T as TournamentStatus, a as TournamentFormat, u as useListTournaments, b as useNavigate, d as Trophy, e as ChartNoAxesColumn, B as Button, S as SkeletonCard, f as useGetRecentResults, g as useGetTeamsByTournament, h as useGetLeagueStandings } from "./index-BMd2UGmK.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
import { C as Card, a as CardContent } from "./card-B0ahsKQl.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { R as RecentResultCard } from "./RecentResultCard-C49qyB9v.js";
import { m as motion, S as StandingsTable } from "./StandingsTable-CyA_fHcs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const formatLabels = {
  [TournamentFormat.league]: "LEAGUE",
  [TournamentFormat.knockout]: "KNOCKOUT",
  [TournamentFormat.hybrid]: "HYBRID"
};
const formatColors = {
  [TournamentFormat.league]: "bg-primary/10 text-primary border-primary/20",
  [TournamentFormat.knockout]: "bg-destructive/10 text-destructive border-destructive/20",
  [TournamentFormat.hybrid]: "bg-secondary/10 text-secondary border-secondary/20"
};
const statusColors = {
  [TournamentStatus.active]: "bg-secondary/15 text-secondary border-secondary/25",
  [TournamentStatus.upcoming]: "bg-accent/15 text-accent-foreground border-accent/25",
  [TournamentStatus.completed]: "bg-muted text-muted-foreground border-border"
};
const statusLabels = {
  [TournamentStatus.active]: "ACTIVE",
  [TournamentStatus.upcoming]: "UPCOMING",
  [TournamentStatus.completed]: "COMPLETED"
};
function TournamentCard({ tournament }) {
  const createdDate = new Date(Number(tournament.createdAt / 1000000n));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/tournaments/$tournamentId",
      params: { tournamentId: tournament.id.toString() },
      className: "block group",
      "data-ocid": "tournament-card-link",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden border border-border bg-card hover:shadow-elevated transition-smooth group-hover:border-primary/30 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors min-w-0", children: tournament.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `shrink-0 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm border ${statusColors[tournament.status]}`,
                children: statusLabels[tournament.status]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm border ${formatColors[tournament.format]}`,
                children: formatLabels[tournament.format]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium", children: [
                tournament.totalTeams.toString(),
                " teams"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: createdDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function SectionHeader({ label, link }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-bold tracking-[0.18em] uppercase text-foreground", children: label }),
    link && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: link,
        className: "flex items-center gap-1 text-xs font-medium text-primary hover:underline",
        children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ]
      }
    )
  ] });
}
function RecentResultsRow({
  activeTournament
}) {
  const { data: matches = [], isLoading } = useGetRecentResults(
    (activeTournament == null ? void 0 : activeTournament.id) ?? null,
    3n
  );
  const { data: teams = [] } = useGetTeamsByTournament(
    (activeTournament == null ? void 0 : activeTournament.id) ?? null
  );
  if (!activeTournament) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        label: "Recent Results",
        link: `/tournaments/${activeTournament.id}`
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : matches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-3", children: "No results yet in this tournament." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: matches.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07, duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecentResultCard, { match, teams })
      },
      match.id.toString()
    )) })
  ] });
}
function MiniStandingsPanel({ tournament }) {
  const { data: standings = [], isLoading } = useGetLeagueStandings(
    tournament.id
  );
  const { data: teams = [] } = useGetTeamsByTournament(tournament.id);
  const top5 = standings.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-fixture mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold tracking-[0.15em] uppercase text-foreground", children: [
        tournament.name,
        " — Standings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/standings",
          className: "text-xs font-medium text-primary hover:underline flex items-center gap-1",
          children: [
            "Full table ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StandingsTable,
      {
        standings: top5,
        teams,
        isLoading,
        compact: true
      }
    )
  ] });
}
function DashboardPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const navigate = useNavigate();
  const active = tournaments.filter(
    (t) => t.status === TournamentStatus.active
  );
  const upcoming = tournaments.filter(
    (t) => t.status === TournamentStatus.upcoming
  );
  const completed = tournaments.filter(
    (t) => t.status === TournamentStatus.completed
  );
  const leagueTournament = active.find(
    (t) => t.format === TournamentFormat.league || t.format === TournamentFormat.hybrid
  );
  const stats = [
    { label: "Tournaments", value: tournaments.length, icon: Trophy },
    { label: "Active", value: active.length, icon: TrendingUp },
    { label: "Upcoming", value: upcoming.length, icon: Calendar },
    { label: "Completed", value: completed.length, icon: ChartNoAxesColumn }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "dashboard-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "relative overflow-hidden rounded-xl bg-card border border-border shadow-elevated px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground", children: "Tournament Pro" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight", children: "Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              tournaments.length,
              " tournament",
              tournaments.length !== 1 ? "s" : "",
              " ",
              "· ",
              active.length,
              " active"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3", children: [
            active.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/15 text-secondary border border-secondary/30 font-bold text-[10px] tracking-wider", children: "● SEASON LIVE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                "data-ocid": "dashboard-view-all",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tournaments", children: [
                  "All Tournaments ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1" })
                ] })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: stats.map(({ label, value, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07, duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest uppercase text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground tabular-nums", children: value })
        ] }) })
      },
      label
    )) }),
    (isLoading || active.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(RecentResultsRow, { activeTournament: active[0] }),
    (isLoading || active.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Active Tournaments", link: "/tournaments" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, n)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: active.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08, duration: 0.32 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentCard, { tournament: t })
        },
        t.id.toString()
      )) })
    ] }),
    leagueTournament && /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStandingsPanel, { tournament: leagueTournament }),
    upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Upcoming Tournaments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: upcoming.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.32 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentCard, { tournament: t })
        },
        t.id.toString()
      )) })
    ] }),
    completed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Completed Tournaments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: completed.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.32 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentCard, { tournament: t })
        },
        t.id.toString()
      )) })
    ] }),
    !isLoading && tournaments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "trophy",
        title: "No tournaments yet",
        description: "Create your first tournament to get started. Choose from League, Knockout, or Hybrid formats.",
        actionLabel: "Go to Admin",
        onAction: () => navigate({ to: "/admin" }),
        "data-ocid": "dashboard-empty"
      }
    )
  ] });
}
export {
  DashboardPage as default
};
