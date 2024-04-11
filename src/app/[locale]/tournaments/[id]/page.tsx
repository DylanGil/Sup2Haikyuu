"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

//get props
export default function Home({ params: { id } }: { params: { id: string } }) {
  const [tournament, setTournaments] = useState<Tournament>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("matchs");
  useEffect(() => {
    fetch(`/api/tournaments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setTournaments(data);
        setIsLoading(false);
      });
  }, []);

  const onClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const tournamentId = e.currentTarget.id;
    console.log("tournamentId", tournamentId);
    router.push(`/tournaments/${tournamentId}`);
  };
  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <h1 className="text-4xl font-bold">{tournament?.name}</h1>
      {isLoading ? (
        <FaSpinner className="m-5 animate-spin text-4xl" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("team1")}</TableHead>
              <TableHead>{t("team2")}</TableHead>
              <TableHead>{t("score")}</TableHead>
              <TableHead>{t("winner")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournament?.matches.map((match) => (
              <TableRow
                key={match.id}
                id={match.id.toString()}
                onDoubleClick={onClick}
              >
                <TableCell>{match.team1.name}</TableCell>
                <TableCell>{match.team2.name}</TableCell>
                <TableCell>
                  {match.team1_score} - {match.team2_score}
                </TableCell>
                <TableCell>
                  {match.winner_id === match.team1_id
                    ? match.team1.name
                    : match.team2.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
