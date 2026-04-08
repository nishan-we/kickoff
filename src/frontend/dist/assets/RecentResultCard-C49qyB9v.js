import { M as MatchStatus, j as jsxRuntimeExports } from "./index-BMd2UGmK.js";
function TeamInitials({ name }) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: name.slice(0, 3).toUpperCase() });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: (parts[0][0] + parts[1][0]).toUpperCase() });
}
function TeamCrest({ color, name }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-sm shrink-0",
      style: { backgroundColor: color || "#6b7280" },
      "aria-label": name,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TeamInitials, { name })
    }
  );
}
function RecentResultCard({ match, teams }) {
  const homeTeam = teams.find((t) => t.id === match.homeTeamId);
  const awayTeam = teams.find((t) => t.id === match.awayTeamId);
  const isLive = match.status === MatchStatus.live;
  const isCompleted = match.status === MatchStatus.completed;
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);
  const homeWon = isCompleted && homeScore > awayScore;
  const awayWon = isCompleted && awayScore > homeScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative bg-card border border-border rounded-lg overflow-hidden shadow-fixture hover:shadow-elevated transition-smooth",
      "data-ocid": "result-card",
      children: [
        isLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-secondary/15 border border-secondary/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-secondary tracking-wider", children: "LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TeamCrest,
              {
                color: (homeTeam == null ? void 0 : homeTeam.color) ?? "#6b7280",
                name: (homeTeam == null ? void 0 : homeTeam.name) ?? "?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[11px] font-semibold text-center truncate w-full px-1 ${homeWon ? "text-foreground" : "text-muted-foreground"}`,
                children: (homeTeam == null ? void 0 : homeTeam.name) ?? "TBD"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 px-3", children: [
            isCompleted || isLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-3xl font-display font-bold tabular-nums leading-none ${homeWon ? "text-foreground" : "text-muted-foreground"}`,
                  children: homeScore
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground font-light", children: "–" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-3xl font-display font-bold tabular-nums leading-none ${awayWon ? "text-foreground" : "text-muted-foreground"}`,
                  children: awayScore
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: new Date(
              Number(match.scheduledAt / 1000000n)
            ).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium tracking-wider uppercase text-muted-foreground mt-0.5", children: isLive ? "LIVE" : isCompleted ? "FT" : "vs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TeamCrest,
              {
                color: (awayTeam == null ? void 0 : awayTeam.color) ?? "#6b7280",
                name: (awayTeam == null ? void 0 : awayTeam.name) ?? "?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[11px] font-semibold text-center truncate w-full px-1 ${awayWon ? "text-foreground" : "text-muted-foreground"}`,
                children: (awayTeam == null ? void 0 : awayTeam.name) ?? "TBD"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1 w-full ${isLive ? "bg-secondary" : isCompleted ? "bg-primary/30" : "bg-border"}`
          }
        )
      ]
    }
  );
}
export {
  RecentResultCard as R
};
