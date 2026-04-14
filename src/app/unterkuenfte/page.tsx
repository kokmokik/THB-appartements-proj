import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Users, BedDouble, Ruler } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unterkünfte",
  description: "Entdecken Sie unsere gemütlichen Zimmer und Apartments. Jetzt online buchen!",
};

type OccupancyStatus =
  | { occupied: false }
  | { occupied: true; freeFrom: Date | null };

function getApartmentEndDate(moveInDate: Date, duration: string): Date | null {
  const d = new Date(moveInDate);
  switch (duration) {
    case "6-monate": d.setMonth(d.getMonth() + 6); return d;
    case "1-jahr":   d.setFullYear(d.getFullYear() + 1); return d;
    case "2-jahre":  d.setFullYear(d.getFullYear() + 2); return d;
    default:         return null; // unbefristet
  }
}

function OccupancyBadge({ status, type }: { status: OccupancyStatus; type: string }) {
  if (!status.occupied) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/15 border border-green-500/25 text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
        Verfügbar
      </span>
    );
  }

  const label = type === "apartment" ? "Vermietet" : "Belegt";
  const suffix = status.freeFrom
    ? `bis ${formatDate(status.freeFrom)}`
    : "· Langzeitmiete";

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 border border-red-500/25 text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
      {label} {suffix}
    </span>
  );
}

export default async function PropertiesPage() {
  const today = new Date();

  const [properties, activeBookings, confirmedInquiries] = await Promise.all([
    prisma.property.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.booking.findMany({
      where: {
        status: "confirmed",
        checkIn: { lte: today },
        checkOut: { gte: today },
      },
      select: { propertyId: true, checkOut: true },
    }),
    prisma.rentalInquiry.findMany({
      where: { status: "confirmed" },
      select: { propertyId: true, moveInDate: true, duration: true },
    }),
  ]);

  // Build occupancy map
  const occupancyMap = new Map<string, OccupancyStatus>();
  for (const b of activeBookings) {
    occupancyMap.set(b.propertyId, { occupied: true, freeFrom: b.checkOut });
  }
  for (const i of confirmedInquiries) {
    const endDate = getApartmentEndDate(i.moveInDate, i.duration);
    occupancyMap.set(i.propertyId, { occupied: true, freeFrom: endDate });
  }

  const rooms = properties.filter((p) => p.type === "zimmer");
  const apartments = properties.filter((p) => p.type === "apartment");

  function PropertyGrid({ items }: { items: typeof properties }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((property) => {
          const status: OccupancyStatus =
            occupancyMap.get(property.id) ?? { occupied: false };

          return (
            <Link key={property.id} href={`/unterkuenfte/${property.slug}`} className="group">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200 h-full flex flex-col">
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
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                      {property.name}
                    </h3>
                    <OccupancyBadge status={status} type={property.type} />
                  </div>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2 flex-1">{property.shortDesc}</p>
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
          );
        })}
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
