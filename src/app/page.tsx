import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/property/PropertyCard";
import LampHero from "@/components/layout/LampHero";
import { prisma } from "@/lib/db";
import { MapPin, Star, Phone } from "lucide-react";

// ─── YOUR REAL REVIEWS ──────────────────────────────────────────────────────
// To add reviews, create a const below and add a Testimonials section.
// Example:
//
// const REVIEWS = [
//   { name: "Max M.", stars: 5, text: "Sehr schönes Zimmer, sehr empfehlenswert!" },
//   { name: "Anna K.", stars: 5, text: "Tolles Apartment, top Lage!" },
// ];
//
// Then add a <section> with the reviews in the JSX below (copy the pattern
// from the other sections). Ask Claude to add it when you have real reviews.
// ────────────────────────────────────────────────────────────────────────────

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <LampHero />

      {/* Properties Overview */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Unsere Unterkünfte
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Wählen Sie aus unseren 3 Zimmern und 2 Apartments die perfekte Unterkunft für Ihren Aufenthalt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
        </Container>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-accent/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Warum THB Appartements?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Beste Lage</h3>
              <p className="text-muted text-sm">
                Zentral gelegen mit guter Anbindung an öffentliche Verkehrsmittel und Sehenswürdigkeiten.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Höchster Komfort</h3>
              <p className="text-muted text-sm">
                Modern eingerichtete Unterkünfte mit allem, was Sie für einen angenehmen Aufenthalt benötigen.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Persönlicher Service</h3>
              <p className="text-muted text-sm">
                Wir sind jederzeit für Sie da und sorgen dafür, dass Ihr Aufenthalt perfekt wird.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="kontakt" className="py-16 bg-primary text-white">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Bereit für Ihren Aufenthalt?
          </h2>
          <p className="text-lg text-primary-light mb-8 max-w-xl mx-auto">
            Buchen Sie jetzt Ihre Unterkunft und freuen Sie sich auf einen unvergesslichen Aufenthalt.
          </p>
          <Link href="/unterkuenfte">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Jetzt buchen
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
