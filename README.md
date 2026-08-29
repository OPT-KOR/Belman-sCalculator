# Calculadora Web Básica

Aplicación web de calculadora básica (suma, resta, multiplicación y división) desarrollada
con **React (JavaScript) + CSS**, sin backend. Proyecto de la materia *Fundamentos de
Ingeniería de Software*, gestionado con el modelo de ciclo de vida en **cascada**.

- **Cliente:** interno (proyecto académico)
- **Fecha límite:** jueves 3 de septiembre de 2026
- **Repositorio:** `OPT-KOR/Belman-sCalculator`

## Organización del repositorio

El trabajo está dividido en tres carpetas de fase para llevar control de versiones por etapas.
Cada fase se desarrolló en su propia rama (`fase-1`, `fase-2`, `fase-3`) y se integró a `main`
al cerrarse.

| Carpeta | Contenido | Estado |
|---|---|---|
| `Fase 1 - Planificacion y Analisis/` | Plan de proyecto (stack, cronograma PERT, costos) y requerimientos validados | ✅ Completada |
| `Fase 2 - Diseño e Implementacion/` | Prototipo visual de referencia y app React funcional (Vite) | ✅ Completada |
| `Fase 3 - Pruebas Despliegue y Mantenimiento/` | Pruebas unitarias (Vitest + RTL), configuración de despliegue (GitHub Pages) y bitácora de cambios | ✅ Completada |

## Cómo ejecutar la aplicación

```bash
cd "Fase 2 - Diseño e Implementacion/implementacion"
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm test         # pruebas unitarias (incluye las de Fase 3/pruebas)
```

## Stack técnico

- **Frontend:** React 18 + JavaScript
- **Estilos:** CSS plano (variables CSS, sin framework)
- **Build tool:** Vite
- **Pruebas:** Vitest + React Testing Library
- **Despliegue:** GitHub Pages vía GitHub Actions

## Alcance

**Incluye:** cuatro operaciones básicas con **entrada de números enteros** (la división puede
dar un resultado con decimales), manejo interno de errores (división entre cero), botón de
limpiar (`C`) y borrar último dígito (`⌫`).

**Fuera de alcance:** funciones científicas, historial persistente de operaciones,
requisitos de diseño visual específicos.
