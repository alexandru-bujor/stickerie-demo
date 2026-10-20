# Stickerie.ro – redesign (front-end)

Demo pentru redesignul stickerie.ro, făcut cu **React 19 + TypeScript + Tailwind CSS v4**, pe **Vite**.
Doar front-end: coșul, formularul și oferta pe WhatsApp afișează un mesaj de confirmare, fără să trimită nimic.

## Pornire

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # verifică tipurile și generează dist/
npm run preview    # servește build-ul local
```

Necesită Node.js 18 sau mai nou.

## Ce conține

- **Home** – hero cu colaj, scurtături spre categorii, proiecte salvate, despre noi, pașii de comandă, cele mai vândute.
- **Studio** – stickerul pus pe o mașină la scară reală (hatchback, sedan, SUV, break, motocicletă). Îl muți cu mouse-ul sau degetul și îl mărești din colț. Are mod zi/noapte (folia reflectorizantă și cromul strălucesc), avertizare de contrast și zone recomandate.
- **Calculator preț** pentru 8 produse: previzualizare la scară (lângă A4, lângă un om, în context), bon cu detalierea prețului, grafic cu reducerile de cantitate, salvare proiect, copiere ofertă.
- **Catalog** cu filtre, sortare, căutare și „Probează pe mașină”.
- **Contact** cu formular de cerere de ofertă.
- Coș lateral, dark mode automat, layout responsive.

## Structura

```
src/
├── main.tsx                 punctul de intrare
├── App.tsx                  layout + alegerea paginii după rută
├── index.css                Tailwind + tokenuri de culoare + utilitare de brand
├── types.ts                 tipurile comune
├── assets/logo.png          logo-ul original
│
├── data/                    tot ce e conținut sau configurare
│   ├── calculators.ts       prețurile și câmpurile celor 8 calculatoare
│   ├── catalog.ts           produsele din catalog
│   ├── categories.ts        categoriile de pe home, telefon, livrare
│   ├── design.ts            fonturi, culori de folie și de mașină
│   └── vehicles.ts          mașinile din Studio (în cm) și zonele lor
│
├── lib/                     funcții fără interfață
│   ├── format.ts            formatare lei / cm în română
│   ├── sticker.ts           măsurarea textului, dimensiuni și preț sticker
│   ├── studio.ts            plasarea stickerului în zone
│   ├── color.ts             contrast între culori
│   ├── clipboard.ts         copiere text
│   └── storage.ts           localStorage sigur
│
├── state/
│   ├── AppContext.tsx       starea aplicației (coș, proiecte, design, calculatoare, toast)
│   └── router.ts            router simplu pe hash (#/studio, #/calculator/banner …)
│
├── components/
│   ├── layout/              Header, Footer, AnnounceBar, CartDrawer, Toast, Logo
│   ├── ui/                  Button, Icon, Segmented, Swatches, UploadField, SectionHead
│   ├── home/                secțiunile paginii principale
│   ├── product/             ProductCard, DieCutThumb
│   ├── studio/              StudioStage (SVG + drag), StudioPanel, VehicleGraphic, StickerGraphic
│   └── calculator/          CalculatorForm, PreviewPanel, Receipt, PriceCurve
│       └── previews/        ScenePreview (scară + context), ProductShapes, ShirtPreview, MugPreview
│
└── pages/                   HomePage, StudioPage, CalculatorPage, CatalogPage, ContactPage
```

## Unde schimbi lucrurile

| Ce | Fișier |
|---|---|
| Prețuri, opțiuni, reduceri de cantitate | `src/data/calculators.ts` (funcția `calc` și `tiers` ale fiecărui produs) |
| Un calculator nou | adaugi produsul în `CALCULATORS` și id-ul în `CALCULATOR_ORDER` |
| Produsele din catalog | `src/data/catalog.ts` |
| Culorile brandului, fonturi, umbre | `src/index.css` (`:root` și `@theme inline`) |
| Mașini și zone din Studio | `src/data/vehicles.ts` (coordonate în cm) |
| Telefon, costuri de livrare | `src/data/categories.ts` |

Culorile sunt variabile CSS expuse în Tailwind ca `bg-paper`, `text-ink`, `bg-brand`, `border-line`, `shadow-sticker` etc., așa că dark mode-ul funcționează fără clase `dark:`.

## Ce se salvează în browser

Coșul, proiectele salvate și ultimul design din Studio stau în `localStorage`. Imaginile încărcate nu se salvează.

## Pentru back-end

- legarea coșului și a comenzii de WooCommerce sau de un API propriu;
- trimiterea formularului de contact și a ofertei pe WhatsApp (`wa.me/40755161686`);
- upload real pentru fișierele de grafică;
- prețurile din `data/calculators.ts` să vină din administrare;
- textul de la „Despre noi”, momentan provizoriu.

Prețurile din calculatoare sunt orientative, puse doar pentru demo.
