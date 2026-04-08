import { j as jsxRuntimeExports } from "./index-BMd2UGmK.js";
import { B as Badge } from "./badge-DWBGBwmV.js";
const positionColors = {
  Goalkeeper: "bg-accent/15 text-accent-foreground border-accent/30",
  Defender: "bg-primary/10 text-primary border-primary/20",
  Midfielder: "bg-secondary/10 text-secondary border-secondary/20",
  Forward: "bg-destructive/10 text-destructive border-destructive/20"
};
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function PlayerRow({ player, teams, rank }) {
  const team = teams.find((t) => t.id === player.teamId);
  const initials = getInitials(player.name);
  const color = (team == null ? void 0 : team.color) || "#6366f1";
  const positionClass = positionColors[player.position] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors",
      "data-ocid": "player-row",
      children: [
        rank !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-5 text-center shrink-0", children: rank }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-9 w-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white",
            style: { backgroundColor: color },
            "aria-hidden": true,
            children: initials
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: player.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: (team == null ? void 0 : team.name) ?? "Unknown team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-mono leading-none text-foreground tabular-nums", children: player.number.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "No." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: `shrink-0 text-xs font-medium hidden sm:inline-flex ${positionClass}`,
            children: player.position
          }
        )
      ]
    }
  );
}
function PlayerTableRow({ player, index }) {
  const positionClass = positionColors[player.position] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-t border-border hover:bg-muted/20 transition-colors",
      "data-ocid": "player-table-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs font-mono text-muted-foreground text-right w-10", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold font-mono tabular-nums text-right w-12", children: player.number.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-display font-semibold text-sm", children: player.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: `text-xs font-medium ${positionClass}`,
            children: player.position
          }
        ) })
      ]
    }
  );
}
export {
  PlayerTableRow as P,
  PlayerRow as a
};
