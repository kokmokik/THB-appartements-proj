import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { BOOKING_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import BookingActions from "@/components/admin/BookingActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!booking) notFound();

  return (
    <div>
      <Link href="/admin/buchungen" className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-6">
        <ArrowLeft size={18} /> Zurück zu Buchungen
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Buchungsdetails</h1>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              booking.status === "confirmed" ? "success" :
              booking.status === "cancelled" ? "destructive" : "warning"
            }
          >
            {BOOKING_STATUS_LABELS[booking.status]}
          </Badge>
          <Badge
            variant={
              booking.paymentStatus === "paid" ? "success" :
              booking.paymentStatus === "refunded" ? "destructive" : "warning"
            }
          >
            {PAYMENT_STATUS_LABELS[booking.paymentStatus]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-lg">Buchungsinformationen</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Buchungsnummer</p>
                <p className="font-mono text-xs">{booking.id}</p>
              </div>
              <div>
                <p className="text-muted">Unterkunft</p>
                <p className="font-medium">{booking.property.name}</p>
              </div>
              <div>
                <p className="text-muted">Anreise</p>
                <p>{formatDate(booking.checkIn)}</p>
              </div>
              <div>
                <p className="text-muted">Abreise</p>
                <p>{formatDate(booking.checkOut)}</p>
              </div>
              <div>
                <p className="text-muted">Gäste</p>
                <p>{booking.guests}</p>
              </div>
              <div>
                <p className="text-muted">Gesamtpreis</p>
                <p className="font-bold text-primary">{formatCurrency(booking.totalPrice)}</p>
              </div>
            </div>
            {booking.specialRequests && (
              <div>
                <p className="text-muted text-sm">Besondere Wünsche</p>
                <p className="text-sm mt-1">{booking.specialRequests}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-lg">Gastinformationen</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted">Name</p>
                <p className="font-medium">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-muted">E-Mail</p>
                <p>{booking.guestEmail}</p>
              </div>
              <div>
                <p className="text-muted">Telefon</p>
                <p>{booking.guestPhone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-2">Zahlungsinformationen</h3>
              <div className="space-y-2 text-sm">
                {booking.stripePaymentId && (
                  <div>
                    <p className="text-muted">Stripe Payment ID</p>
                    <p className="font-mono text-xs">{booking.stripePaymentId}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted">Erstellt am</p>
                  <p>{formatDate(booking.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <BookingActions bookingId={booking.id} currentStatus={booking.status} />
      </div>
    </div>
  );
}
