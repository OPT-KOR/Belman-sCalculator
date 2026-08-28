import Key from './Key.jsx'
import { MINUS } from '../logic/calculator.js'

/**
 * Teclado de 4 columnas, con el mismo layout que el prototipo:
 *
 *   C    ⌫    %    ÷
 *   7    8    9    ×
 *   4    5    6    −
 *   1    2    3    +
 *   0 (x2)    .    =
 */
export default function Keypad({ actions }) {
  const { inputDigit, inputDecimal, chooseOperator, equals, clear, deleteLast, percent } = actions

  return (
    <div className="keys" role="group" aria-label="Teclado">
      <Key label="C" variant="func" ariaLabel="Limpiar" onPress={clear} />
      <Key label="⌫" variant="func" ariaLabel="Borrar último dígito" onPress={deleteLast} />
      <Key label="%" variant="func" ariaLabel="Porcentaje" onPress={percent} />
      <Key label="÷" variant="op" ariaLabel="Dividir" onPress={() => chooseOperator('÷')} />

      <Key label="7" onPress={() => inputDigit('7')} />
      <Key label="8" onPress={() => inputDigit('8')} />
      <Key label="9" onPress={() => inputDigit('9')} />
      <Key label="×" variant="op" ariaLabel="Multiplicar" onPress={() => chooseOperator('×')} />

      <Key label="4" onPress={() => inputDigit('4')} />
      <Key label="5" onPress={() => inputDigit('5')} />
      <Key label="6" onPress={() => inputDigit('6')} />
      <Key label={MINUS} variant="op" ariaLabel="Restar" onPress={() => chooseOperator(MINUS)} />

      <Key label="1" onPress={() => inputDigit('1')} />
      <Key label="2" onPress={() => inputDigit('2')} />
      <Key label="3" onPress={() => inputDigit('3')} />
      <Key label="+" variant="op" ariaLabel="Sumar" onPress={() => chooseOperator('+')} />

      <Key label="0" wide onPress={() => inputDigit('0')} />
      <Key label="." ariaLabel="Punto decimal" onPress={inputDecimal} />
      <Key label="=" variant="eq" ariaLabel="Igual" onPress={equals} />
    </div>
  )
}
