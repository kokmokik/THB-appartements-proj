"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Sind Haustiere erlaubt?",
    answer:
      "Kleine Haustiere sind nach vorheriger Absprache willkommen. Bitte kontaktieren Sie uns vor der Buchung.",
  },
  {
    question: "Wie funktioniert die Online-Buchung?",
    answer:
      "Online Buchung ist für Ferienwohunungen verfügbar. Für dauerhaftes vermieten der Wohnungen werden sie in Kontakt mit dem Vermieter gebracht",
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
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Häufige Fragen
          </h2>
          <p className="text-white/60 text-lg">
            Antworten auf die häufigsten Fragen zu unseren Unterkünften
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/[0.04] transition-all gap-4"
              >
                <span className="text-white font-medium text-sm sm:text-base">{faq.question}</span>
                <span className="text-white/50 text-xl shrink-0 select-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
