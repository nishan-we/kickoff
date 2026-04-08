import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateTournament } from "../hooks/use-tournament";
import { TournamentFormat } from "../types";

export function CreateTournamentForm() {
  const [name, setName] = useState("");
  const [format, setFormat] = useState<TournamentFormat>(
    TournamentFormat.league,
  );
  const [totalTeams, setTotalTeams] = useState("8");
  const { mutate, isPending } = useCreateTournament();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const teamsNum = Number(totalTeams);
    if (!name.trim()) {
      toast.error("Tournament name is required");
      return;
    }
    if (teamsNum < 2 || teamsNum > 64) {
      toast.error("Number of teams must be between 2 and 64");
      return;
    }
    mutate(
      { name: name.trim(), format, totalTeams: BigInt(totalTeams) },
      {
        onSuccess: (t) => {
          toast.success(`Tournament "${t.name}" created!`);
          setName("");
          setTotalTeams("8");
        },
        onError: (err) => toast.error(err.message),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="t-name">Tournament Name</Label>
        <Input
          id="t-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Premier League 2025"
          required
          data-ocid="admin-tournament-name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="t-format">Format</Label>
          <Select
            value={format}
            onValueChange={(v) => setFormat(v as TournamentFormat)}
          >
            <SelectTrigger id="t-format" data-ocid="admin-tournament-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TournamentFormat.league}>
                League — Round robin
              </SelectItem>
              <SelectItem value={TournamentFormat.knockout}>
                Knockout — Elimination
              </SelectItem>
              <SelectItem value={TournamentFormat.hybrid}>
                League + Knockout
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="t-teams">Number of Teams</Label>
          <Input
            id="t-teams"
            type="number"
            min="2"
            max="64"
            value={totalTeams}
            onChange={(e) => setTotalTeams(e.target.value)}
            required
            data-ocid="admin-tournament-teams"
          />
          <p className="text-xs text-muted-foreground">
            Supports 2 to 64 teams
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto"
        data-ocid="admin-create-tournament-submit"
      >
        <Plus className="h-4 w-4 mr-1.5" aria-hidden />
        {isPending ? "Creating..." : "Create Tournament"}
      </Button>
    </form>
  );
}
