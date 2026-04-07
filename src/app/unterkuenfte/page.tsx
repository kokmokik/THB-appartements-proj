import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Users, BedDouble, Ruler } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unterkünfte",
  description: "Entdecken Sie unsere gemütlichen Zimmer und Apartments. Jetzt online buchen!",
};

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  const rooms = properties.filter((p) => p.type === "zimmer");
  const apartments = properties.filter((p) => p.type === "apartment");

  function PropertyGrid({ items }: { items: typeof properties }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((property) => (
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
                    <BedDouble size={13} /> {property.bedrooms}
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
                  <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                    Details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            ← Startseite
          </Link>
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Unsere Unterkünfte</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Finden Sie die perfekte Unterkunft für Ihren Aufenthalt bei uns.
          </p>
        </div>

        {rooms.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Zimmer</h2>
            <PropertyGrid items={rooms} />
          </div>
        )}

        {apartments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Apartments</h2>
            <PropertyGrid items={apartments} />
          </div>
        )}
      </div>
    </div>
  );
}
