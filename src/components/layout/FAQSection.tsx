"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Sind Haustiere erlaubt?",
    answer:
      "Kleine Haustiere sind nach vorheriger Absprache willkommen. Bitte kontaktieren Sie uns vor der Buchung.",
  },
  {
    question: "Wie funktioniert die Online-Buchung?",
    answer:
      "Wählen Sie Ihre gewünschte Unterkunft, tragen Sie Ihre Reisedaten und Kontaktdaten ein und senden Sie die Anfrage ab. Wir melden uns dann schnellstmöglich bei Ihnen zur Bestätigung.",
  },
  {
    question: "Was passiert bei einer Stornierung?",
    answer:
      "Unsere Stornierungsbedingungen entnehmen Sie bitte dem jeweiligen Unterkunftsangebot. Bei Fragen helfen wir Ihnen gerne weiter.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[var(--background)] relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Häufige Fragen
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Antworten auf die häufigsten Fragen zu unseren Unterkünften
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/[0.04] transition-colors gap-4"
              >
                <span className="text-white font-medium text-sm sm:text-base">{faq.question}</span>
                <span className="text-white/50 text-xl shrink-0 select-none leading-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
