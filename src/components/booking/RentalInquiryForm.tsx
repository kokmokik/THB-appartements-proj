"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { createRentalInquiry } from "@/actions/rental";

const DURATION_OPTIONS = [
  { value: "6-monate", label: "6 Monate" },
  { value: "1-jahr", label: "1 Jahr" },
  { value: "2-jahre", label: "2 Jahre" },
  { value: "unbefristet", label: "Unbefristet / nach Vereinbarung" },
];

interface RentalInquiryFormProps {
  propertyId: string;
  propertyName: string;
}

export default function RentalInquiryForm({ propertyId, propertyName }: RentalInquiryFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState("1-jahr");
  const [occupants, setOccupants] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!moveInDate) {
      setError("Bitte geben Sie einen gewünschten Einzugstermin an.");
      return;
    }

    setLoading(true);

    const result = await createRentalInquiry({
      propertyId,
      name,
      email,
      phone,
      moveInDate,
      duration,
      occupants,
      message: message || undefined,
    });

    if (result.success && result.inquiryId) {
      router.push(`/buchung/mietanfrage?id=${result.inquiryId}`);
    } else {
      setError(result.error || "Ein Fehler ist aufgetreten.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Move-in date */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Gewünschter Einzugstermin</h2>
        <input
          type="date"
          value={moveInDate}
          onChange={(e) => setMoveInDate(e.target.value)}
          min={today}
          required
          className="w-full md:w-64 rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors [color-scheme:dark]"
        />
      </div>

      {/* Duration */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Gewünschte Mietdauer</h2>
        <div className="flex flex-wrap gap-3">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDuration(opt.value)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                duration === opt.value
                  ? "border-white/50 bg-white/10 text-white"
                  : "border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.07]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Occupants */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Personen im Haushalt</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOccupants((n) => Math.max(1, n - 1))}
            className="w-10 h-10 rounded-full border border-white/[0.15] flex items-center justify-center hover:bg-white/[0.08] text-white/70 transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="text-2xl font-semibold w-8 text-center text-white">{occupants}</span>
          <button
            type="button"
            onClick={() => setOccupants((n) => Math.min(20, n + 1))}
            className="w-10 h-10 rounded-full border border-white/[0.15] flex items-center justify-center hover:bg-white/[0.08] text-white/70 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Personal details */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Persönliche Angaben</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="name"
            label="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            required
          />
          <Input
            id="email"
            label="E-Mail *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max@beispiel.de"
            required
          />
          <Input
            id="phone"
            label="Telefon *"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+49 123 456 7890"
            required
          />
          <div className="w-full">
            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
              Nachricht / Anmerkungen
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="z.B. Haustiere, besondere Anforderungen..."
              rows={3}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
        <p className="text-sm text-white/50">
          Nach Absenden Ihrer Anfrage melden wir uns bei Ihnen, um alle Details zu besprechen und
          den Mietvertrag abzuschließen. Die Zahlung erfolgt vor Ort.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full !bg-white !text-background hover:!bg-white/90 font-semibold"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner className="h-5 w-5" /> Wird gesendet...
          </span>
        ) : (
          "Mietanfrage senden"
        )}
      </Button>
    </form>
  );
}
