import { NextRequest, NextResponse } from "next/server";
import { getBlockedDatesForProperty } from "@/actions/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const propertyId = searchParams.get("propertyId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!propertyId || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const blockedDates = await getBlockedDatesForProperty(
    propertyId,
    new Date(startDate),
    new Date(endDate)
  );

  return NextResponse.json({ blockedDates });
}
