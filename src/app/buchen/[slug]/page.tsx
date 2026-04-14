import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import RentalInquiryForm from "@/components/booking/RentalInquiryForm";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            ← Startseite
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {property.type === "apartment" ? `${property.name} mieten` : `${property.name} buchen`}
        </h1>
        <p className="text-white/50 mb-10">
          {property.type === "apartment"
            ? "Füllen Sie das Formular aus, um eine Mietanfrage zu senden. Wir melden uns für alle weiteren Details bei Ihnen."
            : "Wählen Sie Ihre Reisedaten und füllen Sie das Formular aus. Wir melden uns zur Bestätigung bei Ihnen."}
        </p>

        {property.type === "apartment" ? (
          <RentalInquiryForm
            propertyId={property.id}
            propertyName={property.name}
          />
        ) : (
          <BookingForm
            propertyId={property.id}
            propertySlug={property.slug}
            propertyName={property.name}
            pricePerNight={property.pricePerNight}
            maxGuests={property.maxGuests}
          />
        )}
      </div>
    </div>
  );
}
