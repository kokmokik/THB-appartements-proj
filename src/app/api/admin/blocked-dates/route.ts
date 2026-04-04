import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const propertyId = searchParams.get("propertyId");

  if (!propertyId) {
    return NextResponse.json({ error: "Missing propertyId" }, { status: 400 });
  }

  const blockedDates = await prisma.blockedDate.findMany({
    where: { propertyId },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(blockedDates);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId, dates, reason } = await request.json();

  if (!propertyId || !dates || !Array.isArray(dates)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  let count = 0;
  for (const date of dates) {
    const dateObj = new Date(date as string);
    const existing = await prisma.blockedDate.findFirst({
      where: { propertyId, date: dateObj },
    });
    if (!existing) {
      await prisma.blockedDate.create({
        data: { propertyId, date: dateObj, reason: reason || null },
      });
      count++;
    }
  }

  return NextResponse.json({ count });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const propertyId = searchParams.get("propertyId");
  const date = searchParams.get("date");

  if (!propertyId || !date) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  await prisma.blockedDate.deleteMany({
    where: {
      propertyId,
      date: new Date(date),
    },
  });

  return NextResponse.json({ success: true });
}
