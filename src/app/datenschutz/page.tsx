import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <Container className="py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
        Datenschutzerklärung
      </h1>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
          <p className="text-muted text-sm leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Datenerfassung auf dieser Website</h2>
          <h3 className="text-lg font-medium mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
            können Sie dem Impressum dieser Website entnehmen.
          </p>
          <h3 className="text-lg font-medium mb-2">Wie erfassen wir Ihre Daten?</h3>
          <p className="text-muted text-sm leading-relaxed">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. über das Buchungsformular).
            Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. Browser, Betriebssystem, Uhrzeit).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Buchung und Zahlungsabwicklung</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Bei einer Buchung erheben wir folgende Daten: Name, E-Mail-Adresse, Telefonnummer, gewünschter
            Aufenthaltszeitraum und ggf. besondere Wünsche. Diese Daten werden zur Durchführung der Buchung
            und Vertragsabwicklung verwendet.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe (Stripe Inc., 510 Townsend Street,
            San Francisco, CA 94103, USA). Stripe verarbeitet Ihre Zahlungsdaten gemäß deren eigener Datenschutzrichtlinie.
            Wir speichern keine Kreditkartendaten auf unseren Servern.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Ihre Rechte</h2>
          <p className="text-muted text-sm leading-relaxed">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer
            gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
            dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
            diese jederzeit widerrufen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
            jederzeit an uns wenden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Hosting</h2>
          <p className="text-muted text-sm leading-relaxed">
            Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten,
            die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
            es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
            Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Kontakt</h2>
          <p className="text-muted text-sm leading-relaxed">
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden
            personenbezogenen Daten zum Zwecke der Bearbeitung bei uns gespeichert. Diese Daten geben wir nicht
            ohne Ihre Einwilligung weiter.
          </p>
        </section>
      </div>
    </Container>
  );
}
