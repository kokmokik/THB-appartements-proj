"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: "easeOut",
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function fadeUpProps(i: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" as const },
  };
}

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] w-full flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a2a5a]/[0.15] via-transparent to-[#5a3a2a]/[0.15] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[#5a3a7a]/[0.25]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[#7a4a3a]/[0.25]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#4a3a6a]/[0.25]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            {...fadeUpProps(0)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-[#7a5a4a]/80" />
            <span className="text-sm text-white/60 tracking-wide">THB Appartements</span>
          </motion.div>

          <motion.div {...fadeUpProps(1)}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Ihr perfekter
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a4a7a] via-white/90 to-[#7a5a4a]">
                Aufenthalt wartet
              </span>
            </h1>
          </motion.div>

          <motion.div {...fadeUpProps(2)}>
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Drei gemütliche Zimmer und zwei moderne Apartments — vollständig eingerichtet für einen unvergesslichen Aufenthalt.
            </p>
          </motion.div>

          <motion.div
            {...fadeUpProps(3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/unterkuenfte"
              className="px-8 py-3.5 rounded-full bg-white text-[#1a1a1a] font-semibold text-sm hover:bg-white/90 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
            >
              Unterkünfte entdecken
            </Link>
            <Link
              href="/#kontakt"
              className="px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.15] text-white/80 font-medium text-sm hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
            >
              Kontakt aufnehmen
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/80 pointer-events-none" />
    </div>
  );
}
