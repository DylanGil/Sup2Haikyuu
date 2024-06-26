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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
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
}
interface Team {
  id: number;
  name: string;
  players: Player[];
}

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamName, setTeamName] = useState("new");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>();
  const t = useTranslations("teams");
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setIsLoading(false);
      });
  }, []);
  {
    teams.map((team) => {
      console.log(team.players);
    });
  }

  const addTeam = async () => {
    const response = await fetch(`/api/teams`, {
      method: "POST",
      body: JSON.stringify({ name: teamName }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to add team");
    } else {
      // Handle success
      console.log("Team added successfully");
      fetch("/api/teams")
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setTeams(data);
          setIsLoading(false);
        });
    }
  };

  const confirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("delete", selectedTeam?.id);

    if (selectedTeam?.id) {
      const response = await fetch(`/api/teams/${selectedTeam.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Handle error
        console.error("Failed to delete tournament");
      } else {
        // Handle success
        console.log("Tournament deleted successfully");
        setTeams((prev) => prev.filter((team) => team.id !== selectedTeam.id));
      }
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
                    onChange={(e) => setTeamName(e.target.value)}
                    defaultValue="new"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogClose asChild>
                <DialogFooter>
                  <Button onClick={addTeam}>{t("add")}</Button>
                </DialogFooter>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("players")}</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>
                    {team.players.map((player) => (
                      <p key={player.id}>{player.name}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setSelectedTeam(team);
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
