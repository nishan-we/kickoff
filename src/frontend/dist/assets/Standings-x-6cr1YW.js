import { u as useListTournaments, a as TournamentFormat, T as TournamentStatus, r as reactExports, j as jsxRuntimeExports, S as SkeletonCard, h as useGetLeagueStandings, g as useGetTeamsByTournament } from "./index-BMd2UGmK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-zBnqW-9V.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { m as motion, S as StandingsTable } from "./StandingsTable-CyA_fHcs.js";
function PodiumRow({ tournament }) {
  const { data: standings = [] } = useGetLeagueStandings(tournament.id);
  if (standings.length < 3) return null;
  const [second, first, third] = [standings[1], standings[0], standings[2]];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
    {
      row: second,
      medal: "🥈",
      heightCls: "h-20",
      bgCls: "bg-muted border-muted-foreground/20"
    },
    {
      row: first,
      medal: "🥇",
      heightCls: "h-24",
      bgCls: "bg-accent/10 border-accent/30"
    },
    {
      row: third,
      medal: "🥉",
      heightCls: "h-18",
      bgCls: "bg-chart-5/8 border-chart-5/20"
    }
  ].map(
    ({ row, medal, heightCls, bgCls }) => row ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-col items-center justify-end rounded-lg border p-3 ${heightCls} ${bgCls}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-1", children: medal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground truncate text-center w-full", children: row.teamName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-medium mt-0.5", children: [
            row.points.toString(),
            " pts"
          ] })
        ]
      },
      row.teamId.toString()
    ) : null
  ) });
}
function StandingsSection({ tournament }) {
  const { data: standings = [], isLoading } = useGetLeagueStandings(
    tournament.id
  );
  const { data: teams = [] } = useGetTeamsByTournament(tournament.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumRow, { tournament }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden shadow-fixture", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold tracking-[0.15em] uppercase text-foreground", children: [
              "Full Table — ",
              tournament.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
              standings.length,
              " teams"
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : standings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: "chart",
              title: "No standings yet",
              description: "Standings will appear once matches are played and scores are recorded.",
              "data-ocid": "empty-standings"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(StandingsTable, { standings, teams })
        ] }),
        standings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 flex-wrap pt-3 text-[10px] font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-0.5 bg-accent rounded" }),
            "1st place"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-0.5 bg-muted-foreground/30 rounded" }),
            "2nd — 3rd place"
          ] })
        ] })
      ]
    }
  );
}
function StandingsPage() {
  var _a, _b;
  const { data: tournaments = [], isLoading } = useListTournaments();
  const leagueTournaments = tournaments.filter(
    (t) => t.format === TournamentFormat.league || t.format === TournamentFormat.hybrid
  );
  const defaultId = ((_b = (_a = leagueTournaments.find((t) => t.status === TournamentStatus.active) ?? leagueTournaments[0]) == null ? void 0 : _a.id) == null ? void 0 : _b.toString()) ?? "";
  const [selectedId, setSelectedId] = reactExports.useState("");
  const resolvedId = selectedId || defaultId;
  const selectedTournament = leagueTournaments.find(
    (t) => t.id.toString() === resolvedId
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "standings-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "League Standings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Current season table rankings" })
      ] }),
      leagueTournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: resolvedId, onValueChange: setSelectedId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-52",
            "data-ocid": "standings-tournament-select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select tournament" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: leagueTournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString())) })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : leagueTournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "chart",
        title: "No league standings",
        description: "Standings are available for League and Hybrid format tournaments.",
        "data-ocid": "standings-empty"
      }
    ) : selectedTournament ? /* @__PURE__ */ jsxRuntimeExports.jsx(StandingsSection, { tournament: selectedTournament }) : null
  ] });
}
export {
  StandingsPage as default
};
