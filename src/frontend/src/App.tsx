import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const TournamentsPage = lazy(() => import("./pages/Tournaments"));
const TournamentDetailPage = lazy(() => import("./pages/TournamentDetail"));
const FixturesPage = lazy(() => import("./pages/Fixtures"));
const StandingsPage = lazy(() => import("./pages/Standings"));
const TeamsPage = lazy(() => import("./pages/Teams"));
const TeamDetailPage = lazy(() => import("./pages/TeamDetail"));
const PlayersPage = lazy(() => import("./pages/Players"));
const AdminPage = lazy(() => import("./pages/Admin"));

function PageLoader() {
  return <LoadingSpinner fullPage label="Loading..." />;
}

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const tournamentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournaments",
  component: TournamentsPage,
});

const tournamentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournaments/$tournamentId",
  component: TournamentDetailPage,
});

const fixturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fixtures",
  component: FixturesPage,
});

const standingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/standings",
  component: StandingsPage,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teams",
  component: TeamsPage,
});

const teamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teams/$tournamentId/$teamId",
  component: TeamDetailPage,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/players",
  component: PlayersPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tournamentsRoute,
  tournamentDetailRoute,
  fixturesRoute,
  standingsRoute,
  teamsRoute,
  teamDetailRoute,
  playersRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
