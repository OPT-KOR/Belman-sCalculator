import Display from './Display.jsx'
import Keypad from './Keypad.jsx'
import { useCalculator } from '../logic/useCalculator.js'
import './Calculator.css'

/**
 * Componente contenedor: une el estado (hook `useCalculator`) con la pantalla
 * y el teclado. También queda habilitado el control por teclado físico.
 */
export default function Calculator() {
  const { state, ...actions } = useCalculator()

  return (
    <section className="calculator" aria-label="Calculadora básica">
      <header className="calculator-header">
        <span className="calculator-title">Calculadora</span>
        <span className="calculator-mode">Básica</span>
      </header>

      <Display history={state.history} value={state.display} error={state.error} />

      <Keypad actions={actions} />
    </section>
  )
}
