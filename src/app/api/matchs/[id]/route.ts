import { prisma } from "@/lib/service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } } // Destructure the params object
): Promise<NextResponse> {
  const match = await prisma.match.findUnique({
    where: { id: Number(id) },
  });

  if (!match) {
    return NextResponse.json("Match not found", { status: 404 });
  }

  return NextResponse.json(match, { status: 200 });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const { ...matchData } = await request.json();

  const updatedMatch = await prisma.match.update({
    where: { id: Number(id) },
    data: matchData,
  });

  return NextResponse.json(updatedMatch);
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const deletedMatch = await prisma.match.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedMatch);
}
