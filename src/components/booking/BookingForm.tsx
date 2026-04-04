"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, DateRange } from "react-day-picker";
import { de } from "react-day-picker/locale";
import { addMonths, isBefore, startOfDay } from "date-fns";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { createBooking } from "@/actions/bookings";
import { getBlockedDatesForProperty } from "@/actions/availability";
import { Minus, Plus } from "lucide-react";

interface BookingFormProps {
  propertyId: string;
  propertySlug: string;
  propertyName: string;
  pricePerNight: number;
  maxGuests: number;
}

export default function BookingForm({
  propertyId,
  propertySlug,
  propertyName,
  pricePerNight,
  maxGuests,
}: BookingFormProps) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 12);

  useEffect(() => {
    async function loadBlockedDates() {
      const dates = await getBlockedDatesForProperty(propertyId, today, maxDate);
      setBlockedDates(dates.map((d) => new Date(d)));
    }
    loadBlockedDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const nights =
    dateRange?.from && dateRange?.to
      ? calculateNights(dateRange.from, dateRange.to)
      : 0;
  const totalPrice = nights * pricePerNight;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!dateRange?.from || !dateRange?.to) {
      setError("Bitte wählen Sie An- und Abreisedatum.");
      return;
    }

    if (!guestName || !guestEmail || !guestPhone) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    setLoading(true);

    const result = await createBooking({
      propertyId,
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to.toISOString(),
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests: specialRequests || undefined,
    });

    if (result.success && result.checkoutUrl) {
      router.push(result.checkoutUrl);
    } else {
      setError(result.error || "Ein Fehler ist aufgetreten.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Date Picker */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reisedaten wählen</h2>
        <div className="flex justify-center">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            locale={de}
            disabled={[
              { before: today },
              { after: maxDate },
              ...blockedDates.map((d) => d),
            ]}
            numberOfMonths={2}
            className="border border-border rounded-xl p-4 bg-white"
          />
        </div>
      </div>

      {/* Guest Count */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Anzahl der Gäste</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="text-2xl font-semibold w-8 text-center">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Plus size={18} />
          </button>
          <span className="text-muted text-sm">(max. {maxGuests})</span>
        </div>
      </div>

      {/* Price Summary */}
      {nights > 0 && (
        <div className="bg-accent/50 rounded-xl p-6">
          <h3 className="font-semibold mb-3">Preisübersicht</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                {formatCurrency(pricePerNight)} x {nights} Nächte
              </span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span>Gesamt</span>
              <span className="text-primary">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Personal Details */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Persönliche Angaben</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="guestName"
            label="Name *"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Max Mustermann"
            required
          />
          <Input
            id="guestEmail"
            label="E-Mail *"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="max@beispiel.de"
            required
          />
          <Input
            id="guestPhone"
            label="Telefon *"
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            placeholder="+49 123 456 7890"
            required
          />
          <div className="w-full">
            <label htmlFor="specialRequests" className="block text-sm font-medium text-foreground mb-1">
              Besondere Wünsche
            </label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="z.B. späte Anreise, Kinderbett..."
              rows={3}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-destructive rounded-lg p-4 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || nights === 0}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner className="h-5 w-5" /> Wird verarbeitet...
          </span>
        ) : (
          `Jetzt buchen – ${nights > 0 ? formatCurrency(totalPrice) : ""}`
        )}
      </Button>
    </form>
  );
}
