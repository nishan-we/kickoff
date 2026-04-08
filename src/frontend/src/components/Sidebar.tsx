import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Calendar,
  LayoutDashboard,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useIsAdmin } from "../hooks/use-tournament";

interface SidebarLinkDef {
  label: string;
  path: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const links: SidebarLinkDef[] = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Tournaments", path: "/tournaments", icon: Trophy },
  { label: "Fixtures", path: "/fixtures", icon: Calendar },
  { label: "Standings", path: "/standings", icon: BarChart2 },
  { label: "Teams", path: "/teams", icon: Users },
  { label: "Players", path: "/players", icon: User },
  { label: "Admin", path: "/admin", icon: Settings, adminOnly: true },
];

export function Sidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: isAdmin } = useIsAdmin();

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const visibleLinks = links.filter((l) => !l.adminOnly || isAdmin);

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-sidebar border-r border-sidebar-border h-full">
      <nav
        className="flex flex-col gap-0.5 p-3 flex-1"
        aria-label="Sidebar navigation"
      >
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              data-ocid={`sidebar-${link.label.toLowerCase()}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/40 uppercase tracking-widest font-display">
          Tournament Pro
        </p>
      </div>
    </aside>
  );
}

// Bottom nav for mobile
export function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const mobileLinks = [
    { label: "Home", path: "/", icon: LayoutDashboard },
    { label: "Fixtures", path: "/fixtures", icon: Calendar },
    { label: "Standings", path: "/standings", icon: BarChart2 },
    { label: "Teams", path: "/teams", icon: Users },
    { label: "Players", path: "/players", icon: User },
  ];

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex"
      aria-label="Bottom navigation"
    >
      {mobileLinks.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.path);
        return (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 px-1 text-[10px] font-medium transition-colors",
              active ? "text-primary" : "text-muted-foreground",
            )}
            data-ocid={`bottom-nav-${link.label.toLowerCase()}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
