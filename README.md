# Barometr

World socio-economic indicators visualized as weather scores on an interactive map.

Barometr aggregates public data from the World Bank, OECD, UN, WHO and other open sources, then computes a 0–100 "weather score" for every country across **17 domains**: health, education, ecology, security, digital, equality, and more.

**[Live demo — barometr.vercel.app](https://barometr.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)

## Features

- Interactive world map powered by MapLibre GL
- 17 socio-economic domains with 60+ indicators
- Country-level detail panels with rankings and trends
- Score distribution and best/worst performers
- Fully static export — no backend required
- Mobile-first responsive design
- French and English locales

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/Evangenieur/barometr.git
cd barometr
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

The static export is generated in `out/`.

### Lint & type-check

```bash
npm run lint
npm run type-check
```

## Environment variables

All variables are optional. Copy `.env.example` to `.env.local` to customize:

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `""` | Base path for deployment under a subpath |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical site URL |
| `NEXT_PUBLIC_MAPLIBRE_STYLE` | OpenFreeMap dark | MapLibre style URL |

## Project structure

```
app/              Next.js app router pages
components/
  layout/         Header, footer
  map/            MapLibre map & legend
  navigation/     Domain sidebar
  panels/         Country & stats panels
  ui/             Reusable UI components
lib/
  domains/        17 domain modules (definition + seed data)
  context/        Navigation state (React context + URL sync)
  utils/          Helpers (flags, scoring, cn)
  aggregate.ts    Score computation engine
  scoring.ts      Raw value → 0-100 normalization
public/           Static assets
```

## Data sources

All data comes from publicly available sources:

- [World Bank Open Data](https://data.worldbank.org/)
- [OECD](https://data.oecd.org/)
- [United Nations](https://data.un.org/)
- [WHO](https://www.who.int/data)
- [Transparency International](https://www.transparency.org/)
- [SIPRI](https://www.sipri.org/)
- [ND-GAIN](https://gain.nd.edu/)
- [Numbeo](https://www.numbeo.com/)

## Deployment

The project deploys automatically to Vercel on push to `master`.

To deploy manually:

```bash
npm run build
# upload the out/ directory to your static host
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
