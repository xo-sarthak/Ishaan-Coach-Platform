const WHATSAPP_NUMBER = "";
const DEFAULT_MESSAGE = "Hi, I came from your website and want to know more.";

export function getWhatsAppLink() {
  const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}