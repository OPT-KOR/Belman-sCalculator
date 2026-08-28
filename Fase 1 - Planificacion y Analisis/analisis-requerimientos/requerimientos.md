# Propuesta de Requerimientos

**Proyecto:** Calculadora Web Básica
**Materia:** Fundamentos de Ingeniería de Software
**Fase:** Análisis de Requerimientos — Documento para validación con el cliente

---

## 1. Objetivo del documento

Este documento resume los requerimientos levantados con el cliente para el desarrollo de la calculadora, con el fin de que sean revisados y validados antes de continuar con la fase de Diseño del proyecto, conforme al modelo de ciclo de vida en cascada.

## 2. Resumen de requerimientos definidos por el cliente

| Criterio | Definición del cliente |
|---|---|
| Tipo de calculadora | Básica |
| Operaciones requeridas | Operaciones básicas (suma, resta, multiplicación, división) |
| Contexto de uso | Uso general |
| Plataforma | Web |
| Lenguaje/tecnología | React (JavaScript) y CSS — sin backend, al no requerir historial ni persistencia de datos |
| Interfaz | Libre (a definir por el equipo de diseño/desarrollo) |
| Historial de operaciones | No requerido |
| Fecha límite de entrega | Jueves (próximo jueves, 3 de septiembre de 2026) |

> **Nota:** si durante el desarrollo se identifica la necesidad de otro lenguaje o herramienta adicional (por ejemplo, para pruebas o despliegue), se presentará como propuesta adicional para su validación antes de incorporarla.

## 3. Alcance del proyecto

### Incluido en el alcance
- Calculadora básica funcional, disponible como aplicación web.
- Operaciones aritméticas básicas: suma, resta, multiplicación y división.
- Interfaz simple orientada a uso general (no especializada en un área).
- Manejo interno de errores comunes (ej. división entre cero) sin que la aplicación falle.

### Fuera del alcance (por decisión del cliente)
- Funciones científicas (potencias, raíces, trigonometría, logaritmos).
- Registro o historial de operaciones realizadas.
- Restricciones específicas de lenguaje o framework de desarrollo.
- Requerimientos de diseño visual específico (queda a criterio del equipo).

## 4. Fecha límite de entrega

El cliente estableció como fecha límite el día jueves. Tomando como referencia la fecha actual (jueves 27 de agosto de 2026), se interpreta como el **jueves 3 de septiembre de 2026**. Se recomienda confirmar esta fecha explícitamente con el cliente antes de fijarla como línea base del cronograma.

## 5. Estimación de costos

Estimación por rol, basada en horas de trabajo dentro del periodo del 27 de agosto al 3 de septiembre de 2026. Las tarifas son valores de referencia (MXN/hora) para efectos de la propuesta académica y pueden ajustarse según el acuerdo real con el cliente.

| Rol | Horas estimadas | Tarifa por hora | Costo total |
|---|---|---|---|
| Líder de proyecto | 8 h | $180 | $1,440 |
| Analista | 10 h | $150 | $1,500 |
| Desarrollador (React) | 16 h | $160 | $2,560 |
| QA / Tester | 6 h | $130 | $780 |
| **Total** | **40 h** | — | **$6,280 MXN** |

**Supuestos de la estimación:**
- Las horas cubren únicamente el desarrollo de la calculadora básica descrita en el alcance (sección 3); no incluyen funciones fuera de alcance.
- No se contemplan costos de infraestructura, hosting o licencias, ya que el proyecto no requiere backend ni persistencia de datos.
- Las tarifas por hora son valores de referencia definidos por el equipo para esta propuesta, no tarifas confirmadas por el cliente.
- Cualquier cambio de alcance después de la validación de requerimientos puede modificar esta estimación y deberá gestionarse mediante control de cambios.

## 6. Validación y aceptación

Con la firma de este documento, el cliente confirma que los requerimientos aquí descritos son correctos y suficientes para iniciar la fase de Diseño del sistema. Cualquier cambio posterior deberá gestionarse mediante control de cambios formal.

| Firma del Cliente | Firma del Analista |
|---|---|
| Nombre y fecha: | Nombre y fecha: |

---

*Documento elaborado por el Analista del proyecto como parte de la Fase 1 (Análisis de Requerimientos) del ciclo de vida en cascada.*
