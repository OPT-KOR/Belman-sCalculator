# Diseño

## Contenido

| Archivo | Descripción |
|---|---|
| `prototipo.html` | Prototipo de interfaz **estático** (sin funcionalidad) entregado como referencia visual. Define la paleta de colores, la tipografía y el layout del teclado de 4 columnas y de la pantalla (historial + resultado). |

## Cómo usar el prototipo

Abrir `prototipo.html` directamente en el navegador. Es solo maqueta: los botones no operan.

## Traducción del prototipo a componentes React

El prototipo se implementó como componentes reales y funcionales en
`../implementacion/`, respetando su identidad visual:

| Elemento del prototipo | Componente React | Notas |
|---|---|---|
| `.calculator` (tarjeta) | `Calculator.jsx` | Contenedor. |
| `.screen` + `.screen-history` + `.screen-result` | `Display.jsx` | Se añadió `.screen-error` para el estado de error (división entre cero). |
| `.keys` (grid 4 columnas) | `Keypad.jsx` | Layout implementado: `C ⌫ ÷ × / 7 8 9 − / 4 5 6 + / 1 2 3 = / 0(x3)` (la tecla `=` ocupa dos filas). |
| `.key`, `.key.op`, `.key.eq`, `.key.func`, `.key--wide`, `.key--tall` | `Key.jsx` | Variante por prop `variant`; tamaño por prop `size` (`wide` = 3 columnas, `tall` = 2 filas). |
| Variables `:root` (paleta) | `src/index.css` | Copiadas tal cual. |

### Diferencias intencionales respecto al prototipo

- **Solo enteros:** se eliminó la tecla de **punto decimal** (`.`). La entrada es únicamente de
  números enteros; la división es la única operación que puede mostrar un resultado con
  decimales (p. ej. `10 ÷ 3`). Decisión del cliente posterior a la primera entrega
  (ver `../../Fase 3 .../mantenimiento/bitacora-cambios.md`, v1.1.0).
- **Sin tecla `%`:** el prototipo la incluía, pero no forma parte de las operaciones básicas
  y es incompatible con la entrada de solo enteros.
- Reacomodo del teclado tras quitar `.` y `%`: los operadores `÷ ×` suben a la fila superior,
  la tecla `=` pasa a ocupar dos filas y el `0` ocupa tres columnas (layout tipo calculadora
  clásica).
- Los botones tienen `cursor: pointer`, estados `:active` y `:focus-visible` (accesibilidad).
- La línea de resultado hace *ellipsis* cuando el número es muy largo.
- Se añadió un estado de error visible que el prototipo no contemplaba.

> El archivo `prototipo.html` se conserva **sin cambios** como registro de la referencia
> visual original entregada por el cliente.

## Paleta de referencia

| Rol | Color |
|---|---|
| Fondo de página | `#E7EDF2` |
| Tarjeta | `#FFFFFF` |
| Pantalla | `#1C2733` |
| Texto de resultado | `#F4F7FA` |
| Tecla numérica | `#F3F5F8` |
| Tecla de operador | `#3E7C7C` |
| Tecla `=` | `#1C2733` |
| Tecla de función (C, ⌫) | `#FBEAE6` / texto `#C1502F` |
