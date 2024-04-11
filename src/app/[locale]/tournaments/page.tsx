"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
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
  matches: Player[];
}
interface Match {
  id: number;
  team1_id: number;
  team2_id: number;
  team1: Team;
  team2: Team;
  winner_id: number;
  team1_score: number;
  team2_score: number;
  tournament_id: number;
  match_date: string;
}
interface Tournament {
  id: number;
  name: string;
  matches: Match[];
}

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>();
  const [tournamentName, setTournamentName] = useState<string>("new");
  const router = useRouter();
  const t = useTranslations("tournaments");
  useEffect(() => {
    fetch("/api/tournaments")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setTournaments(data);
        setIsLoading(false);
      });
  }, []);
  {
    tournaments.map((team) => {
      console.log(team.matches);
    });
  }

  const onDoubleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const tournamentId = e.currentTarget.id;
    console.log("tournamentId", tournamentId);
    router.push(`/tournaments/${tournamentId}`);
  };

  const confirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("delete", selectedTournament?.id);

    if (selectedTournament?.id) {
      const response = await fetch(
        `/api/tournaments/${selectedTournament.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // Handle error
        console.error("Failed to delete tournament");
      } else {
        // Handle success
        console.log("Tournament deleted successfully");
        setTournaments((prev) =>
          prev.filter((tournament) => tournament.id !== selectedTournament.id)
        );
      }
    }
  };

  const addTournament = async () => {
    console.log("teamName", tournamentName);
    const response = await fetch(`/api/tournaments`, {
      method: "POST",
      body: JSON.stringify({ name: tournamentName }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to add tournament");
    } else {
      // Handle success
      console.log("Tournament added successfully");
      fetch("/api/tournaments")
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setTournaments(data);
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
                    onChange={(e) => setTournamentName(e.target.value)}
                    defaultValue="new"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogClose asChild>
                <DialogFooter>
                  <Button onClick={addTournament}>{t("add")}</Button>
                </DialogFooter>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <Table>
            <TableCaption>{t("description")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("matchs")}</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow
                  key={tournament.id}
                  id={tournament.id.toString()}
                  onDoubleClick={onDoubleClick}
                >
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>
                    {tournament.matches.map((match) => (
                      <p key={match.id}>
                        {match.team1.name} vs {match.team2.name}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setSelectedTournament(tournament);
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
