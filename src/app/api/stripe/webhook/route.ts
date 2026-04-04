import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        const booking = await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: "confirmed",
            paymentStatus: "paid",
            stripePaymentId: session.payment_intent as string,
            stripeSessionId: session.id,
          },
          include: { property: true },
        });

        try {
          await sendBookingConfirmation({
            guestName: booking.guestName,
            guestEmail: booking.guestEmail,
            propertyName: booking.property.name,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            guests: booking.guests,
            totalPrice: booking.totalPrice,
            bookingId: booking.id,
          });
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
        }
      }
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = charge.payment_intent as string;

      if (paymentIntentId) {
        const booking = await prisma.booking.findFirst({
          where: { stripePaymentId: paymentIntentId },
        });

        if (booking) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              paymentStatus: "refunded",
              status: "cancelled",
            },
          });
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
