# ec-cedulas

Multi-page Vite + TypeScript app that generates valid Ecuadorian cédulas (Módulo 10) and Chilean RUTs (Módulo 11).

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | `tsc --noEmit` then `vite build` |
| `pnpm preview` | Preview production build |

## Multi-page setup (`vite.config.ts`)

Two HTML entry points declared in `build.rollupOptions.input`:
- `index.html` → `/src/main.ts` + `/src/style.css`
  - `chile.html` → `/src/chile.ts` + `/src/chile.css`
  - `edad.html` → `/src/edad.ts` + `/src/edad.css`

Both pages share the same visual theme (same CSS variables) but load independent style files.

## TypeScript quirks

- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUnusedLocals` / `noUnusedParameters` — strict; remove unused code, don't just comment
- `noEmit: true` — Vite handles bundling, tsc is for type-checking only
- `allowImportingTsExtensions: true` — import `.ts` files directly

## Algorithms

### Ecuadorian cédula (`src/main.ts`)
Módulo 10. Province codes 01–24, 7-digit sequential, check digit via weighted sum with pattern [2,1,2,1,2,1,2,1,2], subtracting 9 if product ≥ 10.

### Chilean RUT (`src/chile.ts`)
Módulo 11. Random 8-digit base, check digit via reverse iteration with factor sequence [2,3,4,5,6,7] (repeating), DV = 11 − (sum % 11), mapped to 0 (if 11) or K (if 10).

### Age calculator (`src/edad.ts`)
Takes two dates (birth + target), computes years/months/days difference with month-length correction. Displays whether person is 18+.
