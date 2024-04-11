import { prisma } from "@/lib/service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const player = await prisma.player.findUnique({
    where: { id: Number(id) },
  });

  if (!player) {
    return NextResponse.json("Player not found", { status: 404 });
  }

  return NextResponse.json(player, { status: 200 });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const { ...playerData } = await request.json();

  const updatedPlayer = await prisma.player.update({
    where: { id: Number(id) },
    data: playerData,
  });

  return NextResponse.json(updatedPlayer);
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const deletedPlayer = await prisma.player.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedPlayer);
}
