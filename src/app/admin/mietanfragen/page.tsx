import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDateShort } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Eye } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  confirmed: "Bestätigt",
  rejected: "Abgelehnt",
};

export default async function AdminRentalInquiriesPage() {
  const inquiries = await prisma.rentalInquiry.findMany({
    include: { property: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mietanfragen</h1>
        <p className="text-muted text-sm">{inquiries.length} Anfragen insgesamt</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="text-left px-4 py-3 font-medium text-muted">Interessent</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Apartment</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Einzug</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Dauer</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Personen</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted">Eingegangen</th>
                <th className="text-left px-4 py-3 font-medium text-muted"></th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted">
                    Noch keine Mietanfragen vorhanden.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border hover:bg-accent/20">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-xs text-muted">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{inquiry.property.name}</td>
                    <td className="px-4 py-3">{formatDateShort(inquiry.moveInDate)}</td>
                    <td className="px-4 py-3 capitalize">
                      {inquiry.duration.replace("-", " ")}
                    </td>
                    <td className="px-4 py-3">{inquiry.occupants}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          inquiry.status === "confirmed"
                            ? "success"
                            : inquiry.status === "rejected"
                            ? "destructive"
                            : inquiry.status === "contacted"
                            ? "warning"
                            : "default"
                        }
                      >
                        {STATUS_LABELS[inquiry.status] || inquiry.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDateShort(inquiry.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/mietanfragen/${inquiry.id}`}
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
