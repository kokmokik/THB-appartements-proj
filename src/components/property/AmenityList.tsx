import {
  Wifi,
  Tv,
  Flame,
  Snowflake,
  WashingMachine,
  Bath,
  ShowerHead,
  UtensilsCrossed,
  Car,
  Flower2,
  Waves,
  Briefcase,
  Coffee,
  Wine,
  Lock,
  Shirt,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { AMENITY_LABELS } from "@/lib/constants";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  tv: Tv,
  heating: Flame,
  aircon: Snowflake,
  washer: WashingMachine,
  bathtub: Bath,
  shower: ShowerHead,
  kitchen: UtensilsCrossed,
  parking: Car,
  garden: Flower2,
  pool: Waves,
  workspace: Briefcase,
  breakfast: Coffee,
  minibar: Wine,
  safe: Lock,
  iron: Shirt,
  hairdryer: Wind,
  towels: Bath,
  linens: Bath,
  balcony: Flower2,
};

export default function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {amenities.map((amenity) => {
        const Icon = AMENITY_ICONS[amenity] || Briefcase;
        const label = AMENITY_LABELS[amenity] || amenity;
        return (
          <div key={amenity} className="flex items-center gap-2 text-sm text-white/70">
            <Icon size={18} className="text-white/40 shrink-0" />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
