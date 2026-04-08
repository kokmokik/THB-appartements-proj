import { MapPin, Star, HeartHandshake, LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MapPin,
    title: "Beste Lage",
    description: "Zentral gelegen mit bester Anbindung an öffentliche Verkehrsmittel und Sehenswürdigkeiten.",
  },
  {
    icon: Star,
    title: "Höchster Komfort",
    description: "Modernes Ambiente mit gemütlicher Atmosphäre — damit Sie sich wie zu Hause fühlen.",
  },
  {
    icon: HeartHandshake,
    title: "Persönlicher Service",
    description: "Wir sind jederzeit für Sie da und sorgen dafür, dass Ihr Aufenthalt perfekt wird.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2a2a2a_0%,transparent_70%)] opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Warum THB Appartements?
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Alles, was Sie für einen angenehmen Aufenthalt benötigen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6"
            >
              <div className="mb-4"><feature.icon className="w-8 h-8 text-[#c9950a]" /></div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
