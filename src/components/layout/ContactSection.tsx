"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, Copy } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard not available
    }
  };

  return (
    <section id="kontakt" className="py-20 bg-card relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kontakt aufnehmen</h2>
          <p className="text-white/60 text-base md:text-lg">
            Bereit für Ihren Aufenthalt? Schreiben oder rufen Sie uns an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <Mail className="w-8 h-8 text-[#c9950a] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">E-Mail</h3>
            <div className="flex items-center gap-2">
              <a
                href="mailto:info@thb-apartments.de"
                className="text-white/80 hover:text-white transition-colors text-sm break-all"
              >
                info@thb-apartments.de
              </a>
              <button
                onClick={() => handleCopy("info@thb-apartments.de", "email")}
                className="p-1 hover:bg-white/10 rounded transition-colors shrink-0"
                aria-label="E-Mail kopieren"
              >
                {copied === "email" ? (
                  <Check className="w-4 h-4 text-[#c9950a]" />
                ) : (
                  <Copy className="w-4 h-4 text-white/40" />
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <Phone className="w-8 h-8 text-[#c9950a] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Telefon</h3>
            <div className="flex items-center gap-2">
              <a
                href="tel:+4917624896524"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                +49 176 24896524
              </a>
              <button
                onClick={() => handleCopy("+4917624896524", "phone")}
                className="p-1 hover:bg-white/10 rounded transition-colors shrink-0"
                aria-label="Telefon kopieren"
              >
                {copied === "phone" ? (
                  <Check className="w-4 h-4 text-[#c9950a]" />
                ) : (
                  <Copy className="w-4 h-4 text-white/40" />
                )}
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <MapPin className="w-8 h-8 text-[#c9950a] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Adresse</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Schwabenstrasse 13<br />
              87640 Ebenhofen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
