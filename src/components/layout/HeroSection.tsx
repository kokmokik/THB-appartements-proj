"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface HeroProperty {
  slug: string;
  name: string;
  type: string;
  shortDesc: string;
  thumbnail: string;
  pricePerNight: number;
}

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay }}
      className={cn("absolute hidden md:block", className)}
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border border-white/[0.10]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection({ properties }: { properties: HeroProperty[] }) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex items-center overflow-hidden bg-card">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b5e20]/20 via-transparent to-[#2e7d32]/10 pointer-events-none" />

      {/* Decorative shapes — desktop only, purely cosmetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={12}
          gradient="from-[#2e7d32]/[0.20]"
          className="left-[-8%] top-[18%]"
        />
        <ElegantShape
          delay={0.7}
          width={420}
          height={100}
          rotate={-14}
          gradient="from-[#4caf50]/[0.18]"
          className="right-[-4%] bottom-[20%]"
        />
      </div>

      {/* Main content — no opacity animations, always visible */}
      <div className="relative z-10 w-full container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.10] mb-6">
              <Circle className="h-2 w-2 fill-[#c9950a]/80 shrink-0" />
              <span className="text-sm text-white/60 tracking-wide">THB Appartements</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Ihr perfekter
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c9950a] via-[#e8c96a] to-[#a37808]">
                Aufenthalt wartet
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 mb-8 leading-relaxed font-light max-w-md mx-auto lg:mx-0">
              Drei gemütliche Zimmer und zwei Apartments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/unterkuenfte"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-card font-semibold text-sm hover:bg-white/90 transition-all shadow-lg text-center"
              >
                Unterkünfte entdecken
              </Link>
              <a
                href="#kontakt"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.15] text-white/80 font-medium text-sm hover:bg-white/[0.10] transition-all text-center"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>

          {/* Right: property preview cards */}
          {properties.length > 0 && (
            <>
              {/* Mobile: horizontal swipe row */}
              <div className="flex lg:hidden gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4">
                {properties.map((property) => (
                  <Link
                    key={property.slug}
                    href={`/unterkuenfte/${property.slug}`}
                    className="block group shrink-0 w-[78vw] snap-center"
                  >
                    <div className="relative h-44 rounded-xl overflow-hidden border border-white/[0.10]">
                      <Image
                        src={property.thumbnail}
                        alt={property.name}
                        fill
                        className="object-cover"
                        sizes="80vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-white font-semibold text-sm leading-tight truncate">{property.name}</p>
                          <p className="text-white/50 text-xs mt-0.5 truncate">{property.shortDesc}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-white/70 text-xs font-medium whitespace-nowrap">
                            {property.type === "apartment" ? "Mieten" : `ab ${formatCurrency(property.pricePerNight)}`}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                            <ArrowRight size={12} className="text-white/70" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop: vertical stack */}
              <div className="hidden lg:flex flex-col gap-3">
                {properties.map((property, i) => (
                  <motion.div
                    key={property.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  >
                    <Link href={`/unterkuenfte/${property.slug}`} className="block group">
                      <div className="relative h-40 rounded-xl overflow-hidden border border-white/[0.10]">
                        <Image
                          src={property.thumbnail}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm leading-tight truncate">{property.name}</p>
                            <p className="text-white/50 text-xs mt-0.5 truncate">{property.shortDesc}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-white/70 text-xs font-medium whitespace-nowrap">
                              {property.type === "apartment" ? "Mieten" : `ab ${formatCurrency(property.pricePerNight)}`}
                            </span>
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                              <ArrowRight size={12} className="text-white/70" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
