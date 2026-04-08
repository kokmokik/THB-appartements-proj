import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Card, { CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";
import RentalInquiryActions from "@/components/admin/RentalInquiryActions";

const STATUS_LABELS: Record<string, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  confirmed: "Bestätigt",
  rejected: "Abgelehnt",
};

const DURATION_LABELS: Record<string, string> = {
  "6-monate": "6 Monate",
  "1-jahr": "1 Jahr",
  "2-jahre": "2 Jahre",
  "unbefristet": "Unbefristet / nach Vereinbarung",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RentalInquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const inquiry = await prisma.rentalInquiry.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!inquiry) notFound();

  return (
    <div>
      <Link href="/admin/mietanfragen" className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-6">
        <ArrowLeft size={18} /> Zurück zu Mietanfragen
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mietanfrage Details</h1>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-lg">Anfrageinformationen</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Anfragenummer</p>
                <p className="font-mono text-xs">{inquiry.id}</p>
              </div>
              <div>
                <p className="text-muted">Apartment</p>
                <p className="font-medium">{inquiry.property.name}</p>
              </div>
              <div>
                <p className="text-muted">Gewünschter Einzug</p>
                <p>{formatDate(inquiry.moveInDate)}</p>
              </div>
              <div>
                <p className="text-muted">Mietdauer</p>
                <p>{DURATION_LABELS[inquiry.duration] || inquiry.duration}</p>
              </div>
              <div>
                <p className="text-muted">Personen im Haushalt</p>
                <p>{inquiry.occupants}</p>
              </div>
              <div>
                <p className="text-muted">Eingegangen am</p>
                <p>{formatDate(inquiry.createdAt)}</p>
              </div>
            </div>
            {inquiry.message && (
              <div>
                <p className="text-muted text-sm">Nachricht</p>
                <p className="text-sm mt-1">{inquiry.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-lg">Kontaktinformationen</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted">Name</p>
                <p className="font-medium">{inquiry.name}</p>
              </div>
              <div>
                <p className="text-muted">E-Mail</p>
                <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                  {inquiry.email}
                </a>
              </div>
              <div>
                <p className="text-muted">Telefon</p>
                <a href={`tel:${inquiry.phone}`} className="hover:underline">
                  {inquiry.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <RentalInquiryActions inquiryId={inquiry.id} currentStatus={inquiry.status} />
      </div>
    </div>
  );
}
