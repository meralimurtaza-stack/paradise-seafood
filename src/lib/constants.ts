// Paradise Seafood — global constants

export const WHATSAPP_NUMBER = "447864929925";
export const PHONE_NUMBER = "02078594099";
export const PHONE_NUMBER_INTERNATIONAL = "+442078594099";
export const CONTACT_EMAIL = "inquiries@paradiseseafood.co.uk";

/**
 * Build a wa.me URL with a pre-filled, URL-encoded message.
 * Always open the returned URL with target="_blank" rel="noopener noreferrer".
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
