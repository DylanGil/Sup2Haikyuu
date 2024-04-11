"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

interface Player {
  id: number;
  name: string;
  number: number;
  team_id: number;
  team: Team;
}
interface Team {
  id: number;
  name: string;
  players: Player[];
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const [playerName, setPlayerInfo] = useState({ name: "Dylan", number: 18 });
  const t = useTranslations("players");
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setIsLoading(false);
      });
  }, []);

  const confirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("delete", selectedPlayer?.id);

    if (selectedPlayer?.id) {
      const response = await fetch(`/api/players/${selectedPlayer.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Handle error
        console.error("Failed to delete player");
      } else {
        // Handle success
        console.log("Player deleted successfully");
        setPlayers((prev) =>
          prev.filter((player) => player.id !== selectedPlayer.id)
        );
      }
    }
  };

  const addPlayer = async () => {
    const response = await fetch(`/api/players`, {
      method: "POST",
      body: JSON.stringify(playerName),
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to add player");
    } else {
      // Handle success
      console.log("Player added successfully");
      fetch("/api/players")
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setPlayers(data);
          setIsLoading(false);
        });
    }
  };

  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      {isLoading ? (
        <FaSpinner className="m-5 animate-spin text-4xl" />
      ) : (
        <div className="w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-5 ml-auto flex items-center">
                {t("add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("add")}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t("name")}
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) =>
                      setPlayerInfo({
                        name: e.target.value,
                        number: playerName.number,
                      })
                    }
                    defaultValue="Dylan"
                    className="col-span-3"
                  />
                  <Label htmlFor="number" className="text-right">
                    {t("number")}
                  </Label>
                  <Input
                    id="number"
                    onChange={(e) =>
                      setPlayerInfo({
                        name: playerName.name,
                        number: parseInt(e.target.value),
                      })
                    }
                    defaultValue={18}
                    type="number"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogClose asChild>
                <DialogFooter>
                  <Button onClick={addPlayer}>{t("add")}</Button>
                </DialogFooter>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("number")}</TableHead>
                <TableHead>{t("team")}</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.number}</TableCell>
                  <TableCell>{player?.team?.name}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setSelectedPlayer(player);
                          }}
                        >
                          {t("delete")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Button
                          variant={"destructive"}
                          onClick={confirmDelete}
                          className="w-full text-left"
                        >
                          {t("confirmDelete")}
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
