const WHATSAPP_NUMBER = "919999913516";
const DEFAULT_MESSAGE = "Hi, I came from your website and want to know more.";

export function getWhatsAppLink() {
  const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}