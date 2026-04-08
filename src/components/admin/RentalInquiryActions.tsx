"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const STATUS_LABELS: Record<string, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  confirmed: "Bestätigt",
  rejected: "Abgelehnt",
};

interface RentalInquiryActionsProps {
  inquiryId: string;
  currentStatus: string;
}

export default function RentalInquiryActions({ inquiryId, currentStatus }: RentalInquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    if (!confirm(`Status auf "${STATUS_LABELS[newStatus]}" setzen?`)) return;
    setLoading(true);

    const res = await fetch(`/api/admin/rental-inquiries/${inquiryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Fehler beim Aktualisieren der Anfrage.");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <Spinner className="h-4 w-4" /> Wird aktualisiert...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {currentStatus === "new" && (
        <Button onClick={() => updateStatus("contacted")} variant="primary">
          Als kontaktiert markieren
        </Button>
      )}
      {(currentStatus === "new" || currentStatus === "contacted") && (
        <Button onClick={() => updateStatus("confirmed")} variant="primary">
          Bestätigen
        </Button>
      )}
      {currentStatus !== "rejected" && currentStatus !== "confirmed" && (
        <Button onClick={() => updateStatus("rejected")} variant="destructive">
          Ablehnen
        </Button>
      )}
    </div>
  );
}
