import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { calculateNights } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Buchung nicht gefunden" }, { status: 404 });
    }

    const nights = calculateNights(booking.checkIn, booking.checkOut);

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
              name: `${booking.property.name} - ${nights} Nächte`,
              description: `Aufenthalt vom ${booking.checkIn.toLocaleDateString("de-DE")} bis ${booking.checkOut.toLocaleDateString("de-DE")}`,
            },
            unit_amount: Math.round(booking.totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.id,
        propertyId: booking.propertyId,
      },
      success_url: `${process.env.NEXTAUTH_URL}/buchung/bestaetigung?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/buchen/${booking.property.slug}?cancelled=true`,
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Fehler beim Erstellen der Zahlung" }, { status: 500 });
  }
}
