"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Building2, Phone, CalendarDays, Menu, X } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Startseite", href: "/", icon: Home },
  { label: "Unterkünfte", href: "/unterkuenfte", icon: Building2 },
  { label: "Kontakt", href: "/#kontakt", icon: Phone },
] as const;

function DockLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5",
        active ? "bg-white/10" : "hover:bg-white/5"
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg ring-1 transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg",
          active
            ? "bg-white/15 ring-white/30 shadow-md"
            : "bg-gradient-to-b from-neutral-700/60 to-neutral-800/70 ring-white/10 group-hover:ring-white/20"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            active ? "text-white" : "text-white/65 group-hover:text-white/90"
          )}
          strokeWidth={2.1}
        />
      </div>
      <span
        className={cn(
          "text-[10px] font-medium tracking-wide",
          active ? "text-white/90" : "text-white/50 group-hover:text-white/75"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-neutral-900/90 backdrop-blur-md border-b border-white/8 shadow-xl">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-sm font-bold text-white/90 sm:text-base shrink-0">
          {SITE_NAME}
        </Link>

        {/* Desktop dock nav */}
        <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, icon, label }) => (
            <DockLink
              key={href}
              href={href}
              icon={icon}
              label={label}
              active={pathname === href}
            />
          ))}
          <span className="mx-3 h-8 w-px bg-white/10" aria-hidden="true" />
          <Link
            href="/unterkuenfte"
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/25"
          >
            <CalendarDays size={14} strokeWidth={2.3} />
            Jetzt buchen
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg bg-white/8 text-white/75 hover:bg-white/12 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Navigation öffnen"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8">
          <div className="flex flex-col px-4 py-3 gap-1 max-w-7xl mx-auto">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={17} strokeWidth={2.1} />
                {label}
              </Link>
            ))}
            <Link
              href="/unterkuenfte"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 mt-1 bg-cyan-500 text-slate-950 font-semibold px-4 py-3 rounded-xl text-sm hover:bg-cyan-400 transition-colors"
            >
              <CalendarDays size={15} strokeWidth={2.3} />
              Jetzt buchen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
