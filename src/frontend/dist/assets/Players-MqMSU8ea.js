import { c as createLucideIcon, u as useListTournaments, r as reactExports, j as jsxRuntimeExports, q as useGetPlayersByTournament, g as useGetTeamsByTournament } from "./index-BMd2UGmK.js";
import { I as Input } from "./input-BDsm4asG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-zBnqW-9V.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { a as PlayerRow } from "./PlayerRow-BM30YtBW.js";
import "./badge-DWBGBwmV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const POSITIONS = [
  "All Positions",
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward"
];
function TournamentPlayers({
  tournament,
  search,
  position,
  showTournamentHeader
}) {
  const { data: players = [], isLoading: loadingP } = useGetPlayersByTournament(
    tournament.id
  );
  const { data: teams = [], isLoading: loadingT } = useGetTeamsByTournament(
    tournament.id
  );
  const filtered = players.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.number.toString().includes(search);
    const matchesPosition = position === "All Positions" || p.position === position;
    return matchesSearch && matchesPosition;
  });
  const sorted = [...filtered].sort((a, b) => {
    const posOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
    const posA = posOrder.indexOf(a.position);
    const posB = posOrder.indexOf(b.position);
    if (posA !== posB)
      return (posA === -1 ? 99 : posA) - (posB === -1 ? 99 : posB);
    return Number(a.number - b.number);
  });
  if (loadingP || loadingT) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }) }, n)) });
  }
  if (sorted.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "tournament-players-section", children: [
    showTournamentHeader && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-block h-1.5 w-5 rounded-full bg-primary",
          "aria-hidden": true
        }
      ),
      tournament.name,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal normal-case tracking-normal ml-1", children: [
        "(",
        sorted.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: sorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PlayerRow,
      {
        player: p,
        teams,
        rank: i + 1
      },
      p.id.toString()
    )) })
  ] });
}
function PlayersPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [search, setSearch] = reactExports.useState("");
  const [selectedId, setSelectedId] = reactExports.useState("all");
  const [position, setPosition] = reactExports.useState("All Positions");
  const displayTournaments = selectedId === "all" ? tournaments : tournaments.filter((t) => t.id.toString() === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "players-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Players" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "All registered players across tournaments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name or number...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-8",
            "data-ocid": "player-search",
            "aria-label": "Search players"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: position,
          onValueChange: (v) => setPosition(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "player-filter-position", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: POSITIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
          ]
        }
      ),
      tournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedId, onValueChange: setSelectedId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-52",
            "data-ocid": "player-filter-tournament",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Tournaments" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Tournaments" }),
          tournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString()))
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }) }, n)) }) : tournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "users",
        title: "No players yet",
        description: "Players are added when teams are registered in a tournament. Create a tournament and add teams to get started.",
        "data-ocid": "players-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: displayTournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TournamentPlayers,
      {
        tournament: t,
        search,
        position,
        showTournamentHeader: displayTournaments.length > 1
      },
      t.id.toString()
    )) })
  ] });
}
export {
  PlayersPage as default
};
