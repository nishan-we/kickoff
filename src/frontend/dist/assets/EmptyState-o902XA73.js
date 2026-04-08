import { j as jsxRuntimeExports, e as ChartNoAxesColumn, C as Calendar, U as Users, d as Trophy, B as Button } from "./index-BMd2UGmK.js";
const iconMap = {
  trophy: Trophy,
  users: Users,
  calendar: Calendar,
  chart: ChartNoAxesColumn
};
function EmptyState({
  icon = "trophy",
  title,
  description,
  actionLabel,
  onAction,
  "data-ocid": dataOcid
}) {
  const Icon = iconMap[icon];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 px-6 text-center",
      "data-ocid": dataOcid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-muted-foreground", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-lg font-display font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 max-w-sm text-sm text-muted-foreground leading-relaxed", children: description }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onAction,
            "data-ocid": dataOcid ? `${dataOcid}-cta` : void 0,
            children: actionLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
