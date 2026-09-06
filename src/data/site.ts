export const site = {
  name: "Electricieni Moderni",
  tagline:
    "Instalații electrice conforme normativului I7 și integrare smart home cu Home Assistant.",
  phone: "+40 700 000 000",
  phoneHref: "tel:+40700000000",
  email: "contact@electricienimoderni.ro",
  emailHref: "mailto:contact@electricienimoderni.ro?subject=Cerere%20ofert%C4%83",
  counties: ["Neamț", "Suceava", "Iași", "Botoșani"],
  coverageLine:
    "Suntem baza în nordul Moldovei, dar ne deplasăm pentru proiecte în toată țara.",
  workingHours: "Luni – Vineri, 08:00 – 18:00",
} as const;

export type Site = typeof site;
