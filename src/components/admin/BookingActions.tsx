"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export default function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    if (!confirm(`Buchung wirklich auf "${newStatus}" setzen?`)) return;
    setLoading(true);

    const res = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Fehler beim Aktualisieren der Buchung.");
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
      {currentStatus === "pending" && (
        <Button onClick={() => updateStatus("confirmed")} variant="primary">
          Bestätigen
        </Button>
      )}
      {(currentStatus === "pending" || currentStatus === "confirmed") && (
        <Button onClick={() => updateStatus("cancelled")} variant="destructive">
          Stornieren
        </Button>
      )}
      {currentStatus === "confirmed" && (
        <Button onClick={() => updateStatus("completed")} variant="secondary">
          Abschließen
        </Button>
      )}
    </div>
  );
}
