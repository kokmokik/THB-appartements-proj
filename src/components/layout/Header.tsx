"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary">
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/unterkuenfte"
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Jetzt buchen
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Navigation öffnen"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <Container className="py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/unterkuenfte"
              className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
              onClick={() => setMobileOpen(false)}
            >
              Jetzt buchen
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
