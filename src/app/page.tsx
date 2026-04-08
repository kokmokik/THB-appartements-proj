import HeroSection from "@/components/layout/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";
import ProofSection from "@/components/layout/ProofSection";
import ContactSection from "@/components/layout/ContactSection";
import FAQSection from "@/components/layout/FAQSection";
import { prisma } from "@/lib/db";

export default async function Home() {
  const featuredProperties = await prisma.property.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
    select: {
      slug: true,
      name: true,
      type: true,
      shortDesc: true,
      thumbnail: true,
      pricePerNight: true,
    },
  });

  return (
    <div className="bg-background">
      <HeroSection properties={featuredProperties} />
      <FeaturesSection />
      <ProofSection />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
