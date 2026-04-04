export interface PropertyWithParsed {
  id: string;
  slug: string;
  name: string;
  type: "zimmer" | "apartment";
  description: string;
  shortDesc: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  thumbnail: string;
  sortOrder: number;
  active: boolean;
}

export interface BookingWithProperty {
  id: string;
  propertyId: string;
  property: {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
  };
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string | null;
  status: string;
  stripePaymentId: string | null;
  stripeSessionId: string | null;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
