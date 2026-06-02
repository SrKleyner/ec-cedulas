# ec-cedulas

Single-page Vite + TypeScript app that generates valid Ecuadorian cédula numbers (Módulo 10 algorithm).

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | `tsc --noEmit` then `vite build` |
| `pnpm preview` | Preview production build |

## Architecture

- **Entrypoint**: `index.html` → loads `/src/main.ts` as ES module
- **CSS**: linked via `<link rel="stylesheet" href="/src/style.css">` in `index.html` (not imported in TS)
- **No routing, no framework** — vanilla TS manipulating the DOM

## TypeScript quirks

- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUnusedLocals` / `noUnusedParameters` — strict; remove unused code, don't just comment
- `noEmit: true` — Vite handles bundling, tsc is for type-checking only
- `allowImportingTsExtensions: true` — import `.ts` files directly

## Cédula generation (src/main.ts)

Algorithm (Módulo 10) is self-contained in `generarCedula()`. Province codes 01–24, 7-digit sequential, check digit via weighted sum with pattern [2,1,2,1,2,1,2,1,2], subtracting 9 if product ≥ 10.
