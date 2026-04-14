"use server";

import { prisma } from "@/lib/db";
import { bookingFormSchema } from "@/lib/validations";
import { checkAvailability } from "./availability";
import { calculateNights } from "@/lib/utils";
import { sendBookingConfirmation } from "@/lib/email";

interface CreateBookingResult {
  success: boolean;
  error?: string;
  bookingId?: string;
}

export async function createBooking(formData: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}): Promise<CreateBookingResult> {
  try {
    const parsed = bookingFormSchema.safeParse({
      ...formData,
      checkIn: new Date(formData.checkIn),
      checkOut: new Date(formData.checkOut),
    });

    if (!parsed.success) {
      return { success: false, error: "Ungültige Eingaben. Bitte überprüfen Sie Ihre Angaben." };
    }

    const data = parsed.data;

    const property = await prisma.property.findUnique({
      where: { id: data.propertyId },
    });

    if (!property) {
      return { success: false, error: "Unterkunft nicht gefunden." };
    }

    if (data.guests > property.maxGuests) {
      return { success: false, error: `Maximal ${property.maxGuests} Gäste erlaubt.` };
    }

    const { available } = await checkAvailability(data.propertyId, data.checkIn, data.checkOut);

    if (!available) {
      return { success: false, error: "Die gewählten Daten sind leider nicht mehr verfügbar." };
    }

    const nights = calculateNights(data.checkIn, data.checkOut);
    const totalPrice = nights * property.pricePerNight;

    const booking = await prisma.booking.create({
      data: {
        propertyId: data.propertyId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        totalPrice,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        specialRequests: data.specialRequests || null,
        status: "confirmed",
        paymentStatus: "unpaid",
      },
    });

    try {
      await sendBookingConfirmation({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        propertyName: property.name,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        bookingId: booking.id,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
  }
}
