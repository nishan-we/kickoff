import { c as createLucideIcon, k as useParams, b as useNavigate, l as useGetTournament, g as useGetTeamsByTournament, s as useGetPlayersByTeam, j as jsxRuntimeExports, o as LoadingSpinner, B as Button, L as Link, U as Users } from "./index-BMd2UGmK.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { P as PlayerTableRow } from "./PlayerRow-BM30YtBW.js";
import { A as ArrowLeft } from "./arrow-left-CWgP63wG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode);
const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
function sortByPosition(a, b) {
  const ai = positionOrder.indexOf(a.position);
  const bi = positionOrder.indexOf(b.position);
  return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
}
function TeamDetailPage() {
  const { teamId, tournamentId } = useParams({
    from: "/teams/$tournamentId/$teamId"
  });
  const tid = BigInt(tournamentId);
  const teamIdBig = BigInt(teamId);
  const navigate = useNavigate();
  const { data: tournament, isLoading: loadingT } = useGetTournament(tid);
  const { data: teams = [], isLoading: loadingTeams } = useGetTeamsByTournament(tid);
  const { data: players = [], isLoading: loadingP } = useGetPlayersByTeam(teamIdBig);
  const team = teams.find((t) => t.id === teamIdBig);
  const color = (team == null ? void 0 : team.color) || "#6366f1";
  const sortedPlayers = [...players].sort(sortByPosition);
  const positionCounts = sortedPlayers.reduce(
    (acc, p) => {
      acc[p.position] = (acc[p.position] ?? 0) + 1;
      return acc;
    },
    {}
  );
  if (loadingT || loadingTeams) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true, label: "Loading team..." });
  }
  if (!team) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "users",
        title: "Team not found",
        description: "This team may have been removed.",
        actionLabel: "Back to Teams",
        onAction: () => navigate({ to: "/teams" })
      }
    );
  }
  const initials = team.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "team-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teams", "aria-label": "Back to teams", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teams", className: "hover:text-foreground transition-colors", children: "Teams" }),
        " ",
        "/ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: team.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card overflow-hidden shadow-fixture", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full", style: { backgroundColor: color } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-20 w-20 rounded-full shrink-0 flex items-center justify-center text-2xl font-bold text-white shadow-elevated",
            style: { backgroundColor: color },
            "aria-hidden": true,
            children: initials
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground truncate", children: team.name }),
          tournament && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: tournament.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Users,
                {
                  className: "h-4 w-4 text-muted-foreground",
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: players.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: players.length === 1 ? "player" : "players" })
            ] }),
            Object.entries(positionCounts).map(([pos, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              count,
              " ",
              pos,
              count !== 1 ? "s" : ""
            ] }, pos))
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground", children: "Player Roster" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          players.length,
          ")"
        ] })
      ] }),
      loadingP ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }) }, n)) }) : sortedPlayers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "users",
          title: "No players yet",
          description: "Players will appear here once added to this team",
          "data-ocid": "team-detail-empty"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground w-10", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5 inline", "aria-label": "Jersey" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground", children: "Position" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sortedPlayers.map((player, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayerTableRow,
          {
            player,
            index: i
          },
          player.id.toString()
        )) })
      ] }) })
    ] })
  ] });
}
export {
  TeamDetailPage as default
};
