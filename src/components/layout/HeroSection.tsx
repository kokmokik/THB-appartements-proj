import Link from "next/link";
import Image from "next/image";
import { Circle, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface HeroProperty {
  slug: string;
  name: string;
  type: string;
  shortDesc: string;
  thumbnail: string;
  pricePerNight: number;
}

export default function HeroSection({ properties }: { properties: HeroProperty[] }) {
  return (
    <AuroraBackground className="min-h-screen">
      {/* z-10 ensures all content sits above the aurora layer */}
      <div className="relative z-10 w-full container mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Two-column grid: left = text, right = property cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: title + badge + description + buttons */}
          <div className="text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.10] mb-4">
              <Circle className="h-2 w-2 fill-[#c9950a]/80 shrink-0" />
              <span className="text-sm text-white/60 tracking-wide">THB Appartements</span>
            </div>

            {/* Title — Oswald, compact, right above the description */}
            <h1
              className="text-3xl md:text-4xl font-bold tracking-widest uppercase mb-3"
              style={{ color: "rgb(212, 175, 55)", fontFamily: "var(--font-oswald)" }}
            >
              THB APPARTEMENTS
            </h1>

            <p className="text-base sm:text-lg text-white/50 mb-8 leading-relaxed font-light max-w-md mx-auto lg:mx-0">
              Drei gemütliche Zimmer und zwei Apartments in Ebenhofen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/unterkuenfte"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-background font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg text-center"
              >
                Unterkünfte entdecken
              </Link>
              <a
                href="#kontakt"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.15] text-white/80 font-medium text-sm hover:bg-white/[0.10] transition-colors text-center"
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
                {properties.map((property) => (
                  <Link key={property.slug} href={`/unterkuenfte/${property.slug}`} className="block group">
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
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}
