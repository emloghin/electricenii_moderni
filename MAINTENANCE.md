# Ghid de mentenanță — Electricieni Moderni

Acest ghid e scris pentru tine, proprietarul site-ului, fără presupunerea că
știi să programezi. Explică pas cu pas cum publici site-ul live, cum adaugi
conținut (servicii, proiecte, testimoniale, poze, video/audio) și cum îl
rulezi pe calculatorul tău ca să vezi modificările înainte să le publici.

> Pentru detalii despre cum adaugi/editezi servicii, proiecte și
> testimoniale (câmpurile exacte din fiecare fișier), vezi
> [`CONTENT.md`](./CONTENT.md) — nu le repetăm aici ca să nu existe două
> surse care pot ajunge să contrazică una pe alta. Ghidul de față acoperă
> tot ce lipsește din `CONTENT.md`: publicarea site-ului, rularea locală,
> pozele (pe scurt, cu trimitere la `CONTENT.md`) și video/audio.

## 1. Cum rulez site-ul pe calculatorul meu (înainte de a publica)

Utilă pentru a vedea o modificare înainte s-o faci publică.

1. Instalează [Node.js](https://nodejs.org) versiunea 22 sau mai nouă (o
   singură dată, pe calculator).
2. Deschide un terminal în folderul proiectului și rulează, o singură dată
   (sau după ce cineva a modificat lista de pachete):

   ```bash
   npm install
   ```

3. Pornește serverul local:

   ```bash
   npm run dev
   ```

4. Deschide în browser adresa afișată în terminal —
   **http://localhost:4321** (acesta e portul implicit; dacă e deja ocupat,
   Astro alege automat următorul port liber și îl afișează în terminal).
5. Orice fișier salvezi (ex. un serviciu nou, o poză) apare automat în
   pagină, fără să repornești nimic.
6. Oprești serverul cu `Ctrl+C` în terminal.

Testat și confirmat funcțional pe acest proiect: `npm install` + `npm run
dev` pornesc corect serverul pe portul 4321.

## 2. Cum intru în producție (deploy)

**Starea actuală:** proiectul nu are încă niciun provider de hosting
configurat (nu există fișiere de deploy sau workflow-uri GitHub Actions
pentru publicare în `.github/workflows/` — acolo sunt doar automatizările
interne ale echipei Squad, nu au legătură cu publicarea site-ului). Mai jos
sunt pașii pentru cea mai simplă opțiune potrivită pentru acest tip de site
(static, generat cu Astro): **Netlify**.

De ce Netlify: este gratuit pentru un site de această mărime, se conectează
direct la contul de GitHub, publică automat la fiecare modificare, și
suportă domenii proprii fără costuri suplimentare de platformă.

### Pași de configurare (o singură dată)

1. Creează un cont gratuit pe [netlify.com](https://www.netlify.com),
   folosind "Sign up with GitHub".
2. Din dashboard, apasă **"Add new site" → "Import an existing project"**.
3. Alege contul/organizația de GitHub și selectează repository-ul
   `electricenii_moderni`.
4. La configurarea build-ului, completează exact:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Apasă **"Deploy site"**. Netlify instalează pachetele, rulează build-ul și
   publică site-ul la o adresă gratuită de tipul
   `nume-generat-aleatoriu.netlify.app`.
6. De acum, **orice modificare trimisă pe branch-ul principal al
   repository-ului (`main` sau `dev`, în funcție de ce configurează echipa)
   se publică automat** — nu mai trebuie să faci nimic manual.

### Cum leg domeniul meu propriu (ex. electricieni-moderni.ro)

1. În Netlify, mergi la site-ul tău → **"Domain settings" → "Add a domain"**.
2. Introdu domeniul tău (cumpărat separat, de la orice registrator — ex.
   RoTLD pentru `.ro`, sau Namecheap/GoDaddy).
3. Netlify îți arată exact ce înregistrare DNS trebuie să adaugi (de obicei
   un record `CNAME` sau `A`) — le adaugi în panoul de administrare al
   registratorului de domeniu, nu în Netlify.
4. Netlify emite automat și gratuit un certificat HTTPS pentru domeniul tău,
   de obicei în câteva minute până la câteva ore după ce DNS-ul se propagă.

> Alternative echivalente, dacă preferi alt provider: **Vercel** (aceiași
> pași: build command `npm run build`, output `dist`) sau **GitHub Pages**
> (necesită un mic workflow GitHub Actions suplimentar, deoarece GitHub
> Pages nu rulează automat un build — poate fi adăugat separat, la cerere).
> Nu am configurat niciunul dintre acestea în acest proiect — pașii de mai
> sus sunt documentație, nu o infrastructură deja activă. Primul deploy
> real trebuie făcut manual, o singură dată, urmând pașii de mai sus.

## 3. Cum adaug poze

Pe scurt (detalii complete și exemple de câmpuri în
[`CONTENT.md`](./CONTENT.md), secțiunea „Cum adaugi un proiect nou"):

1. Pune fișierul imagine în `src/assets/projects/` (pentru poze de proiecte)
   — formate acceptate: `.jpg`, `.png`, `.webp`, `.svg`.
2. Referențiaz-o în frontmatter-ul fișierului `.md` al proiectului, la
   câmpul `image`, cu calea relativă, ex.:
   `image: "../../assets/projects/poza-mea.jpg"`.
3. Completează și `imageAlt` — o scurtă descriere text a pozei (importantă
   pentru accesibilitate și pentru cei care navighează fără imagini).

## 4. Cum adaug video sau audio

Site-ul **nu avea** inițial niciun suport pentru video/audio — am verificat
componentele existente și nu exista nimic de acest fel. Am adăugat o
extensie mică, reutilizabilă pe ambele design-uri (`/` și `/design-2`),
special pentru acest scop: componenta `VideoEmbed`
(`src/components/shared/VideoEmbed.astro`). Nu afectează aspectul vizual al
niciunui design existent — apare doar dacă completezi câmpul `video` la un
proiect.

**Nu necesită nicio cunoștință de programare** — se completează un singur
câmp în fișierul `.md` al proiectului, la fel ca celelalte câmpuri descrise
în `CONTENT.md`.

### Opțiunea A — video de pe YouTube sau Vimeo (recomandat, cel mai simplu)

1. Pe YouTube, deschide videoul → **Share (Distribuie) → Embed (Încorporare)**
   → copiază URL-ul din interiorul codului afișat (arată așa:
   `https://www.youtube.com/embed/ID_VIDEO`). Pe Vimeo, la fel: **Share →
   Embed**, copiază URL-ul din `src="..."`.
2. Adaugă acel URL în fișierul `.md` al proiectului, la câmpul `video`:

   ```md
   ---
   title: "Casă pasivă, Piatra Neamț"
   location: "Piatra Neamț, Neamț"
   year: 2024
   summary: "Instalație electrică completă și smart home Home Assistant."
   image: "../../assets/projects/casa-pasiva-piatra-neamt.svg"
   imageAlt: "Schiță a instalației electrice"
   video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
   videoTitle: "Tur video al instalației smart home"
   order: 1
   ---
   ```

3. Salvezi fișierul — videoul apare automat sub descrierea proiectului, pe
   ambele design-uri.

### Opțiunea B — un fișier video sau audio propriu (hostat pe acest site)

Utilă dacă ai un fișier `.mp4` (video) sau `.mp3` (audio) pe calculator și
nu vrei să-l urci pe YouTube.

1. Pune fișierul în folderul `public/media/` din proiect (creează folderul
   `media` dacă nu există încă).
2. În frontmatter-ul proiectului, la câmpul `video`, scrie calea care începe
   cu `/media/`:

   ```md
   video: "/media/tur-instalatie.mp4"
   ```

   sau, pentru audio:

   ```md
   video: "/media/explicatie-audio.mp3"
   ```

3. Componenta detectează automat, după extensia fișierului, dacă trebuie
   afișat un player video sau audio.

**Câmpul `videoTitle` este opțional** — dacă îl omiți, se folosește
automat titlul proiectului.

Testat și confirmat funcțional în acest proiect (verificat cu `npm run
build`, atât pentru un link YouTube-embed cât și pentru un fișier audio
local): videoul/audio-ul apare corect atât pe `/`, cât și pe `/design-2`,
iar dacă nu completezi deloc câmpul `video`, nimic nu se schimbă — secțiunea
de proiect arată exact ca înainte.

> Notă tehnică pentru viitor (dacă echipa adaugă un al treilea design,
> `/design-3`): componenta `VideoEmbed` e neutră și poate fi refolosită la
> fel de simplu, importând-o din `../shared/VideoEmbed.astro`.

## 5. Rezumat rapid

| Vreau să... | Ce fac |
|---|---|
| Public site-ul live pentru prima dată | Urmez pașii din secțiunea 2 (Netlify) |
| Public o modificare nouă | Nimic manual — se publică automat după conectarea la Netlify |
| Adaug/editez un serviciu, proiect sau testimonial | Vezi [`CONTENT.md`](./CONTENT.md) |
| Adaug o poză | Secțiunea 3 de mai sus + `CONTENT.md` |
| Adaug un video sau audio | Secțiunea 4 de mai sus |
| Văd modificările înainte să le public | `npm install` + `npm run dev`, apoi http://localhost:4321 |
