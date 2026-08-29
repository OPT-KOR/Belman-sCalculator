import Key from './Key.jsx'
import { MINUS } from '../logic/calculator.js'

/**
 * Teclado de 4 columnas. Entrada solo de enteros (sin punto decimal).
 *
 *   C    ⌫    ÷    ×
 *   7    8    9    −
 *   4    5    6    +
 *   1    2    3    =   (= ocupa dos filas)
 *   0 (ocupa tres columnas)
 */
export default function Keypad({ actions }) {
  const { inputDigit, chooseOperator, equals, clear, deleteLast } = actions
  const digit = (d) => () => inputDigit(d)
  const operator = (op) => () => chooseOperator(op)

  return (
    <div className="keys" role="group" aria-label="Teclado">
      <Key label="C" variant="func" ariaLabel="Limpiar" onPress={clear} />
      <Key label="⌫" variant="func" ariaLabel="Borrar último dígito" onPress={deleteLast} />
      <Key label="÷" variant="op" ariaLabel="Dividir" onPress={operator('÷')} />
      <Key label="×" variant="op" ariaLabel="Multiplicar" onPress={operator('×')} />

      <Key label="7" onPress={digit('7')} />
      <Key label="8" onPress={digit('8')} />
      <Key label="9" onPress={digit('9')} />
      <Key label={MINUS} variant="op" ariaLabel="Restar" onPress={operator(MINUS)} />

      <Key label="4" onPress={digit('4')} />
      <Key label="5" onPress={digit('5')} />
      <Key label="6" onPress={digit('6')} />
      <Key label="+" variant="op" ariaLabel="Sumar" onPress={operator('+')} />

      <Key label="1" onPress={digit('1')} />
      <Key label="2" onPress={digit('2')} />
      <Key label="3" onPress={digit('3')} />
      <Key label="=" variant="eq" size="tall" ariaLabel="Igual" onPress={equals} />

      <Key label="0" size="wide" onPress={digit('0')} />
    </div>
  )
}
