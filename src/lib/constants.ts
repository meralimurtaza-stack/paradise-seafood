// Paradise Seafood — global constants

export const WHATSAPP_NUMBER = "447864929925";
export const PHONE_NUMBER = "02078594099";
export const PHONE_NUMBER_INTERNATIONAL = "+442078594099";
export const CONTACT_EMAIL = "inquiries@paradiseseafood.co.uk";

/**
 * Build a WhatsApp "click to chat" URL with a pre-filled, URL-encoded message.
 *
 * Uses https://api.whatsapp.com/send because it works reliably on BOTH desktop
 * and mobile. The shorter https://wa.me/ variant is known to fail on some
 * desktop browsers (it can land on a broken "continue to chat" page that
 * shows "The phone number ... isn't on WhatsApp" even when the number IS
 * registered on the mobile app).
 *
 * api.whatsapp.com/send:
 *   - On mobile: opens the WhatsApp app directly at the chat with pre-filled text
 *   - On desktop: opens web.whatsapp.com/send (or the desktop app if registered)
 *
 * Always open the returned URL with target="_blank" rel="noopener noreferrer".
 */
export function whatsappUrl(message: string): string {
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
  });
  return `https://api.whatsapp.com/send?${params.toString()}`;
}
