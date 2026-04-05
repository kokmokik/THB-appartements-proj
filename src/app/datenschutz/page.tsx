import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-10">Datenschutzerklärung</h1>

        <div className="space-y-6">
          {[
            {
              title: "1. Datenschutz auf einen Blick",
              text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
            },
            {
              title: "2. Datenerfassung auf dieser Website",
              text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. über das Buchungsformular). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. Browser, Betriebssystem, Uhrzeit).",
            },
            {
              title: "3. Buchung und Zahlungsabwicklung",
              text: "Bei einer Buchung erheben wir folgende Daten: Name, E-Mail-Adresse, Telefonnummer, gewünschter Aufenthaltszeitraum und ggf. besondere Wünsche. Diese Daten werden zur Durchführung der Buchung und Vertragsabwicklung verwendet. Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe (Stripe Inc., 510 Townsend Street, San Francisco, CA 94103, USA). Stripe verarbeitet Ihre Zahlungsdaten gemäß deren eigener Datenschutzrichtlinie. Wir speichern keine Kreditkartendaten auf unseren Servern.",
            },
            {
              title: "4. Ihre Rechte",
              text: "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit widerrufen.",
            },
            {
              title: "5. Hosting",
              text: "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.",
            },
            {
              title: "6. Kontakt",
              text: "Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
            },
          ].map((section) => (
            <section key={section.title} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
