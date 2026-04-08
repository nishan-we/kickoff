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
import { useAddTeam, useListTournaments } from "../hooks/use-tournament";

const PRESET_COLORS = [
  "#6366f1", // indigo
  "#ef4444", // red
  "#22c55e", // green
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#14b8a6", // teal
  "#f97316", // orange
  "#06b6d4", // cyan
];

export function AddTeamForm() {
  const { data: tournaments = [] } = useListTournaments();
  const [tournamentId, setTournamentId] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");
  const { mutate, isPending } = useAddTeam();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tournamentId) {
      toast.error("Select a tournament first");
      return;
    }
    mutate(
      { name: name.trim(), color, tournamentId: BigInt(tournamentId) },
      {
        onSuccess: (t) => {
          toast.success(`Team "${t.name}" added!`);
          setName("");
        },
        onError: (err) => toast.error(err.message),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="team-tournament">Tournament</Label>
        <Select value={tournamentId} onValueChange={setTournamentId}>
          <SelectTrigger id="team-tournament" data-ocid="admin-team-tournament">
            <SelectValue placeholder="Select a tournament" />
          </SelectTrigger>
          <SelectContent>
            {tournaments.length === 0 ? (
              <div className="py-2 px-3 text-sm text-muted-foreground">
                No tournaments yet
              </div>
            ) : (
              tournaments.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="team-name">Team Name</Label>
          <Input
            id="team-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Arsenal FC"
            required
            data-ocid="admin-team-name"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Team Color</Label>
          <div className="flex flex-wrap gap-2 items-center">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${color === c ? "border-foreground scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
              />
            ))}
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-7 w-7 p-0.5 cursor-pointer rounded-full border-2 border-border"
              aria-label="Custom color"
              data-ocid="admin-team-color"
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="h-5 w-5 rounded-full border border-border shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground font-mono">
              {color}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending || !tournamentId}
        className="w-full sm:w-auto"
        data-ocid="admin-add-team-submit"
      >
        <Plus className="h-4 w-4 mr-1.5" aria-hidden />
        {isPending ? "Adding..." : "Add Team"}
      </Button>
    </form>
  );
}
