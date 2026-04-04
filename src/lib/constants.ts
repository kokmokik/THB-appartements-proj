export const SITE_NAME = "THB Appartements";
export const SITE_DESCRIPTION =
  "Gemütliche Zimmer und Apartments für Ihren perfekten Aufenthalt. Jetzt online buchen!";
export const SITE_URL = "https://thb-appartements.de";

export const NAV_LINKS = [
  { label: "Startseite", href: "/" },
  { label: "Unterkünfte", href: "/unterkuenfte" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export const FOOTER_LINKS = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Buchungen", href: "/admin/buchungen" },
  { label: "Kalender", href: "/admin/kalender" },
] as const;

export const AMENITY_LABELS: Record<string, string> = {
  wifi: "WLAN",
  kitchen: "Küche",
  parking: "Parkplatz",
  tv: "Fernseher",
  aircon: "Klimaanlage",
  heating: "Heizung",
  washer: "Waschmaschine",
  balcony: "Balkon",
  garden: "Garten",
  pool: "Pool",
  towels: "Handtücher",
  linens: "Bettwäsche",
  iron: "Bügeleisen",
  hairdryer: "Föhn",
  workspace: "Arbeitsplatz",
  breakfast: "Frühstück",
  minibar: "Minibar",
  safe: "Safe",
  shower: "Dusche",
  bathtub: "Badewanne",
};

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  confirmed: "Bestätigt",
  cancelled: "Storniert",
  completed: "Abgeschlossen",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: "Unbezahlt",
  deposit_paid: "Anzahlung bezahlt",
  paid: "Bezahlt",
  refunded: "Erstattet",
};
