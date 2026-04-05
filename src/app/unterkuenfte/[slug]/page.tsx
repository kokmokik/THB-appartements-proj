import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyGallery from "@/components/property/PropertyGallery";
import AmenityList from "@/components/property/AmenityList";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { Users, BedDouble, Bath, Ruler } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });
  if (!property) return { title: "Nicht gefunden" };
  return { title: property.name, description: property.shortDesc };
}

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });

  if (!property) notFound();

  const images: string[] = JSON.parse(property.images);
  const amenities: string[] = JSON.parse(property.amenities);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <PropertyGallery images={images} name={property.name} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white/80 mb-3">
                {property.type === "apartment" ? "Apartment" : "Zimmer"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{property.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm mb-6">
                <span className="flex items-center gap-2">
                  <Users size={16} /> Bis zu {property.maxGuests} Gäste
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble size={16} /> {property.bedrooms} Schlafzimmer
                </span>
                <span className="flex items-center gap-2">
                  <Bath size={16} /> {property.bathrooms} Badezimmer
                </span>
                <span className="flex items-center gap-2">
                  <Ruler size={16} /> {property.size} m²
                </span>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Beschreibung</h2>
              <p className="text-white/60 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Ausstattung</h2>
              <AmenityList amenities={amenities} />
            </div>
          </div>

          {/* Booking sidebar */}
          <div>
            <div className="sticky top-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(property.pricePerNight)}
              </div>
              <p className="text-white/40 text-sm mb-6">pro Nacht</p>

              <Link
                href={`/buchen/${property.slug}`}
                className="block w-full text-center py-3.5 rounded-xl bg-white text-[#0a0a0a] font-semibold hover:bg-white/90 transition-all"
              >
                Jetzt buchen
              </Link>

              <p className="text-xs text-white/30 text-center mt-3">
                Kostenlose Stornierung bis 48 Stunden vor Anreise
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
