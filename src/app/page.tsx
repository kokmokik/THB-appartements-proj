import HeroSection from "@/components/layout/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";
import ProofSection from "@/components/layout/ProofSection";
import ContactSection from "@/components/layout/ContactSection";
import FAQSection from "@/components/layout/FAQSection";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <HeroSection />
      <FeaturesSection />
      <ProofSection />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
