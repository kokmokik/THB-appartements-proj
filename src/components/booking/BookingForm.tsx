"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMonths, startOfDay } from "date-fns";
import {
  CalendarDate,
  getLocalTimeZone,
} from "@internationalized/date";
import type { RangeValue, DateValue } from "react-aria-components";
import { RangeCalendar } from "@/components/ui/calendar-rac";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { createBooking } from "@/actions/bookings";
import { getBlockedDatesForProperty } from "@/actions/availability";
import { Minus, Plus } from "lucide-react";

function toCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function toJsDate(date: DateValue): Date {
  return date.toDate(getLocalTimeZone());
}

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
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null);
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
    dateRange?.start && dateRange?.end
      ? calculateNights(toJsDate(dateRange.start), toJsDate(dateRange.end))
      : 0;
  const totalPrice = nights * pricePerNight;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!dateRange?.start || !dateRange?.end) {
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
      checkIn: toJsDate(dateRange.start).toISOString(),
      checkOut: toJsDate(dateRange.end).toISOString(),
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
        <h2 className="text-xl font-semibold text-white mb-4">Reisedaten wählen</h2>
        <div className="flex justify-center overflow-x-auto">
          <RangeCalendar
            value={dateRange}
            onChange={setDateRange}
            minValue={toCalendarDate(today)}
            maxValue={toCalendarDate(maxDate)}
            isDateUnavailable={(date) =>
              blockedDates.some(
                (d) =>
                  d.getFullYear() === date.year &&
                  d.getMonth() + 1 === date.month &&
                  d.getDate() === date.day,
              )
            }
            visibleDuration={{ months: 2 }}
            pageBehavior="visible"
            className="border border-white/[0.08] rounded-xl p-4 bg-white/[0.03]"
          />
        </div>
      </div>

      {/* Guest Count */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Anzahl der Gäste</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-10 h-10 rounded-full border border-white/[0.15] flex items-center justify-center hover:bg-white/[0.08] text-white/70 transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="text-2xl font-semibold w-8 text-center text-white">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
            className="w-10 h-10 rounded-full border border-white/[0.15] flex items-center justify-center hover:bg-white/[0.08] text-white/70 transition-colors"
          >
            <Plus size={18} />
          </button>
          <span className="text-white/40 text-sm">(max. {maxGuests})</span>
        </div>
      </div>

      {/* Price Summary */}
      {nights > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-3">Preisübersicht</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>{formatCurrency(pricePerNight)} x {nights} Nächte</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/[0.08] text-white">
              <span>Gesamt</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Personal Details */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Persönliche Angaben</h2>
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
            <label htmlFor="specialRequests" className="block text-sm font-medium text-white/80 mb-1">
              Besondere Wünsche
            </label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="z.B. späte Anreise, Kinderbett..."
              rows={3}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full !bg-white !text-background hover:!bg-white/90 font-semibold"
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
