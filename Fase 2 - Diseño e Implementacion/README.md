# Fase 2 — Diseño e Implementación

Segunda etapa del ciclo de vida en cascada. Parte de los requerimientos validados en la
Fase 1 y produce la aplicación funcional.

## Contenido

| Ruta | Descripción |
|---|---|
| `diseno/prototipo.html` | Prototipo de interfaz estático: referencia visual (paleta, tipografía, layout). |
| `diseno/README.md` | Cómo se tradujo el prototipo a componentes React y diferencias intencionales. |
| `implementacion/` | Aplicación React funcional (Vite). Ver su propio `README.md`. |

## Estado de avance

**✅ Completada.**

- [x] Prototipo de referencia incorporado (`diseno/prototipo.html`).
- [x] Andamiaje del proyecto React con Vite (plantilla `react`, JavaScript).
- [x] Lógica de cálculo pura y aislada (`src/logic/calculator.js`): máquina de estados con
      soporte de operaciones encadenadas.
- [x] Cuatro operaciones básicas: suma, resta, multiplicación y división.
- [x] Manejo interno de errores: la división entre cero deja un estado de error visible y
      recuperable; la app no se rompe.
- [x] Botón limpiar (`C`) y borrar último dígito (`⌫`).
- [x] Componentes reales: `Calculator`, `Display`, `Keypad`, `Key`.
- [x] Estilos fieles al prototipo (teclado 4 columnas, pantalla con historial y resultado).
- [x] Extra: control por teclado físico, tecla `%`.

## Cómo ejecutar

```bash
cd implementacion
npm install
npm run dev
```

## Rama de trabajo

`fase-2` → merge a `main` al cierre de la fase.

## Salida hacia Fase 3

La lógica aislada en `implementacion/src/logic/` es la base de las **pruebas unitarias**
de la Fase 3. El build de Vite es el artefacto que se **despliega**.
