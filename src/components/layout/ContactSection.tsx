"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <section id="kontakt" className="py-24 bg-[#1a1a1a] relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Kontakt aufnehmen</h2>
          <p className="text-white/60 text-lg">
            Bereit für Ihren Aufenthalt? Schreiben oder rufen Sie uns an.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6"
          >
            <Mail className="w-8 h-8 text-[#7a5a4a] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">E-Mail</h3>
            <div className="flex items-center gap-2">
              {/* ── DEINE E-MAIL ── */}
              <a
                href="mailto:deine@email.de"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                deine@email.de
              </a>
              <button
                onClick={() => handleCopy("deine@email.de", "email")}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="E-Mail kopieren"
              >
                {copied === "email" ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/40" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6"
          >
            <Phone className="w-8 h-8 text-[#7a5a4a] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Telefon</h3>
            <div className="flex items-center gap-2">
              {/* ── DEINE TELEFONNUMMER ── */}
              <a
                href="tel:+49XXXXXXXXXX"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                +49 XXX XXX XXXX
              </a>
              <button
                onClick={() => handleCopy("+49XXXXXXXXXX", "phone")}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Telefon kopieren"
              >
                {copied === "phone" ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/40" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6"
          >
            <MapPin className="w-8 h-8 text-[#7a5a4a] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Adresse</h3>
            {/* ── DEINE ADRESSE ── */}
            <p className="text-white/80 text-sm leading-relaxed">
              Deine Straße
              <br />
              PLZ Ort
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
