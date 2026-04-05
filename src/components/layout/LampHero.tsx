"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export default function LampHero() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Willkommen bei <br /> THB Appartements
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        className="mt-4 text-center text-gray-400 text-lg md:text-xl max-w-2xl"
      >
        Gemütliche Zimmer und Apartments für Ihren perfekten Aufenthalt.
        Entspannen Sie sich und fühlen Sie sich wie zu Hause.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
        className="mt-8"
      >
        <Link
          href="/unterkuenfte"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
        >
          Unterkünfte entdecken
        </Link>
      </motion.div>
    </LampContainer>
  );
}
