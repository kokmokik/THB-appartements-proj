import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const properties = await prisma.property.findMany({
    where: { active: true },
    select: { id: true, name: true, slug: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(properties);
}
