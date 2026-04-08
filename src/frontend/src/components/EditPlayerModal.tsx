import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEditPlayer } from "../hooks/use-tournament";
import type { PlayerView, TeamId, TournamentId } from "../types";

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const;

interface EditPlayerModalProps {
  player: PlayerView | null;
  tournamentId: TournamentId;
  teamId: TeamId;
  open: boolean;
  onClose: () => void;
}

export function EditPlayerModal({
  player,
  tournamentId,
  teamId,
  open,
  onClose,
}: EditPlayerModalProps) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("1");
  const [position, setPosition] = useState("Midfielder");
  const { mutate, isPending } = useEditPlayer();

  useEffect(() => {
    if (player) {
      setName(player.name);
      setNumber(player.number.toString());
      setPosition(player.position);
    }
  }, [player]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!player) return;
    const num = Number(number);
    if (num < 1 || num > 99) {
      toast.error("Jersey number must be 1–99");
      return;
    }
    mutate(
      {
        playerId: player.id,
        name: name.trim(),
        number: BigInt(number),
        position,
        tournamentId,
        teamId,
      },
      {
        onSuccess: () => {
          toast.success("Player updated!");
          onClose();
        },
        onError: (err) => toast.error(err.message),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="edit-player-modal">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Player</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="edit-player-name">Full Name</Label>
            <Input
              id="edit-player-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="edit-player-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-player-number">Jersey #</Label>
              <Input
                id="edit-player-number"
                type="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                data-ocid="edit-player-number"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-player-position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger
                  id="edit-player-position"
                  data-ocid="edit-player-position"
                >
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
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              data-ocid="edit-player-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="edit-player-save"
            >
              <Save className="h-4 w-4 mr-1.5" aria-hidden />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
