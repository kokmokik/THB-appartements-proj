"use server";

import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { bookingFormSchema } from "@/lib/validations";
import { checkAvailability } from "./availability";
import { calculateNights } from "@/lib/utils";

interface CreateBookingResult {
  success: boolean;
  error?: string;
  checkoutUrl?: string;
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
    // Parse and validate
    const parsed = bookingFormSchema.safeParse({
      ...formData,
      checkIn: new Date(formData.checkIn),
      checkOut: new Date(formData.checkOut),
    });

    if (!parsed.success) {
      return { success: false, error: "Ungültige Eingaben. Bitte überprüfen Sie Ihre Angaben." };
    }

    const data = parsed.data;

    // Get property
    const property = await prisma.property.findUnique({
      where: { id: data.propertyId },
    });

    if (!property) {
      return { success: false, error: "Unterkunft nicht gefunden." };
    }

    // Check guest count
    if (data.guests > property.maxGuests) {
      return { success: false, error: `Maximal ${property.maxGuests} Gäste erlaubt.` };
    }

    // Check availability server-side
    const { available } = await checkAvailability(
      data.propertyId,
      data.checkIn,
      data.checkOut
    );

    if (!available) {
      return { success: false, error: "Die gewählten Daten sind leider nicht mehr verfügbar." };
    }

    // Calculate price server-side
    const nights = calculateNights(data.checkIn, data.checkOut);
    const totalPrice = nights * property.pricePerNight;

    // Create booking
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
        status: "pending",
        paymentStatus: "unpaid",
      },
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      locale: "de",
      currency: "eur",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${property.name} - ${nights} Nächte`,
              description: `Aufenthalt vom ${data.checkIn.toLocaleDateString("de-DE")} bis ${data.checkOut.toLocaleDateString("de-DE")}`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.id,
        propertyId: property.id,
      },
      success_url: `${process.env.NEXTAUTH_URL}/buchung/bestaetigung?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/buchen/${property.slug}?cancelled=true`,
    });

    // Store Stripe session ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    return {
      success: true,
      checkoutUrl: session.url!,
      bookingId: booking.id,
    };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
  }
}
