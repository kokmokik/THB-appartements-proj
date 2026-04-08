import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Mietanfrage erhalten",
};

const DURATION_LABELS: Record<string, string> = {
  "6-monate": "6 Monate",
  "1-jahr": "1 Jahr",
  "2-jahre": "2 Jahre",
  "unbefristet": "Unbefristet / nach Vereinbarung",
};

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function RentalInquiryConfirmationPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-4">Keine Anfrage gefunden</h1>
          <p className="text-white/50 mb-8">Es wurde keine gültige Mietanfrage gefunden.</p>
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

  const inquiry = await prisma.rentalInquiry.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-4">Anfrage nicht gefunden</h1>
          <p className="text-white/50 mb-8">Die Mietanfrage konnte nicht geladen werden.</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Mietanfrage eingegangen!</h1>
          <p className="text-white/50">
            Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen, um alle Details zu
            besprechen und den Mietvertrag abzuschließen.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white border-b border-white/[0.08] pb-4">
            Ihre Anfrage im Überblick
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/40">Apartment</span>
              <p className="font-medium text-white mt-0.5">{inquiry.property.name}</p>
            </div>
            <div>
              <span className="text-white/40">Anfragenummer</span>
              <p className="font-medium font-mono text-xs text-white mt-0.5">{inquiry.id}</p>
            </div>
            <div>
              <span className="text-white/40">Gewünschter Einzug</span>
              <p className="font-medium text-white mt-0.5">{formatDate(inquiry.moveInDate)}</p>
            </div>
            <div>
              <span className="text-white/40">Mietdauer</span>
              <p className="font-medium text-white mt-0.5">
                {DURATION_LABELS[inquiry.duration] || inquiry.duration}
              </p>
            </div>
            <div>
              <span className="text-white/40">Personen</span>
              <p className="font-medium text-white mt-0.5">{inquiry.occupants}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Name:</span>
              <span className="text-white">{inquiry.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">E-Mail:</span>
              <span className="text-white">{inquiry.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Telefon:</span>
              <span className="text-white">{inquiry.phone}</span>
            </div>
          </div>

          {inquiry.message && (
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-white/40 text-sm">Nachricht:</span>
              <p className="text-white/70 text-sm mt-1">{inquiry.message}</p>
            </div>
          )}
        </div>

        <p className="text-center text-white/30 text-sm mt-6">
          Eine Bestätigung wurde an {inquiry.email} gesendet.
        </p>

        <div className="mt-6 text-center">
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
