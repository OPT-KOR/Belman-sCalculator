# Implementación — App React

Aplicación de la calculadora básica construida con **React 18 + Vite**.
Entrada **solo de números enteros**; la división es la única operación que puede dar un
resultado con decimales.

## Requisitos

- Node.js 18+ (probado con Node 26)
- npm 9+

## Scripts

```bash
npm install          # instala dependencias
npm run dev          # servidor de desarrollo (http://localhost:5173)
npm run build        # build de producción -> dist/
npm run preview      # sirve el build de producción
npm test             # ejecuta las pruebas unitarias (incluye Fase 3/pruebas)
npm run test:watch   # pruebas en modo watch
npm run test:coverage
```

## Estructura

```
src/
├── main.jsx                 punto de entrada
├── App.jsx                  layout de página
├── index.css                estilos de página (paleta del prototipo)
├── logic/
│   ├── calculator.js        lógica pura: operate() + calculatorReducer() (máquina de estados)
│   └── useCalculator.js     hook: estado + handlers + control por teclado físico
└── components/
    ├── Calculator.jsx       contenedor (une estado + UI)
    ├── Calculator.css       estilos del componente (adaptados del prototipo)
    ├── Display.jsx          pantalla: historial + resultado / mensaje de error
    ├── Keypad.jsx           teclado de 4 columnas (C ⌫ ÷ × / 7 8 9 − / 4 5 6 + / 1 2 3 = / 0)
    └── Key.jsx              botón individual
```

## Decisiones de diseño

- **Lógica separada de la UI.** Toda la aritmética y la máquina de estados viven en
  `logic/calculator.js`, sin dependencias de React, para poder probarlas de forma aislada
  (ver `Fase 3 - Pruebas.../pruebas/`).
- **Errores como dato, no como excepción.** `operate()` devuelve `{ error }` en vez de lanzar.
  La división entre cero deja la calculadora en un estado de error visible y recuperable
  (con `C` o tecleando un número nuevo); la app nunca se rompe.
- **Solo enteros.** No hay tecla ni acción de punto decimal. `10 ÷ 3` sí muestra
  `3.3333333333` porque la división es la única operación que puede producir decimales.
- **Ruido de coma flotante.** `roundResult()` redondea a 10 decimales el resultado de la
  división para evitar salidas como `3.3333333333333335`.
- **Referencia visual.** La paleta de colores y la pantalla (oscura, con historial y
  resultado) provienen de `../diseno/prototipo.html`. El teclado se reacomodó al quitar las
  teclas `.` y `%` (ver `../diseno/README.md`).

## Controles de teclado

| Tecla física | Acción |
|---|---|
| `0`–`9` | dígitos |
| `+` `-` `*` `/` | operadores |
| `Enter` o `=` | igual |
| `Backspace` | borrar último dígito |
| `Escape` | limpiar (C) |

El punto (`.` o `,`) no hace nada: la calculadora es de enteros.
