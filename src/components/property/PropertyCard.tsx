import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { Users, BedDouble, Ruler } from "lucide-react";

interface PropertyCardProps {
  slug: string;
  name: string;
  type: string;
  shortDesc: string;
  thumbnail: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  size: number;
}

export default function PropertyCard({
  slug,
  name,
  type,
  shortDesc,
  thumbnail,
  pricePerNight,
  maxGuests,
  bedrooms,
  size,
}: PropertyCardProps) {
  return (
    <Link href={`/unterkuenfte/${slug}`}>
      <Card className="group hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={thumbnail}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={type === "apartment" ? "info" : "default"}>
              {type === "apartment" ? "Apartment" : "Zimmer"}
            </Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted text-sm mb-4 flex-1">{shortDesc}</p>
          <div className="flex items-center gap-4 text-sm text-muted mb-3">
            <span className="flex items-center gap-1">
              <Users size={16} /> {maxGuests}
            </span>
            <span className="flex items-center gap-1">
              <BedDouble size={16} /> {bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={16} /> {size} m&sup2;
            </span>
          </div>
          <div className="text-lg font-bold text-primary">
            {formatCurrency(pricePerNight)}{" "}
            <span className="text-sm font-normal text-muted">/ Nacht</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
