import { z } from "zod";

export const bookingFormSchema = z
  .object({
    propertyId: z.string().min(1),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    guests: z.number().min(1, "Mindestens 1 Gast"),
    guestName: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
    guestEmail: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
    guestPhone: z.string().min(5, "Bitte geben Sie Ihre Telefonnummer ein"),
    specialRequests: z.string().optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Abreisedatum muss nach dem Anreisedatum liegen",
    path: ["checkOut"],
  });

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(1, "Passwort ist erforderlich"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
