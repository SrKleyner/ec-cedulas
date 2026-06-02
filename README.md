# ec-cedulas

Generador de cédulas ecuatorianas válidas usando el algoritmo **Módulo 10**, construido con Vite + TypeScript.

## Uso

```bash
pnpm dev        # Iniciar servidor de desarrollo
pnpm build      # Compilar para producción
pnpm preview    # Previsualizar build
```

## Algoritmo

La cédula ecuatoriana tiene 10 dígitos:

1. **Posiciones 1–2**: código de provincia (01–24)
2. **Posiciones 3–9**: número secuencial de 7 dígitos
3. **Posición 10**: dígito verificador (Módulo 10)

El dígito verificador se calcula multiplicando los dígitos en posiciones impares por 2 (restando 9 si el resultado ≥ 10), sumando con los dígitos pares, y tomando `(10 - suma % 10) % 10`.

## Stack

- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)
