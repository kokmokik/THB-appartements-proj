import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Users, BedDouble, Ruler } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import HeroSection from "@/components/layout/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";
import ProofSection from "@/components/layout/ProofSection";
import ContactSection from "@/components/layout/ContactSection";
import FAQSection from "@/components/layout/FAQSection";

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="bg-[#0a0a0a]">
      <HeroSection />
      <FeaturesSection />

      {/* Properties */}
      <section className="py-24 bg-[#1a1a1a] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Unsere Unterkünfte</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Wählen Sie aus unseren 3 Zimmern und 2 Apartments die perfekte Unterkunft für Ihren Aufenthalt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {properties.map((property) => (
              <Link key={property.id} href={`/unterkuenfte/${property.slug}`} className="group">
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.thumbnail}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
                        {property.type === "apartment" ? "Apartment" : "Zimmer"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">{property.shortDesc}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={13} /> {property.maxGuests} Gäste
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble size={13} /> {property.bedrooms} Schlafzimmer
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler size={13} /> {property.size} m²
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">
                        {formatCurrency(property.pricePerNight)}
                        <span className="text-sm font-normal text-white/40"> / Nacht</span>
                      </span>
                      <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">
                        Jetzt buchen →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/unterkuenfte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.15] text-white/80 text-sm font-medium hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
            >
              Alle Unterkünfte ansehen
            </Link>
          </div>
        </div>
      </section>

      <ProofSection />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
