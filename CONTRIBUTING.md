# Contributing to Barometr

Thanks for your interest in contributing!

## Development setup

```bash
git clone https://github.com/Evangenieur/barometr.git
cd barometr
npm install
npm run dev
```

## How to contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run lint and type-check before committing:
   ```bash
   npm run lint
   npm run type-check
   ```
5. Commit with a clear message
6. Push to your fork and open a Pull Request

## Adding a new domain

Each domain lives in `lib/domains/<domain-name>/` with:

- `index.ts` — domain definition (label, description, icon, indicators with thresholds) and seed data per country

Register the domain in `lib/domains/registry.ts`.

## Code style

- TypeScript strict mode
- Tailwind CSS for styling
- Mobile-first responsive design
- French and English locale support for all user-facing strings

## Reporting issues

Open an issue on GitHub with:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information if relevant
