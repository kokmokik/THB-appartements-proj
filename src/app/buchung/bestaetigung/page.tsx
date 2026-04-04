import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Buchungsbestätigung",
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <Container className="py-24 text-center">
        <AlertCircle className="mx-auto text-destructive mb-4" size={48} />
        <h1 className="text-2xl font-bold mb-4">Keine Buchung gefunden</h1>
        <p className="text-muted mb-8">Es wurde keine gültige Buchungssitzung gefunden.</p>
        <Link href="/">
          <Button>Zur Startseite</Button>
        </Link>
      </Container>
    );
  }

  let booking = null;
  let property = null;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { property: true },
      });
      property = booking?.property;
    }
  } catch {
    // Session retrieval failed
  }

  if (!booking || !property) {
    return (
      <Container className="py-24 text-center">
        <CheckCircle className="mx-auto text-success mb-4" size={48} />
        <h1 className="text-2xl font-bold mb-4">Vielen Dank für Ihre Buchung!</h1>
        <p className="text-muted mb-8">
          Ihre Zahlung wird verarbeitet. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
        <Link href="/">
          <Button>Zur Startseite</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto text-success mb-4" size={56} />
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Vielen Dank für Ihre Buchung!
        </h1>
        <p className="text-muted">
          Ihre Buchung wurde erfolgreich aufgenommen. Sie erhalten eine Bestätigung per E-Mail.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-3">Buchungsübersicht</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted">Unterkunft</span>
            <p className="font-medium">{property.name}</p>
          </div>
          <div>
            <span className="text-muted">Buchungsnummer</span>
            <p className="font-medium font-mono text-xs">{booking.id}</p>
          </div>
          <div>
            <span className="text-muted">Anreise</span>
            <p className="font-medium">{formatDate(booking.checkIn)}</p>
          </div>
          <div>
            <span className="text-muted">Abreise</span>
            <p className="font-medium">{formatDate(booking.checkOut)}</p>
          </div>
          <div>
            <span className="text-muted">Gäste</span>
            <p className="font-medium">{booking.guests}</p>
          </div>
          <div>
            <span className="text-muted">Gesamtpreis</span>
            <p className="font-medium text-primary">{formatCurrency(booking.totalPrice)}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Name:</span>
            <span>{booking.guestName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">E-Mail:</span>
            <span>{booking.guestEmail}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline">Zur Startseite</Button>
        </Link>
      </div>
    </Container>
  );
}
