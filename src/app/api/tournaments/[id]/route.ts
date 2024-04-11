import { prisma } from "@/lib/service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const tournament = await prisma.tournament.findUnique({
    where: { id: Number(id) },
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

  if (!tournament) {
    return NextResponse.json("Tournament not found", { status: 404 });
  }

  return NextResponse.json(tournament, { status: 200 });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const { ...tournamentData } = await request.json();

  const updatedTournament = await prisma.tournament.update({
    where: { id: Number(id) },
    data: tournamentData,
  });

  return NextResponse.json(updatedTournament);
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const deletedTournament = await prisma.tournament.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedTournament);
}
