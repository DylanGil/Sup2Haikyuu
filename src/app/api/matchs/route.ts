import { prisma } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const matchs = await prisma.match.findMany();
  return NextResponse.json(matchs, { status: 200 });
}

export async function POST(request: Request): Promise<NextResponse> {
  const matchData = await request.json();

  const newMatch = await prisma.match.create({
    data: matchData,
  });

  return NextResponse.json(newMatch);
}
