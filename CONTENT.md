# Ghid de conținut — Electricieni Moderni

Acest site citește tot conținutul editabil din fișiere Markdown (`.md`) aflate în
`src/content/`. Pentru a adăuga un serviciu, un proiect sau un testimonial NU este
nevoie de nicio modificare de cod — este suficient să adaugi un fișier nou și să
rulezi din nou build-ul (`npm run build`) sau serverul de dezvoltare
(`npm run dev`).

## Cum adaugi un serviciu nou

1. Creează un fișier nou în `src/content/services/`, de exemplu
   `verificari-periodice.md`.
2. Completează antetul (frontmatter) după acest model:

   ```md
   ---
   title: "Verificări periodice PRAM"
   category: "clasic"
   summary: "Verificăm periodic priza de pământ și continuitatea instalației."
   order: 5
   featured: false
   ---

   Text opțional, mai detaliat, despre acest serviciu.
   ```

3. `category` acceptă doar valorile `clasic` sau `smart`.
4. `order` controlează ordinea cardurilor (numere mai mici apar primele).
5. Salvează fișierul și rulează din nou site-ul — cardul apare automat în
   secțiunea „Servicii".

## Cum adaugi un proiect nou (cu imagine)

1. Adaugă imaginea în `src/assets/projects/`, de exemplu `casa-noua-botosani.jpg`.
2. Creează fișierul `src/content/projects/casa-noua-botosani.md`:

   ```md
   ---
   title: "Casă nouă, Botoșani"
   location: "Botoșani"
   year: 2026
   summary: "Instalație electrică completă pentru o casă nouă."
   image: "../../assets/projects/casa-noua-botosani.jpg"
   imageAlt: "Instalație electrică finalizată la casa din Botoșani"
   tags: ["I7", "Instalație completă"]
   order: 4
   ---

   Text opțional, mai detaliat, despre acest proiect.
   ```

3. Dacă nu ai încă o imagine, poți omite câmpul `image` — se va afișa automat un
   panou de tip „blueprint" cu titlul proiectului.

## Cum adaugi un testimonial nou

1. Creează un fișier în `src/content/testimonials/`, de exemplu `maria-t.md`:

   ```md
   ---
   author: "Maria T."
   location: "Botoșani"
   role: "Proprietar casă"
   rating: 5
   order: 4
   ---

   Textul testimonialului, în română, la persoana relatării clientului.
   ```

2. `rating` este opțional (1–5). `role` este opțional.

## Datele de contact ale firmei

Numele firmei, telefonul, e-mailul, județele deservite și programul de lucru se
află într-un singur loc: `src/data/site.ts`. Modifică valorile de acolo — toate
secțiunile (antet, contact, footer, zone deservite) se actualizează automat.

## După orice modificare

Rulează:

```bash
npm run build
```

Dacă un fișier are un câmp obligatoriu lipsă sau greșit, build-ul se oprește cu
un mesaj clar care spune exact ce fișier și ce câmp trebuie corectat.
