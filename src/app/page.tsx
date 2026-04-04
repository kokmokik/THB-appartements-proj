import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/property/PropertyCard";
import { prisma } from "@/lib/db";
import { MapPin, Star, Phone } from "lucide-react";

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary-dark to-secondary text-white py-24 md:py-36">
        <div className="absolute inset-0 bg-black/20" />
        <Container className="relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Willkommen bei THB Appartements
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Gemütliche Zimmer und Apartments für Ihren perfekten Aufenthalt.
            Entspannen Sie sich und fühlen Sie sich wie zu Hause.
          </p>
          <Link href="/unterkuenfte">
            <Button size="lg" className="text-lg">
              Unterkünfte entdecken
            </Button>
          </Link>
        </Container>
      </section>

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

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Das sagen unsere Gäste
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria S.",
                text: "Ein wunderbarer Aufenthalt! Das Apartment war sauber, gemütlich und perfekt ausgestattet. Wir kommen gerne wieder!",
              },
              {
                name: "Thomas K.",
                text: "Hervorragende Lage und freundlicher Service. Das Zimmer hat unsere Erwartungen übertroffen. Sehr empfehlenswert!",
              },
              {
                name: "Familie Weber",
                text: "Das Familien-Apartment war ideal für uns. Die Kinder hatten genug Platz und die Küche war bestens ausgestattet.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl p-6 border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted text-sm mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-semibold text-sm">{testimonial.name}</p>
              </div>
            ))}
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
