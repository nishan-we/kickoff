import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useIsAdmin } from "../hooks/use-tournament";

const navLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Tournaments", path: "/tournaments" },
  { label: "Fixtures", path: "/fixtures" },
  { label: "Standings", path: "/standings" },
  { label: "Teams", path: "/teams" },
  { label: "Players", path: "/players" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: isAdmin } = useIsAdmin();

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
      data-ocid="navbar"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
            <Trophy className="h-4 w-4 text-primary-foreground" aria-hidden />
          </div>
          <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground hidden sm:block">
            Tournament<span className="text-accent">Pro</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1 justify-center"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
                isActive(link.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {identity ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  data-ocid="nav-user-menu"
                >
                  <User className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline text-xs">
                    {isAdmin ? "Admin" : "Viewer"}
                  </span>
                  <ChevronDown className="h-3 w-3" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" data-ocid="nav-admin-link">
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => clear()}
                  className="text-destructive"
                  data-ocid="nav-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              variant="outline"
              className="gap-1.5"
              data-ocid="nav-login"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              <span>Admin Login</span>
            </Button>
          )}

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          className="md:hidden bg-card border-t border-border px-4 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid={`nav-mobile-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
