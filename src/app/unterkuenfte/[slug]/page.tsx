import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
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
  return {
    title: property.name,
    description: property.shortDesc,
  };
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
    <Container className="py-12 md:py-20">
      {/* Gallery */}
      <PropertyGallery images={images} name={property.name} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={property.type === "apartment" ? "info" : "default"}>
                {property.type === "apartment" ? "Apartment" : "Zimmer"}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted mb-6">
              <span className="flex items-center gap-2">
                <Users size={18} /> Bis zu {property.maxGuests} Gäste
              </span>
              <span className="flex items-center gap-2">
                <BedDouble size={18} /> {property.bedrooms} Schlafzimmer
              </span>
              <span className="flex items-center gap-2">
                <Bath size={18} /> {property.bathrooms} Badezimmer
              </span>
              <span className="flex items-center gap-2">
                <Ruler size={18} /> {property.size} m&sup2;
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Beschreibung</h2>
            <p className="text-muted leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Ausstattung</h2>
            <AmenityList amenities={amenities} />
          </div>
        </div>

        {/* Sidebar - Booking card */}
        <div>
          <div className="sticky top-24 bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary mb-1">
              {formatCurrency(property.pricePerNight)}
            </div>
            <p className="text-muted text-sm mb-6">pro Nacht</p>

            <Link href={`/buchen/${property.slug}`}>
              <Button className="w-full" size="lg">
                Jetzt buchen
              </Button>
            </Link>

            <p className="text-xs text-muted text-center mt-3">
              Kostenlose Stornierung bis 48 Stunden vor Anreise
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
