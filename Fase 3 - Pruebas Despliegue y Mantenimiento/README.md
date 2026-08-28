# Fase 3 — Pruebas, Despliegue y Mantenimiento

Tercera y última etapa del ciclo de vida en cascada. Verifica la aplicación construida en la
Fase 2, la publica y deja el proyecto listo para mantenerse.

## Contenido

| Ruta | Descripción |
|---|---|
| `pruebas/calculadora-logica.test.js` | 37 pruebas de la lógica pura: 4 operaciones, división entre cero, decimales, operaciones encadenadas, limpiar/borrar, overflow. |
| `pruebas/calculadora-ui.test.jsx` | 14 pruebas del componente `Calculator` con React Testing Library (clics y teclado físico). |
| `pruebas/README.md` | Cómo ejecutar la suite y matriz de cobertura por requerimiento. |
| `despliegue/README.md` | Pasos de configuración y funcionamiento del despliegue a GitHub Pages (y alternativa Vercel). |
| `despliegue/deploy.yml` | Copia de referencia del workflow (el real vive en `.github/workflows/`). |
| `mantenimiento/bitacora-cambios.md` | Registro de cambios (Keep a Changelog) y procedimiento de mantenimiento. |

## Estado de avance

**✅ Completada.**

- [x] Pruebas unitarias de la lógica de cálculo (Vitest + RTL).
- [x] Casos límite cubiertos: división entre cero, decimales, operaciones encadenadas, overflow.
- [x] Pruebas de UI (clics y teclado).
- [x] `npm test` → **53 casos en verde**.
- [x] Workflow de despliegue a GitHub Pages (`.github/workflows/deploy.yml`), con las pruebas
      como *gate* previo al deploy.
- [x] Documentación de despliegue (`despliegue/README.md`).
- [x] Bitácora de cambios inicializada (v1.0.0).

### Pendiente de acción manual (fuera del código)

- [ ] En GitHub: **Settings → Pages → Source: GitHub Actions** (una sola vez).
- [ ] Primer push a `main` para publicar en `https://opt-kor.github.io/Belman-sCalculator/`.

## Cómo ejecutar las pruebas

```bash
npm install
npm test
```

## Rama de trabajo

`fase-3` → merge a `main` al cierre de la fase.
