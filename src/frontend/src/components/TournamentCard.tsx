import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Calendar, Users } from "lucide-react";
import { TournamentFormat, TournamentStatus } from "../types";
import type { TournamentView } from "../types";

interface TournamentCardProps {
  tournament: TournamentView;
}

const formatLabels: Record<TournamentFormat, string> = {
  [TournamentFormat.league]: "LEAGUE",
  [TournamentFormat.knockout]: "KNOCKOUT",
  [TournamentFormat.hybrid]: "HYBRID",
};

const formatColors: Record<TournamentFormat, string> = {
  [TournamentFormat.league]: "bg-primary/10 text-primary border-primary/20",
  [TournamentFormat.knockout]:
    "bg-destructive/10 text-destructive border-destructive/20",
  [TournamentFormat.hybrid]:
    "bg-secondary/10 text-secondary border-secondary/20",
};

const statusColors: Record<TournamentStatus, string> = {
  [TournamentStatus.active]:
    "bg-secondary/15 text-secondary border-secondary/25",
  [TournamentStatus.upcoming]:
    "bg-accent/15 text-accent-foreground border-accent/25",
  [TournamentStatus.completed]: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<TournamentStatus, string> = {
  [TournamentStatus.active]: "ACTIVE",
  [TournamentStatus.upcoming]: "UPCOMING",
  [TournamentStatus.completed]: "COMPLETED",
};

export function TournamentCard({ tournament }: TournamentCardProps) {
  const createdDate = new Date(Number(tournament.createdAt / 1_000_000n));

  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id.toString() }}
      className="block group"
      data-ocid="tournament-card-link"
    >
      <Card className="relative overflow-hidden border border-border bg-card hover:shadow-elevated transition-smooth group-hover:border-primary/30 cursor-pointer">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-display font-semibold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors min-w-0">
              {tournament.name}
            </h3>
            <Badge
              className={`shrink-0 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm border ${statusColors[tournament.status]}`}
            >
              {statusLabels[tournament.status]}
            </Badge>
          </div>

          {/* Format + Teams row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-block text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm border ${formatColors[tournament.format]}`}
            >
              {formatLabels[tournament.format]}
            </span>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                {tournament.totalTeams.toString()} teams
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground ml-auto">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">
                {createdDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
