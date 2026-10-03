export const MAPS_URL = "https://maps.app.goo.gl/tL37r51JpKZJc6j87";
export const WHATSAPP_ASJA = "https://wa.me/393923064010";
export const WHATSAPP_AMBRA = "https://wa.me/393397009276";
export const TEL_ASJA = "tel:+393923064010";
export const TEL_AMBRA = "tel:+393397009276";
export const EMAIL_HREF = "mailto:acasadimarco17@gmail.com";
export const EMAIL_LABEL = "acasadimarco17@gmail.com";
export const EMERGENCY_118 = "tel:118";
export const EMERGENCY_112 = "tel:112";

export const HERO_IMG = "/assets/garden-main.jpg";
export const ROBIN_IMG = "/assets/pettirosso1.png";

export const PARKING_IMG_BY_LANG: Record<string, string> = {
  it: "/assets/parcheggiogiardino.png",
  en: "/assets/parcheggioinglese.png",
  es: "/assets/parcheggiospagnolo.png",
  fr: "/assets/parcheggiofrancese.png",
  de: "/assets/parcheggiogiardino.png",
};

export const NAV_ROUTES = [
  { id: "home", href: "/" },
  { id: "check-in", href: "/check-in" },
  { id: "permanenza", href: "/permanenza" },
  { id: "check-out", href: "/check-out" },
] as const;
