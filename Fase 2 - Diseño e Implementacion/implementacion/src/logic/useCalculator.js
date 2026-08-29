import { useCallback, useEffect, useReducer } from 'react'
import { calculatorReducer, initialState, MINUS } from './calculator.js'

/** Mapa de teclas físicas del teclado a acciones del reductor. */
function keyToAction(key) {
  if (key >= '0' && key <= '9') return { type: 'digit', payload: key }
  switch (key) {
    case '+':
      return { type: 'operator', payload: '+' }
    case '-':
      return { type: 'operator', payload: MINUS }
    case '*':
    case 'x':
    case 'X':
      return { type: 'operator', payload: '×' }
    case '/':
      return { type: 'operator', payload: '÷' }
    case '=':
    case 'Enter':
      return { type: 'equals' }
    case 'Backspace':
      return { type: 'delete' }
    case 'Escape':
      return { type: 'clear' }
    default:
      return null
  }
}

/**
 * Hook que expone el estado de la calculadora y los manejadores de UI,
 * además de habilitar el control por teclado físico.
 */
export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  const inputDigit = useCallback((d) => dispatch({ type: 'digit', payload: String(d) }), [])
  const chooseOperator = useCallback((op) => dispatch({ type: 'operator', payload: op }), [])
  const equals = useCallback(() => dispatch({ type: 'equals' }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const deleteLast = useCallback(() => dispatch({ type: 'delete' }), [])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      const action = keyToAction(event.key)
      if (!action) return
      event.preventDefault()
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return {
    state,
    inputDigit,
    chooseOperator,
    equals,
    clear,
    deleteLast,
  }
}
