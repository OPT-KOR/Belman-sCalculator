# Trazabilidad de la implementación

Mapa de cada tarea de implementación a los archivos y líneas donde está resuelta.
Rutas relativas a `Fase 2 - Diseño e Implementacion/implementacion/`.

> Las líneas corresponden al estado v1.1.0 (calculadora de enteros). Pueden desplazarse
> ligeramente en cambios posteriores; las referencias por nombre de función/clase se mantienen.

---

## 1. Estructura base de la interfaz (React + CSS)

| Archivo | Qué aporta |
|---|---|
| `index.html` | Punto de montaje: `<div id="root">` y carga de `src/main.jsx`. |
| `src/main.jsx` | Arranque de React (`createRoot`, `StrictMode`); importa `index.css`. |
| `src/App.jsx` | Layout de página (`page-label`, `main.app`, `footnote`); monta `<Calculator/>`. |
| `src/index.css` | Estilos base de página y **paleta de colores** en `:root` (líneas 3-21), tomada del prototipo. |
| `src/components/Calculator.jsx` | Componente contenedor: estructura de la tarjeta (`<section class="calculator">`, header con título y badge "Básica") y unión estado + UI. |
| `src/components/Calculator.css` | Estilos del componente: tarjeta, pantalla, grid del teclado y botones. |
| `vite.config.js` | Configuración del proyecto (plugin de React, `base` path para GitHub Pages). |

---

## 2. Botones y pantalla de resultado

| Elemento | Archivo | Dónde |
|---|---|---|
| Pantalla (historial + resultado + error) | `src/components/Display.jsx` | Todo el componente: `screen-history`, `screen-result` (`data-testid="result"`), `screen-error`. |
| Teclado / botones | `src/components/Keypad.jsx` | Layout de 4 columnas (líneas 18-41): instancia cada `<Key>` con su acción. |
| Botón individual | `src/components/Key.jsx` | `<button>` con `variant` (num/op/eq/func) y `size` (wide/tall). |
| Estilos de pantalla y botones | `src/components/Calculator.css` | `.screen`, `.screen-result`, `.screen-error` (~35-80); `.keys`, `.key`, `.key.op`, `.key.eq`, `.key--wide`, `.key--tall` (~83-158). |
| Cableado estado ↔ botones | `src/logic/useCalculator.js` (handlers, líneas 40-45) + `src/components/Calculator.jsx` (línea 11: `const { state, ...actions } = useCalculator()`). |

---

## 3-6. Las cuatro operaciones

Todas se definen en el mapa `OPERATORS` de **`src/logic/calculator.js`**:

| Operación | Línea | Código |
|---|---|---|
| Suma | 19 | `'+': (a, b) => a + b` |
| Resta | 20 (constante `MINUS` en línea 15) | `[MINUS]: (a, b) => a - b` |
| Multiplicación | 21 | `'×': (a, b) => a * b` |
| División | 22 | `'÷': (a, b) => a / b` |

Maquinaria de cálculo asociada, en el mismo archivo:

| Elemento | Líneas | Función |
|---|---|---|
| `operate(a, b, operator)` | 48-61 | Aplica la operación elegida; devuelve `{ value }` o `{ error }`. |
| `roundResult()` | 38-41 | Redondea el resultado de la división a 10 decimales. |
| `chooseOperator()` | 109-154 | Se ejecuta al pulsar un operador; en operaciones encadenadas calcula el parcial con `operate()` (línea 135). |
| `equals()` | 156-179 | Se ejecuta al pulsar `=`; llama a `operate(previous, right, operator)` (línea 161). |

Disparo desde la UI:

- Botones `÷ × − +`: `src/components/Keypad.jsx` líneas 22-23, 28, 33; botón `=` línea 38.
- Teclado físico (`+ - * / Enter =`): `src/logic/useCalculator.js`, función `keyToAction()` (líneas 5-27).

---

## 7. Manejo de errores: división entre cero

### Lógica — `src/logic/calculator.js`

| Parte | Línea | Detalle |
|---|---|---|
| Mensaje | 28 | `export const ERROR_DIVIDE_BY_ZERO = 'No se puede dividir entre cero'` |
| Detección (no lanza excepción; devuelve el error como dato) | 52-54 | `if (operator === DIVIDE && b === 0) return { error: ERROR_DIVIDE_BY_ZERO }` |
| El error entra al estado al pulsar `=` | 164-172 | Deja `display: '0'`, `error: <mensaje>`, `history` con la expresión. |
| El error entra al estado en cadena (`8 ÷ 0 +`) | 136-144 | Mismo manejo dentro de `chooseOperator()`. |
| Recuperación al teclear un dígito | 95 | `const base = state.error ? initialState : state` |
| Recuperación con `⌫` / `C` | 182 y 208-209 | `deleteLast` y `clear` vuelven a `initialState`. |

### UI del error

| Archivo | Aporte |
|---|---|
| `src/components/Display.jsx` | Render condicional de `<div className="screen-error" role="alert">` cuando llega `error`. |
| `src/components/Calculator.jsx` | Pasa `error={state.error}` a `<Display>`. |
| `src/components/Calculator.css` | Clase `.screen-error`. |
| `src/index.css` | Variable de color `--screen-error` (línea 12). |

---

## Pruebas

Las pruebas de cada operación y del manejo de error viven en
`../../Fase 3 - Pruebas Despliegue y Mantenimiento/pruebas/`:

- `calculadora-logica.test.js` — `operate()`, `roundResult()`, `calculatorReducer` (39 casos).
- `calculadora-ui.test.jsx` — componente `Calculator` con clics y teclado (17 casos).
- `../src/components/Calculator.smoke.test.jsx` — montaje básico (2 casos).
