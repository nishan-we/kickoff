import { u as useListTournaments, i as useIsAdmin, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, d as Trophy, U as Users, a as TournamentFormat, T as TournamentStatus } from "./index-BMd2UGmK.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
import { C as Card, a as CardContent } from "./card-B0ahsKQl.js";
import { I as Input } from "./input-BDsm4asG.js";
import { S as Skeleton } from "./skeleton-D9JENkaE.js";
import { E as EmptyState } from "./EmptyState-o902XA73.js";
import { P as Plus } from "./plus-CqOta8HL.js";
function formatLabel(f) {
  const map = {
    [TournamentFormat.league]: "League",
    [TournamentFormat.knockout]: "Knockout",
    [TournamentFormat.hybrid]: "League + Knockout"
  };
  return map[f] ?? f;
}
function statusColor(s) {
  if (s === TournamentStatus.active) return "default";
  if (s === TournamentStatus.upcoming) return "secondary";
  return "outline";
}
function TournamentRow({ tournament }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/tournaments/$tournamentId",
      params: { tournamentId: tournament.id.toString() },
      "data-ocid": "tournament-list-row",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-fixture transition-shadow duration-200 cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-4 flex items-center justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary", "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors", children: tournament.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatLabel(tournament.format) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5", "aria-hidden": true }),
            tournament.totalTeams.toString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusColor(tournament.status), children: tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1) })
        ] })
      ] }) })
    }
  );
}
function TournamentsPage() {
  const { data: tournaments, isLoading } = useListTournaments();
  const { data: isAdmin } = useIsAdmin();
  const [search, setSearch] = reactExports.useState("");
  const filtered = (tournaments ?? []).filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "tournaments-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Tournaments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          (tournaments == null ? void 0 : tournaments.length) ?? 0,
          " total"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5", "aria-hidden": true }),
        "New Tournament"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Search tournaments...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        "data-ocid": "tournament-search"
      }
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "trophy",
        title: search ? "No results found" : "No tournaments yet",
        description: search ? "Try a different search term" : "Create a tournament to start organizing matches",
        "data-ocid": "tournaments-empty"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TournamentRow, { tournament: t }, t.id.toString())) }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 right-4 lg:hidden z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        size: "icon",
        className: "h-12 w-12 rounded-full shadow-elevated",
        "data-ocid": "fab-new-tournament",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", "aria-label": "New tournament", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
      }
    ) })
  ] });
}
export {
  TournamentsPage as default
};
