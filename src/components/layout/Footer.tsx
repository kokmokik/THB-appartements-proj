import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/[0.08] text-white mt-auto">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white/90 mb-4">{SITE_NAME}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Gemütliche Zimmer und Apartments für Ihren perfekten Aufenthalt.
              Wir freuen uns auf Ihren Besuch!
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {/* ── DEINE ADRESSE ── */}
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#7a5a4a] shrink-0" />
                <span>Deine Straße, PLZ Ort</span>
              </li>
              {/* ── DEINE TELEFONNUMMER ── */}
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#7a5a4a] shrink-0" />
                <a href="tel:+49XXXXXXXXXX" className="hover:text-white transition-colors">
                  +49 XXX XXX XXXX
                </a>
              </li>
              {/* ── DEINE E-MAIL ── */}
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#7a5a4a] shrink-0" />
                <a href="mailto:deine@email.de" className="hover:text-white transition-colors">
                  deine@email.de
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
        </div>
      </Container>
    </footer>
  );
}
