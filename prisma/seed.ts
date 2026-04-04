import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@thb-appartements.de" },
    update: {},
    create: {
      email: "admin@thb-appartements.de",
      password: hashedPassword,
      name: "Administrator",
    },
  });

  // Create properties
  const properties = [
    {
      slug: "zimmer-1",
      name: "Gemütliches Einzelzimmer",
      type: "zimmer",
      description:
        "Unser gemütliches Einzelzimmer bietet Ihnen alles, was Sie für einen erholsamen Aufenthalt benötigen. Mit einem bequemen Einzelbett, einem modernen Badezimmer und einem Arbeitsplatz ist dieses Zimmer ideal für Geschäftsreisende und Alleinreisende. Genießen Sie den Blick aus dem Fenster und starten Sie den Tag mit einem leckeren Frühstück.",
      shortDesc:
        "Perfekt für Alleinreisende – gemütlich, modern und mit allem Komfort ausgestattet.",
      maxGuests: 1,
      bedrooms: 1,
      bathrooms: 1,
      size: 18,
      pricePerNight: 55,
      amenities: JSON.stringify([
        "wifi",
        "tv",
        "heating",
        "towels",
        "linens",
        "hairdryer",
        "workspace",
        "shower",
      ]),
      images: JSON.stringify([
        "/images/properties/zimmer-1/1.jpg",
        "/images/properties/zimmer-1/2.jpg",
        "/images/properties/zimmer-1/3.jpg",
      ]),
      thumbnail: "/images/properties/zimmer-1/1.jpg",
      sortOrder: 1,
    },
    {
      slug: "zimmer-2",
      name: "Komfort-Doppelzimmer",
      type: "zimmer",
      description:
        "Unser Komfort-Doppelzimmer ist die perfekte Wahl für Paare oder Reisende, die etwas mehr Platz wünschen. Das geräumige Zimmer verfügt über ein bequemes Doppelbett, ein modernes Bad mit Dusche und einen gemütlichen Sitzbereich. Kostenloses WLAN und ein Flachbildfernseher sorgen für Unterhaltung.",
      shortDesc:
        "Geräumiges Doppelzimmer mit modernem Komfort – ideal für Paare.",
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      size: 24,
      pricePerNight: 75,
      amenities: JSON.stringify([
        "wifi",
        "tv",
        "heating",
        "towels",
        "linens",
        "hairdryer",
        "workspace",
        "shower",
        "minibar",
        "safe",
      ]),
      images: JSON.stringify([
        "/images/properties/zimmer-2/1.jpg",
        "/images/properties/zimmer-2/2.jpg",
        "/images/properties/zimmer-2/3.jpg",
      ]),
      thumbnail: "/images/properties/zimmer-2/1.jpg",
      sortOrder: 2,
    },
    {
      slug: "zimmer-3",
      name: "Superior-Doppelzimmer mit Balkon",
      type: "zimmer",
      description:
        "Unser Superior-Doppelzimmer bietet Ihnen ein besonderes Erlebnis mit einem eigenen Balkon und herrlichem Ausblick. Das großzügige Zimmer ist elegant eingerichtet und verfügt über ein King-Size-Bett, ein luxuriöses Badezimmer mit Badewanne und Dusche sowie eine Minibar. Der perfekte Rückzugsort für anspruchsvolle Gäste.",
      shortDesc:
        "Elegantes Zimmer mit Balkon und Ausblick – unser Premium-Angebot.",
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      size: 30,
      pricePerNight: 95,
      amenities: JSON.stringify([
        "wifi",
        "tv",
        "heating",
        "aircon",
        "towels",
        "linens",
        "hairdryer",
        "workspace",
        "shower",
        "bathtub",
        "minibar",
        "safe",
        "balcony",
      ]),
      images: JSON.stringify([
        "/images/properties/zimmer-3/1.jpg",
        "/images/properties/zimmer-3/2.jpg",
        "/images/properties/zimmer-3/3.jpg",
      ]),
      thumbnail: "/images/properties/zimmer-3/1.jpg",
      sortOrder: 3,
    },
    {
      slug: "apartment-1",
      name: "Familien-Apartment",
      type: "apartment",
      description:
        "Unser geräumiges Familien-Apartment bietet genügend Platz für die ganze Familie. Mit zwei Schlafzimmern, einer voll ausgestatteten Küche, einem Wohn- und Essbereich sowie einem modernen Badezimmer fühlen Sie sich hier wie zu Hause. Der Balkon lädt zum Entspannen ein und die Waschmaschine sorgt für zusätzlichen Komfort bei längeren Aufenthalten.",
      shortDesc:
        "Geräumiges Apartment mit 2 Schlafzimmern – perfekt für Familien.",
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      size: 55,
      pricePerNight: 120,
      amenities: JSON.stringify([
        "wifi",
        "tv",
        "kitchen",
        "heating",
        "washer",
        "towels",
        "linens",
        "hairdryer",
        "iron",
        "workspace",
        "shower",
        "balcony",
        "parking",
      ]),
      images: JSON.stringify([
        "/images/properties/apartment-1/1.jpg",
        "/images/properties/apartment-1/2.jpg",
        "/images/properties/apartment-1/3.jpg",
        "/images/properties/apartment-1/4.jpg",
      ]),
      thumbnail: "/images/properties/apartment-1/1.jpg",
      sortOrder: 4,
    },
    {
      slug: "apartment-2",
      name: "Premium-Apartment mit Garten",
      type: "apartment",
      description:
        "Unser Premium-Apartment ist das Highlight unseres Angebots. Auf großzügigen 75 Quadratmetern erwarten Sie zwei elegante Schlafzimmer, ein luxuriöses Badezimmer, eine komplett ausgestattete Küche und ein Wohnbereich mit Zugang zum privaten Garten. Ideal für Familien oder Gruppen, die einen unvergesslichen Aufenthalt genießen möchten.",
      shortDesc:
        "Luxuriöses Apartment mit privatem Garten – unser Spitzenangebot.",
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 2,
      size: 75,
      pricePerNight: 150,
      amenities: JSON.stringify([
        "wifi",
        "tv",
        "kitchen",
        "heating",
        "aircon",
        "washer",
        "towels",
        "linens",
        "hairdryer",
        "iron",
        "workspace",
        "shower",
        "bathtub",
        "garden",
        "parking",
        "safe",
      ]),
      images: JSON.stringify([
        "/images/properties/apartment-2/1.jpg",
        "/images/properties/apartment-2/2.jpg",
        "/images/properties/apartment-2/3.jpg",
        "/images/properties/apartment-2/4.jpg",
      ]),
      thumbnail: "/images/properties/apartment-2/1.jpg",
      sortOrder: 5,
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: property,
      create: property,
    });
  }

  console.log("Seed completed: 1 admin user + 5 properties created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
