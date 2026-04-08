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
import {
  useAddPlayer,
  useGetTeamsByTournament,
  useListTournaments,
} from "../hooks/use-tournament";

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const;

export function AddPlayerForm() {
  const { data: tournaments = [] } = useListTournaments();
  const [tournamentId, setTournamentId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("1");
  const [position, setPosition] = useState<string>("Midfielder");
  const { mutate, isPending } = useAddPlayer();

  const { data: teams = [] } = useGetTeamsByTournament(
    tournamentId ? BigInt(tournamentId) : null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tournamentId || !teamId) {
      toast.error("Select a tournament and team");
      return;
    }
    const num = Number(number);
    if (num < 1 || num > 99) {
      toast.error("Jersey number must be 1–99");
      return;
    }
    mutate(
      {
        name: name.trim(),
        number: BigInt(number),
        position,
        teamId: BigInt(teamId),
        tournamentId: BigInt(tournamentId),
      },
      {
        onSuccess: (p) => {
          toast.success(`${p.name} added to squad!`);
          setName("");
          setNumber("1");
        },
        onError: (err) => toast.error(err.message),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="player-tournament">Tournament</Label>
          <Select
            value={tournamentId}
            onValueChange={(v) => {
              setTournamentId(v);
              setTeamId("");
            }}
          >
            <SelectTrigger
              id="player-tournament"
              data-ocid="admin-player-tournament"
            >
              <SelectValue placeholder="Select tournament" />
            </SelectTrigger>
            <SelectContent>
              {tournaments.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="player-team">Team</Label>
          <Select
            value={teamId}
            onValueChange={setTeamId}
            disabled={!tournamentId || teams.length === 0}
          >
            <SelectTrigger id="player-team" data-ocid="admin-player-team">
              <SelectValue
                placeholder={
                  !tournamentId
                    ? "Select tournament first"
                    : teams.length === 0
                      ? "No teams yet"
                      : "Select team"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t.id.toString()} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="player-name">Player Name</Label>
          <Input
            id="player-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Marcus Rashford"
            required
            data-ocid="admin-player-name"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="player-number">Jersey #</Label>
          <Input
            id="player-number"
            type="number"
            min="1"
            max="99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            data-ocid="admin-player-number"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="player-position">Position</Label>
        <Select value={position} onValueChange={setPosition}>
          <SelectTrigger id="player-position" data-ocid="admin-player-position">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {POSITIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isPending || !tournamentId || !teamId}
        className="w-full sm:w-auto"
        data-ocid="admin-add-player-submit"
      >
        <Plus className="h-4 w-4 mr-1.5" aria-hidden />
        {isPending ? "Adding..." : "Add Player"}
      </Button>
    </form>
  );
}
