import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/property/PropertyCard";
import { prisma } from "@/lib/db";

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

  return (
    <Container className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Unsere Unterkünfte
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Finden Sie die perfekte Unterkunft für Ihren Aufenthalt bei uns.
        </p>
      </div>

      {/* Rooms */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Zimmer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((property) => (
            <PropertyCard
              key={property.id}
              slug={property.slug}
              name={property.name}
              type={property.type}
              shortDesc={property.shortDesc}
              thumbnail={property.thumbnail}
              pricePerNight={property.pricePerNight}
              maxGuests={property.maxGuests}
              bedrooms={property.bedrooms}
              size={property.size}
            />
          ))}
        </div>
      </div>

      {/* Apartments */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Apartments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((property) => (
            <PropertyCard
              key={property.id}
              slug={property.slug}
              name={property.name}
              type={property.type}
              shortDesc={property.shortDesc}
              thumbnail={property.thumbnail}
              pricePerNight={property.pricePerNight}
              maxGuests={property.maxGuests}
              bedrooms={property.bedrooms}
              size={property.size}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
