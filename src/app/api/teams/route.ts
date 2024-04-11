import { prisma } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const teams = await prisma.team.findMany({
    include: {
      players: true,
      team_wins: true,
    },
  });
  return NextResponse.json(teams, { status: 200 });
}

export async function POST(request: Request): Promise<NextResponse> {
  const teamData = await request.json();

  const newTeam = await prisma.team.create({
    data: teamData,
  });

  return NextResponse.json(newTeam);
}
