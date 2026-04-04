import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { BOOKING_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { CalendarCheck, Euro, Clock, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [totalBookingsMonth, revenueMonth, pendingBookings, upcomingCheckins, recentBookings] =
    await Promise.all([
      prisma.booking.count({
        where: {
          createdAt: { gte: startOfMonth, lte: endOfMonth },
          status: { in: ["confirmed", "completed"] },
        },
      }),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: {
          createdAt: { gte: startOfMonth, lte: endOfMonth },
          paymentStatus: "paid",
        },
      }),
      prisma.booking.count({
        where: { status: "pending" },
      }),
      prisma.booking.count({
        where: {
          checkIn: { gte: now, lte: next7Days },
          status: "confirmed",
        },
      }),
      prisma.booking.findMany({
        include: { property: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const stats = [
    {
      label: "Buchungen diesen Monat",
      value: totalBookingsMonth,
      icon: CalendarCheck,
      color: "text-primary",
    },
    {
      label: "Umsatz diesen Monat",
      value: formatCurrency(revenueMonth._sum.totalPrice || 0),
      icon: Euro,
      color: "text-success",
    },
    {
      label: "Ausstehende Buchungen",
      value: pendingBookings,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Check-ins (7 Tage)",
      value: upcomingCheckins,
      icon: TrendingUp,
      color: "text-secondary",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-accent/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold">Letzte Buchungen</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Gast</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Unterkunft</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Zeitraum</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Betrag</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Zahlung</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted">
                    Noch keine Buchungen vorhanden.
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-accent/20">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-xs text-muted">{booking.guestEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{booking.property.name}</td>
                    <td className="px-4 py-3">
                      {booking.checkIn.toLocaleDateString("de-DE")} –{" "}
                      {booking.checkOut.toLocaleDateString("de-DE")}
                    </td>
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
