import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { BOOKING_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { Eye } from "lucide-react";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { property: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Buchungen</h1>
        <p className="text-muted text-sm">{bookings.length} Buchungen insgesamt</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Gast</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Unterkunft</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Anreise</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Abreise</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Gäste</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Betrag</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Zahlung</th>
                <th className="text-left px-4 py-3 font-medium text-muted"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-muted">
                    Noch keine Buchungen vorhanden.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-accent/20">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-xs text-muted">{booking.guestEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{booking.property.name}</td>
                    <td className="px-4 py-3">{formatDateShort(booking.checkIn)}</td>
                    <td className="px-4 py-3">{formatDateShort(booking.checkOut)}</td>
                    <td className="px-4 py-3">{booking.guests}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(booking.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "success"
                            : booking.status === "cancelled"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {BOOKING_STATUS_LABELS[booking.status] || booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          booking.paymentStatus === "paid"
                            ? "success"
                            : booking.paymentStatus === "refunded"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {PAYMENT_STATUS_LABELS[booking.paymentStatus] || booking.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/buchungen/${booking.id}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
