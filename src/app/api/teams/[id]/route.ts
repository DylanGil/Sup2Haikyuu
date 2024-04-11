import { prisma } from "@/lib/service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } } // Destructure the params object
): Promise<NextResponse> {
  const team = await prisma.team.findUnique({
    where: { id: Number(id) },
  });

  if (!team) {
    return NextResponse.json("Team not found", { status: 404 });
  }

  return NextResponse.json(team, { status: 200 });
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const { ...teamData } = await request.json();

  const updatedTeam = await prisma.team.update({
    where: { id: Number(id) },
    data: teamData,
  });

  return NextResponse.json(updatedTeam);
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const deletedTeam = await prisma.team.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedTeam);
}
