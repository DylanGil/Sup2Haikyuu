import { prisma } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const players = await prisma.player.findMany({
    include: {
      team: true,
    },
  });
  return NextResponse.json(players, { status: 200 });
}

export async function POST(request: Request): Promise<NextResponse> {
  const playerData = await request.json();

  const newPlayer = await prisma.player.create({
    data: playerData,
  });

  return NextResponse.json(newPlayer);
}
