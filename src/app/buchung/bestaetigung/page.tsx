import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Anfrage erhalten",
};

interface Props {
  searchParams: Promise<{ booking_id?: string }>;
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { booking_id } = await searchParams;

  if (!booking_id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-4">Keine Buchung gefunden</h1>
          <p className="text-white/50 mb-8">Es wurde keine gültige Buchung gefunden.</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-background font-semibold hover:bg-white/90 transition-all"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const booking = await prisma.booking.findUnique({
    where: { id: booking_id },
    include: { property: true },
  });

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-4">Buchung nicht gefunden</h1>
          <p className="text-white/50 mb-8">Diese Buchung existiert nicht oder wurde gelöscht.</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-background font-semibold hover:bg-white/90 transition-all"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            ← Startseite
          </Link>
        </div>
        <div className="text-center mb-10">
          <CheckCircle className="mx-auto text-green-400 mb-4" size={56} />
          <h1 className="text-3xl font-bold text-white mb-2">Anfrage erhalten!</h1>
          <p className="text-white/50">
            Vielen Dank für Ihre Buchungsanfrage. Wir melden uns in Kürze bei Ihnen.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-white/[0.08] pb-4">
            Buchungsübersicht
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/40">Unterkunft</span>
              <p className="font-medium text-white mt-0.5">{booking.property.name}</p>
            </div>
            <div>
              <span className="text-white/40">Buchungsnummer</span>
              <p className="font-medium font-mono text-xs text-white mt-0.5">{booking.id}</p>
            </div>
            <div>
              <span className="text-white/40">Anreise</span>
              <p className="font-medium text-white mt-0.5">{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <span className="text-white/40">Abreise</span>
              <p className="font-medium text-white mt-0.5">{formatDate(booking.checkOut)}</p>
            </div>
            <div>
              <span className="text-white/40">Gäste</span>
              <p className="font-medium text-white mt-0.5">{booking.guests}</p>
            </div>
            <div>
              <span className="text-white/40">Gesamtpreis</span>
              <p className="font-medium text-white mt-0.5">{formatCurrency(booking.totalPrice)}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Name:</span>
              <span className="text-white">{booking.guestName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">E-Mail:</span>
              <span className="text-white">{booking.guestEmail}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-white/50 text-sm">
            Sie erhalten eine Bestätigung per E-Mail. Bei Fragen erreichen Sie uns unter{" "}
            <a href="tel:+4917624896524" className="text-white/80 hover:text-white transition-colors">
              +49 176 24896524
            </a>
            .
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-white/[0.15] text-white/80 text-sm font-medium hover:bg-white/[0.05] transition-all"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
