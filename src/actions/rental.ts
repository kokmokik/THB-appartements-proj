"use server";

import { prisma } from "@/lib/db";
import { sendRentalInquiry, sendAdminInquiryNotification } from "@/lib/email";

export interface CreateRentalInquiryResult {
  success: boolean;
  error?: string;
  inquiryId?: string;
}

export async function createRentalInquiry(formData: {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  duration: string;
  occupants: number;
  message?: string;
}): Promise<CreateRentalInquiryResult> {
  try {
    const property = await prisma.property.findUnique({
      where: { id: formData.propertyId },
    });

    if (!property || property.type !== "apartment") {
      return { success: false, error: "Unterkunft nicht gefunden." };
    }

    if (!formData.name || !formData.email || !formData.phone) {
      return { success: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
    }

    if (!formData.moveInDate) {
      return { success: false, error: "Bitte geben Sie einen gewünschten Einzugstermin an." };
    }

    const moveInDate = new Date(formData.moveInDate);
    if (isNaN(moveInDate.getTime()) || moveInDate < new Date()) {
      return { success: false, error: "Bitte geben Sie ein gültiges Einzugsdatum in der Zukunft an." };
    }

    const inquiry = await prisma.rentalInquiry.create({
      data: {
        propertyId: formData.propertyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        moveInDate,
        duration: formData.duration,
        occupants: formData.occupants,
        message: formData.message || null,
        status: "new",
      },
    });

    const inquiryData = {
      name: formData.name,
      email: formData.email,
      propertyName: property.name,
      moveInDate,
      duration: formData.duration,
      occupants: formData.occupants,
      message: formData.message,
      inquiryId: inquiry.id,
    };

    await Promise.all([
      sendRentalInquiry(inquiryData),
      sendAdminInquiryNotification(inquiryData),
    ]);

    return { success: true, inquiryId: inquiry.id };
  } catch (error) {
    console.error("Rental inquiry error:", error);
    return { success: false, error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
  }
}
