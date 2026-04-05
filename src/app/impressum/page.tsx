import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-10">Impressum</h1>

        <div className="space-y-8">
          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Angaben gemäß § 5 TMG</h2>
            {/* ── ERSETZE MIT DEINEN ECHTEN ANGABEN ── */}
            <p className="text-white/60 text-sm leading-relaxed">
              THB Appartements<br />
              Deine Straße und Hausnummer<br />
              PLZ Ort<br />
              Deutschland
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Kontakt</h2>
            {/* ── ERSETZE MIT DEINER ECHTEN TELEFONNUMMER UND E-MAIL ── */}
            <p className="text-white/60 text-sm leading-relaxed">
              Telefon: +49 XXX XXX XXXX<br />
              E-Mail: deine@email.de
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            {/* ── ERSETZE MIT DEINEM VOLLEN NAMEN UND ADRESSE ── */}
            <p className="text-white/60 text-sm leading-relaxed">
              Vorname Nachname<br />
              Deine Straße und Hausnummer<br />
              PLZ Ort
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">EU-Streitschlichtung</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet,
              an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Haftung für Inhalte</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Haftung für Links</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
