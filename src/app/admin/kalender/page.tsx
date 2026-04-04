"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { de } from "react-day-picker/locale";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface Property {
  id: string;
  name: string;
  slug: string;
}

interface BlockedDate {
  id: string;
  date: string;
}

export default function CalendarPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        if (data.length > 0) setSelectedProperty(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!selectedProperty) return;
    setLoading(true);
    fetch(`/api/admin/blocked-dates?propertyId=${selectedProperty}`)
      .then((r) => r.json())
      .then((data: BlockedDate[]) => {
        setBlockedDates(data.map((d) => new Date(d.date)));
        setLoading(false);
      });
  }, [selectedProperty]);

  async function handleBlock() {
    if (selectedDates.length === 0) return;
    setSaving(true);

    await fetch("/api/admin/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: selectedProperty,
        dates: selectedDates.map((d) => d.toISOString()),
        reason: "Manuell gesperrt",
      }),
    });

    setBlockedDates([...blockedDates, ...selectedDates]);
    setSelectedDates([]);
    setSaving(false);
  }

  async function handleUnblock() {
    if (selectedDates.length === 0) return;
    setSaving(true);

    for (const date of selectedDates) {
      await fetch(
        `/api/admin/blocked-dates?propertyId=${selectedProperty}&date=${date.toISOString()}`,
        { method: "DELETE" }
      );
    }

    setBlockedDates(
      blockedDates.filter(
        (bd) => !selectedDates.some((sd) => sd.toDateString() === bd.toDateString())
      )
    );
    setSelectedDates([]);
    setSaving(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kalender-Verwaltung</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Unterkunft wählen</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full rounded-lg border border-border px-4 py-2.5 bg-white focus:border-primary focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <div className="flex justify-center">
                  <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates || [])}
                    locale={de}
                    numberOfMonths={2}
                    modifiers={{ blocked: blockedDates }}
                    modifiersClassNames={{
                      blocked: "!bg-red-100 !text-red-800 line-through",
                    }}
                    className="border border-border rounded-xl p-4"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-semibold">Aktionen</h2>
              <p className="text-sm text-muted">
                Wählen Sie Daten im Kalender aus und sperren oder entsperren Sie diese.
              </p>
              <p className="text-sm">
                <strong>{selectedDates.length}</strong> Datum/Daten ausgewählt
              </p>
              <div className="space-y-2">
                <Button
                  onClick={handleBlock}
                  className="w-full"
                  disabled={selectedDates.length === 0 || saving}
                  variant="destructive"
                >
                  {saving ? "Wird gespeichert..." : "Ausgewählte Daten sperren"}
                </Button>
                <Button
                  onClick={handleUnblock}
                  className="w-full"
                  disabled={selectedDates.length === 0 || saving}
                  variant="outline"
                >
                  Ausgewählte Daten entsperren
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium mb-2">Legende</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
                    <span className="text-muted">Gesperrt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary/20 border border-primary"></div>
                    <span className="text-muted">Ausgewählt</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
