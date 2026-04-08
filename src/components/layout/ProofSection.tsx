const stats = [
  { value: "3+", label: "Zimmer & Apartments" },
  { value: "100%", label: "Online buchbar" },
  { value: "24/7", label: "Erreichbar" },
];

export default function ProofSection() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vertrauen Sie uns
          </h2>
          <p className="text-white/60 text-base md:text-lg">Unsere Zahlen sprechen für sich</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
