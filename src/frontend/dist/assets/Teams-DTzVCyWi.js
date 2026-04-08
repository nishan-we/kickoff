import { c as createLucideIcon, j as jsxRuntimeExports, U as Users, u as useListTournaments, r as reactExports, b as useNavigate, g as useGetTeamsByTournament, q as useGetPlayersByTournament } from "./index-BMd2UGmK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-zBnqW-9V.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function TeamCard({ team, playerCount, onClick }) {
  const initials = getInitials(team.name);
  const color = team.color || "#6366f1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "group w-full text-left rounded-lg border border-border bg-card hover:shadow-elevated transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "data-ocid": "team-card",
      "aria-label": `View ${team.name} details`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full", style: { backgroundColor: color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-12 w-12 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-sm",
                style: { backgroundColor: color },
                "aria-hidden": true,
                children: initials
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors", children: team.name }),
              playerCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 mt-0.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3", "aria-hidden": true }),
                playerCount,
                " ",
                playerCount === 1 ? "player" : "players"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronRight,
              {
                className: "h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150",
                "aria-hidden": true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block h-3 w-3 rounded-full shrink-0",
                style: { backgroundColor: color },
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono truncate", children: color })
          ] })
        ] })
      ]
    }
  );
}
function TournamentTeamGrid({
  tournament
}) {
  const navigate = useNavigate();
  const { data: teams = [], isLoading } = useGetTeamsByTournament(
    tournament.id
  );
  const { data: players = [] } = useGetPlayersByTournament(tournament.id);
  const playerCountByTeam = players.reduce((acc, p) => {
    const key = p.teamId.toString();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28" }, n)) });
  }
  if (teams.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TeamCard,
    {
      team,
      playerCount: playerCountByTeam[team.id.toString()] ?? 0,
      onClick: () => navigate({
        to: "/teams/$tournamentId/$teamId",
        params: {
          tournamentId: tournament.id.toString(),
          teamId: team.id.toString()
        }
      })
    },
    team.id.toString()
  )) });
}
function TeamsPage() {
  const { data: tournaments = [], isLoading } = useListTournaments();
  const [selectedId, setSelectedId] = reactExports.useState("all");
  const displayTournaments = selectedId === "all" ? tournaments : tournaments.filter((t) => t.id.toString() === selectedId);
  const totalTeamCount = tournaments.reduce(
    (sum, t) => sum + Number(t.totalTeams),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "teams-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Teams" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading..." : `${totalTeamCount} registered teams` })
      ] }),
      tournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedId, onValueChange: setSelectedId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-52", "data-ocid": "teams-filter-tournament", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Tournaments" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Tournaments" }),
          tournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id.toString()))
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28" }, n)) }) : tournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "users",
        title: "No teams yet",
        description: "Teams are added when setting up a tournament. Create a tournament first to register teams.",
        "data-ocid": "teams-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: displayTournaments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      displayTournaments.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block h-1.5 w-5 rounded-full bg-primary",
            "aria-hidden": true
          }
        ),
        t.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentTeamGrid, { tournament: t })
    ] }, t.id.toString())) })
  ] });
}
export {
  TeamsPage as default
};
