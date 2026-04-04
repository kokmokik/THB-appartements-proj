"use server";

import { prisma } from "@/lib/db";

export async function checkAvailability(
  propertyId: string,
  checkIn: Date,
  checkOut: Date
): Promise<{ available: boolean; blockedDates: string[] }> {
  // Check for overlapping confirmed/pending bookings
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      propertyId,
      status: { in: ["pending", "confirmed"] },
      OR: [
        {
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      ],
    },
  });

  // Check for blocked dates in range
  const blockedDates = await prisma.blockedDate.findMany({
    where: {
      propertyId,
      date: {
        gte: checkIn,
        lt: checkOut,
      },
    },
  });

  const blockedDateStrings = blockedDates.map((d) => d.date.toISOString());

  return {
    available: overlappingBookings.length === 0 && blockedDates.length === 0,
    blockedDates: blockedDateStrings,
  };
}

export async function getBlockedDatesForProperty(
  propertyId: string,
  startDate: Date,
  endDate: Date
): Promise<string[]> {
  // Get booked dates
  const bookings = await prisma.booking.findMany({
    where: {
      propertyId,
      status: { in: ["pending", "confirmed"] },
      checkIn: { lt: endDate },
      checkOut: { gt: startDate },
    },
    select: { checkIn: true, checkOut: true },
  });

  // Get explicitly blocked dates
  const blockedDates = await prisma.blockedDate.findMany({
    where: {
      propertyId,
      date: { gte: startDate, lt: endDate },
    },
    select: { date: true },
  });

  const unavailable: Set<string> = new Set();

  // Add booked date ranges
  for (const booking of bookings) {
    const current = new Date(booking.checkIn);
    while (current < booking.checkOut) {
      unavailable.add(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  }

  // Add blocked dates
  for (const blocked of blockedDates) {
    unavailable.add(blocked.date.toISOString().split("T")[0]);
  }

  return Array.from(unavailable);
}
