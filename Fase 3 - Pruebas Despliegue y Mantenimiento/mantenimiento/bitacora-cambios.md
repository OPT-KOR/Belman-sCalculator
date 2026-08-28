# Bitácora de cambios

Registro cronológico de cambios del proyecto **Calculadora Web Básica**.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico: `MAYOR.MENOR.PARCHE`.

---

## [1.0.0] — 2026-09-03

Primera entrega al cliente. Cumple el alcance validado en la Fase 1.

### Añadido

- **Fase 1 — Planificación y Análisis**
  - Documento de requerimientos validado con el cliente (`analisis-requerimientos/requerimientos.md`).
  - Plan de proyecto: stack técnico, cronograma PERT con ruta crítica (A → B → C → F → G → H → J
    ≈ 25.3 h) y estimación de costos (40 h, $6,280 MXN de referencia).
- **Fase 2 — Diseño e Implementación**
  - Prototipo de interfaz de referencia (`diseno/prototipo.html`).
  - Aplicación React (Vite) con las 4 operaciones básicas: suma, resta, multiplicación y división.
  - Lógica de cálculo pura y aislada (`logic/calculator.js`): máquina de estados con soporte de
    operaciones encadenadas (evaluación de izquierda a derecha, sin precedencia).
  - Manejo interno de errores: la división entre cero deja un estado de error visible y
    recuperable (con `C` o tecleando un número nuevo); la aplicación no se rompe.
  - `roundResult()`: redondeo a 10 decimales para evitar el ruido de coma flotante
    (`0.1 + 0.2 = 0.3`).
  - Botón de limpiar (`C`) y de borrar último dígito (`⌫`).
  - Componentes: `Calculator`, `Display`, `Keypad`, `Key`. Teclado de 4 columnas y pantalla
    oscura con línea de historial y de resultado, fiel al prototipo.
  - Extra: control por teclado físico (dígitos, `+ - * /`, `Enter`, `Backspace`, `Escape`, `%`)
    y tecla `%`.
- **Fase 3 — Pruebas, Despliegue y Mantenimiento**
  - 53 pruebas con Vitest + React Testing Library (lógica, casos límite y UI).
  - Despliegue continuo a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`).
  - Esta bitácora de cambios.

### Decisiones técnicas

- **Vitest en lugar de Jest:** al usar Vite, Vitest se integra sin configuración extra de Babel
  y mantiene una API compatible con Jest. Registrado como propuesta de herramienta adicional.
- **Workspace de npm en la raíz:** permite que las pruebas de la Fase 3 (fuera del subproyecto
  de la app) compartan el mismo `node_modules` y una única copia de React.
- **`base path` condicionado por entorno:** `GITHUB_PAGES=true` activa `base: '/Belman-sCalculator/'`
  solo en el build de CI; en local el `base` es `/`.

### Fuera de alcance (sin cambios, por decisión del cliente)

- Funciones científicas, historial persistente de operaciones, requisitos de diseño visual
  específicos, backend o persistencia de datos.

---

## Plantilla para cambios futuros

```markdown
## [X.Y.Z] — AAAA-MM-DD

### Añadido
- ...

### Cambiado
- ...

### Corregido
- ...

### Eliminado
- ...
```

## Procedimiento de mantenimiento

1. Crear una rama desde `main` (`fix/...` o `feat/...`).
2. Implementar el cambio **con su prueba** en `Fase 3 .../pruebas/`.
3. `npm test` en verde y `npm run build` sin errores.
4. Registrar el cambio en esta bitácora bajo una nueva versión.
5. Pull request → merge a `main`. El workflow despliega automáticamente.
