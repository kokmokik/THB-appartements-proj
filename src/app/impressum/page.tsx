import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <Container className="py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
        Impressum
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            THB Appartements<br />
            Musterstraße 1<br />
            12345 Musterstadt<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
          <p>
            Telefon: +49 123 456 7890<br />
            E-Mail: info@thb-appartements.de
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            [Name des Verantwortlichen]<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">EU-Streitschlichtung</h2>
          <p className="text-muted text-sm leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet,
            an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Haftung für Inhalte</h2>
          <p className="text-muted text-sm leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Haftung für Links</h2>
          <p className="text-muted text-sm leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </section>
      </div>
    </Container>
  );
}
