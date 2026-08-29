/**
 * Lógica de cálculo de la calculadora básica.
 *
 * La entrada es solo de **números enteros** (no hay punto decimal). La división es la
 * única operación que puede producir un resultado con decimales (p. ej. 10 ÷ 3);
 * suma, resta y multiplicación de enteros siempre dan enteros.
 *
 * Este módulo es 100% puro (sin React) para poder probarlo de forma aislada:
 *  - `operate`           : aplica una operación a dos números y reporta errores como dato.
 *  - `calculatorReducer` : máquina de estados de la calculadora (dígitos, operadores,
 *    igual, limpiar, borrar). Soporta operaciones encadenadas.
 */

/** Signo menos "real" (U+2212) usado como identidad del operador de resta. */
export const MINUS = '−'

/** Operadores soportados. La clave es también la etiqueta que se muestra en pantalla. */
export const OPERATORS = {
  '+': (a, b) => a + b,
  [MINUS]: (a, b) => a - b,
  '×': (a, b) => a * b, // ×
  '÷': (a, b) => a / b, // ÷
}

export const DIVIDE = '÷'
export const MULTIPLY = '×'

export const ERROR_DIVIDE_BY_ZERO = 'No se puede dividir entre cero'
export const ERROR_INVALID = 'Operación no válida'

/** Máximo de dígitos que se pueden teclear en un operando. */
const MAX_INPUT_LENGTH = 15

/**
 * Redondea para eliminar el ruido de coma flotante (p. ej. 10 ÷ 3 · 3).
 * Conserva hasta 10 decimales significativos.
 */
export function roundResult(n) {
  if (!Number.isFinite(n)) return n
  return Math.round((n + Number.EPSILON) * 1e10) / 1e10
}

/**
 * Aplica `operator` a `a` y `b`.
 * @returns {{value: number} | {error: string}} el resultado o un error como dato
 *          (nunca lanza por división entre cero ni por resultados no finitos).
 */
export function operate(a, b, operator) {
  const fn = OPERATORS[operator]
  if (!fn) return { error: ERROR_INVALID }

  if (operator === DIVIDE && b === 0) {
    return { error: ERROR_DIVIDE_BY_ZERO }
  }

  const result = fn(a, b)
  if (!Number.isFinite(result)) {
    return { error: ERROR_INVALID }
  }
  return { value: roundResult(result) }
}

/** Convierte un número a la cadena que se muestra en la pantalla de resultado. */
export function formatValue(n) {
  if (typeof n === 'string') return n
  if (!Number.isFinite(n)) return '0'
  return String(roundResult(n))
}

/* -------------------------------------------------------------------------- */
/*  Máquina de estados                                                        */
/* -------------------------------------------------------------------------- */

/**
 * @typedef {Object} CalculatorState
 * @property {string} display   Número visible (cadena que se está tecleando o resultado).
 * @property {string} history   Expresión mostrada arriba de la pantalla ("12 + 3").
 * @property {number|null} previous  Operando almacenado.
 * @property {string|null} operator  Operador pendiente.
 * @property {boolean} overwrite  Si el siguiente dígito reemplaza a `display`.
 * @property {string|null} error   Mensaje de error activo, o null.
 */

/** @type {CalculatorState} */
export const initialState = {
  display: '0',
  history: '',
  previous: null,
  operator: null,
  overwrite: true,
  error: null,
}

function inputDigit(state, digit) {
  const base = state.error ? initialState : state

  if (base.overwrite) {
    return { ...base, display: digit === '0' ? '0' : digit, overwrite: false, error: null }
  }
  if (base.display.replace('-', '').length >= MAX_INPUT_LENGTH) {
    return base
  }
  if (base.display === '0') {
    return { ...base, display: digit }
  }
  return { ...base, display: base.display + digit }
}

function chooseOperator(state, operator) {
  if (!OPERATORS[operator]) return state
  if (state.error) return state

  // Primer operador de la expresión.
  if (state.operator == null || state.previous == null) {
    const current = Number(state.display)
    return {
      ...state,
      previous: current,
      operator,
      overwrite: true,
      history: `${formatValue(current)} ${operator}`,
    }
  }

  // El usuario cambia de operador sin haber tecleado un nuevo operando.
  if (state.overwrite) {
    return {
      ...state,
      operator,
      history: `${formatValue(state.previous)} ${operator}`,
    }
  }

  // Operación encadenada: se calcula el resultado parcial y se sigue.
  const result = operate(state.previous, Number(state.display), state.operator)
  if (result.error) {
    return {
      ...initialState,
      display: '0',
      overwrite: true,
      error: result.error,
      history: `${formatValue(state.previous)} ${state.operator} ${formatValue(Number(state.display))}`,
    }
  }
  return {
    ...state,
    previous: result.value,
    display: formatValue(result.value),
    operator,
    overwrite: true,
    error: null,
    history: `${formatValue(result.value)} ${operator}`,
  }
}

function equals(state) {
  if (state.error) return state
  if (state.operator == null || state.previous == null) return state

  const right = Number(state.display)
  const result = operate(state.previous, right, state.operator)
  const expression = `${formatValue(state.previous)} ${state.operator} ${formatValue(right)} =`

  if (result.error) {
    return {
      ...initialState,
      display: '0',
      overwrite: true,
      error: result.error,
      history: expression,
    }
  }
  return {
    ...initialState,
    display: formatValue(result.value),
    overwrite: true,
    history: expression,
  }
}

function deleteLast(state) {
  if (state.error) return initialState
  if (state.overwrite) return state

  const { display } = state
  if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
    return { ...state, display: '0', overwrite: true }
  }
  return { ...state, display: display.slice(0, -1) }
}

/**
 * Reductor principal. Acciones:
 *  { type: 'digit', payload: '0'..'9' }
 *  { type: 'operator', payload: '+' | '−' | '×' | '÷' }
 *  { type: 'equals' }
 *  { type: 'clear' }
 *  { type: 'delete' }
 */
export function calculatorReducer(state, action) {
  switch (action.type) {
    case 'digit':
      return inputDigit(state, action.payload)
    case 'operator':
      return chooseOperator(state, action.payload)
    case 'equals':
      return equals(state)
    case 'clear':
      return initialState
    case 'delete':
      return deleteLast(state)
    default:
      return state
  }
}
