# Pruebas

Pruebas unitarias y de integración de la calculadora, con **Vitest + React Testing Library**.

> **Nota sobre el framework:** el plan original contemplaba Jest. Al construirse la app con
> Vite, se adoptó **Vitest** (API compatible con Jest: `describe/it/expect`, `vi` en lugar de
> `jest`), que se integra de forma nativa con la configuración de Vite y evita duplicar
> *tooling* de Babel. Es la propuesta de herramienta adicional mencionada en los requerimientos.

## Cómo ejecutarlas

Desde la raíz del repositorio:

```bash
npm install      # una sola vez (instala el workspace)
npm test         # ejecuta TODA la suite (esta carpeta + la de implementacion/)
npm run test:coverage
```

O desde la app:

```bash
cd "Fase 2 - Diseño e Implementacion/implementacion"
npm test
```

La configuración de Vitest ([`vite.config.js`](../../Fase%202%20-%20Dise%C3%B1o%20e%20Implementacion/implementacion/vite.config.js))
incluye explícitamente esta carpeta:

```js
test.include = [
  'src/**/*.{test,spec}.{js,jsx}',
  '<repo>/Fase 3 - Pruebas Despliegue y Mantenimiento/pruebas/**/*.{test,spec}.{js,jsx}',
]
```

y `server.fs.allow` apunta a la raíz del repo para poder cargar estos archivos desde fuera
del subproyecto. Las dependencias (`react`, `@testing-library/*`) se resuelven desde el
`node_modules` de la raíz gracias al *workspace* de npm.

## Archivos

| Archivo | Qué cubre | Nº de casos |
|---|---|---|
| `calculadora-logica.test.js` | Lógica pura (`operate`, `roundResult`, `calculatorReducer`). | 39 |
| `calculadora-ui.test.jsx` | Componente `Calculator` con clics y teclado (React Testing Library + `user-event`). | 17 |
| *(en `implementacion/src/`)* `Calculator.smoke.test.jsx` | Montaje básico del componente. | 2 |

**Total: 58 casos.**

## Cobertura por requerimiento

| Requerimiento / caso límite | Pruebas |
|---|---|
| Suma, resta, multiplicación, división | `operate() — las 4 operaciones básicas`, `operaciones simples`, `UI — operaciones básicas con clics` |
| **División entre cero no rompe la app** | `operate() — casos límite` (no lanza, error como dato), `división entre cero no rompe la app` (estado de error + recuperación con `C` y tecleando), `UI — división entre cero` (mensaje visible, app viva) |
| **Solo enteros (sin punto decimal)** | `calculatorReducer — entrada de dígitos (solo enteros)` (la acción `decimal` se ignora), `UI — solo enteros` (no existe la tecla `.` ni `%`; el punto físico se ignora) |
| **Decimales en la división** | `roundResult() — ruido de coma flotante en divisiones`, `la división es la única que puede dar decimales` (`10 ÷ 4 = 2.5`, `7 ÷ 2 = 3.5`, `10 ÷ 3` redondeado a 10 decimales), `UI — 10 ÷ 4 = 2.5` |
| **Operaciones encadenadas** | `calculatorReducer — operaciones encadenadas` (parciales, sin precedencia, cambio de operador, encadenar resultado de `=`, encadenar sobre un decimal de división), `UI — división con decimales y encadenadas` |
| Limpiar (`C`) y borrar (`⌫`) | `calculatorReducer — limpiar (C) y borrar (⌫)`, `UI — limpiar y borrar` |
| Overflow / resultado no finito | `operate() — casos límite` (`1e308 × 1e308` → error controlado) |
| Control por teclado físico | `UI — teclado físico` |

## Resultado esperado

```
 Test Files  3 passed (3)
      Tests  58 passed (58)
```
