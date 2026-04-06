import { Resend } from "resend";
import { formatDate, formatCurrency, calculateNights } from "./utils";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  propertyName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  bookingId: string;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const nights = calculateNights(data.checkIn, data.checkOut);

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Buchungsbestätigung</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;padding:36px 40px;text-align:center;">
              <p style="margin:0;color:#c9a96e;font-size:13px;letter-spacing:3px;text-transform:uppercase;">THB Appartements</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:normal;">Buchungsbestätigung</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:36px 40px 24px;">
              <p style="margin:0;font-size:16px;color:#333;line-height:1.6;">
                Sehr geehrte/r ${escapeHtml(data.guestName)},
              </p>
              <p style="margin:16px 0 0;font-size:15px;color:#555;line-height:1.7;">
                vielen Dank für Ihre Buchung. Ihre Zahlung ist eingegangen und Ihr Aufenthalt ist bestätigt.
                Wir freuen uns auf Ihren Besuch!
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e8e8e8;margin:0;" />
            </td>
          </tr>

          <!-- Booking details -->
          <tr>
            <td style="padding:28px 40px;">
              <p style="margin:0 0 20px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c9a96e;">Buchungsübersicht</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <span style="color:#888;font-size:13px;">Unterkunft</span>
                    <p style="margin:4px 0 0;font-size:15px;color:#1a1a2e;font-weight:bold;">${escapeHtml(data.propertyName)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%">
                          <span style="color:#888;font-size:13px;">Anreise</span>
                          <p style="margin:4px 0 0;font-size:15px;color:#1a1a2e;">${formatDate(data.checkIn)}</p>
                        </td>
                        <td width="50%">
                          <span style="color:#888;font-size:13px;">Abreise</span>
                          <p style="margin:4px 0 0;font-size:15px;color:#1a1a2e;">${formatDate(data.checkOut)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%">
                          <span style="color:#888;font-size:13px;">Aufenthaltsdauer</span>
                          <p style="margin:4px 0 0;font-size:15px;color:#1a1a2e;">${nights} ${nights === 1 ? "Nacht" : "Nächte"}</p>
                        </td>
                        <td width="50%">
                          <span style="color:#888;font-size:13px;">Gäste</span>
                          <p style="margin:4px 0 0;font-size:15px;color:#1a1a2e;">${data.guests} ${data.guests === 1 ? "Person" : "Personen"}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0 4px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="color:#888;font-size:13px;">Gesamtbetrag (bezahlt)</span>
                          <p style="margin:4px 0 0;font-size:22px;color:#c9a96e;font-weight:bold;">${formatCurrency(data.totalPrice)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking ID -->
          <tr>
            <td style="padding:0 40px 28px;">
              <div style="background:#f8f8f6;border-radius:8px;padding:14px 18px;">
                <span style="font-size:12px;color:#888;">Buchungsnummer</span>
                <p style="margin:4px 0 0;font-size:12px;font-family:monospace;color:#555;word-break:break-all;">${data.bookingId}</p>
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e8e8e8;margin:0;" />
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:28px 40px 36px;">
              <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
                Bei Fragen zu Ihrer Buchung antworten Sie einfach auf diese E-Mail.
                Wir wünschen Ihnen einen angenehmen Aufenthalt.
              </p>
              <p style="margin:20px 0 0;font-size:14px;color:#888;">
                Mit freundlichen Grüßen,<br />
                <strong style="color:#1a1a2e;">Ihr THB Appartements Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer bar -->
          <tr>
            <td style="background:#f8f8f6;padding:18px 40px;text-align:center;border-top:1px solid #e8e8e8;">
              <p style="margin:0;font-size:11px;color:#aaa;">THB Appartements &mdash; Diese E-Mail wurde automatisch generiert.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.guestEmail,
    subject: `Buchungsbestätigung – ${data.propertyName}`,
    html,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
