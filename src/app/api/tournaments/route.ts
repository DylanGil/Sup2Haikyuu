import { prisma } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        matches: {
          include: {
            team1: true,
            team2: true,
            winner: true,
          },
        },
      },
    });
    return NextResponse.json(tournaments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const tournamentData = await request.json();
  console.log("tournamentData", tournamentData);

  const newTournament = await prisma.tournament.create({
    data: tournamentData,
  });

  return NextResponse.json(newTournament);
}
