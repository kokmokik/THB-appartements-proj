import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/booking/BookingForm";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });
  if (!property) return { title: "Nicht gefunden" };
  return {
    title: `${property.name} buchen`,
    description: `Buchen Sie ${property.name} online. Ab ${property.pricePerNight}€ pro Nacht.`,
  };
}

export default async function BookingPage({ params }: Props) {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });

  if (!property) notFound();

  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
        {property.name} buchen
      </h1>
      <p className="text-muted mb-8">
        Wählen Sie Ihre Reisedaten und füllen Sie das Formular aus, um Ihre Buchung abzuschließen.
      </p>

      <BookingForm
        propertyId={property.id}
        propertySlug={property.slug}
        propertyName={property.name}
        pricePerNight={property.pricePerNight}
        maxGuests={property.maxGuests}
      />
    </Container>
  );
}
