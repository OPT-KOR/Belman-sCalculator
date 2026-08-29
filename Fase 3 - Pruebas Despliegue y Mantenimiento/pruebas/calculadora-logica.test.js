import { describe, it, expect } from 'vitest'
import {
  operate,
  roundResult,
  calculatorReducer,
  initialState,
  MINUS,
  ERROR_DIVIDE_BY_ZERO,
  ERROR_INVALID,
} from '../../Fase 2 - Diseño e Implementacion/implementacion/src/logic/calculator.js'

/* Utilidad: aplica una secuencia de acciones partiendo del estado inicial. */
function run(actions, from = initialState) {
  return actions.reduce((state, action) => calculatorReducer(state, action), from)
}
const digit = (d) => ({ type: 'digit', payload: String(d) })
const digits = (str) => [...String(str)].map(digit)
const op = (o) => ({ type: 'operator', payload: o })
const equals = { type: 'equals' }
const clear = { type: 'clear' }
const del = { type: 'delete' }

describe('operate() — las 4 operaciones básicas', () => {
  it('suma', () => {
    expect(operate(2, 3, '+')).toEqual({ value: 5 })
  })
  it('resta', () => {
    expect(operate(10, 4, MINUS)).toEqual({ value: 6 })
  })
  it('multiplicación', () => {
    expect(operate(6, 7, '×')).toEqual({ value: 42 })
  })
  it('división exacta', () => {
    expect(operate(20, 5, '÷')).toEqual({ value: 4 })
  })
  it('división con resultado decimal', () => {
    expect(operate(1, 4, '÷')).toEqual({ value: 0.25 })
  })
  it('números negativos', () => {
    expect(operate(-5, -3, '+')).toEqual({ value: -8 })
    expect(operate(-5, 3, '×')).toEqual({ value: -15 })
  })
})

describe('operate() — casos límite', () => {
  it('división entre cero devuelve un error como dato, no lanza', () => {
    expect(() => operate(5, 0, '÷')).not.toThrow()
    expect(operate(5, 0, '÷')).toEqual({ error: ERROR_DIVIDE_BY_ZERO })
  })
  it('0 ÷ 0 también es error controlado', () => {
    expect(operate(0, 0, '÷')).toEqual({ error: ERROR_DIVIDE_BY_ZERO })
  })
  it('operador no soportado devuelve error', () => {
    expect(operate(2, 2, '^')).toEqual({ error: ERROR_INVALID })
  })
  it('resultado no finito (overflow) se reporta como error', () => {
    expect(operate(1e308, 1e308, '×')).toEqual({ error: ERROR_INVALID })
  })
})

describe('roundResult() — ruido de coma flotante en divisiones', () => {
  it('quita el ruido de 10 ÷ 3', () => {
    expect(roundResult(10 / 3)).toBe(3.3333333333)
  })
  it('0.1 + 0.2 redondea a 0.3', () => {
    expect(roundResult(0.1 + 0.2)).toBe(0.3)
  })
})

describe('calculatorReducer — entrada de dígitos (solo enteros)', () => {
  it('parte de "0"', () => {
    expect(initialState.display).toBe('0')
  })
  it('teclear dígitos reemplaza el 0 inicial', () => {
    expect(run(digits('123')).display).toBe('123')
  })
  it('no existe entrada de punto decimal: la acción "decimal" se ignora', () => {
    expect(run([{ type: 'decimal' }]).display).toBe('0')
    expect(run([...digits('12'), { type: 'decimal' }, ...digits('5')]).display).toBe('125')
  })
  it('una acción desconocida no cambia el estado', () => {
    expect(run([{ type: 'porcentaje' }])).toEqual(initialState)
  })
})

describe('calculatorReducer — operaciones simples', () => {
  it('2 + 3 = 5', () => {
    const s = run([...digits('2'), op('+'), ...digits('3'), equals])
    expect(s.display).toBe('5')
    expect(s.history).toBe('2 + 3 =')
  })
  it('7 × 8 = 56', () => {
    expect(run([...digits('7'), op('×'), ...digits('8'), equals]).display).toBe('56')
  })
  it('9 − 4 = 5 (con signo menos real)', () => {
    expect(run([...digits('9'), op(MINUS), ...digits('4'), equals]).display).toBe('5')
  })
  it('20 ÷ 5 = 4', () => {
    expect(run([...digits('20'), op('÷'), ...digits('5'), equals]).display).toBe('4')
  })
})

describe('calculatorReducer — división entre cero no rompe la app', () => {
  it('5 ÷ 0 = deja estado de error', () => {
    const s = run([...digits('5'), op('÷'), ...digits('0'), equals])
    expect(s.error).toBe(ERROR_DIVIDE_BY_ZERO)
    expect(s.display).toBe('0')
    expect(s.history).toBe('5 ÷ 0 =')
  })
  it('se recupera al pulsar C', () => {
    const s = run([...digits('5'), op('÷'), ...digits('0'), equals, clear])
    expect(s).toEqual(initialState)
  })
  it('se recupera al teclear un dígito nuevo', () => {
    const s = run([...digits('5'), op('÷'), ...digits('0'), equals, digit('7')])
    expect(s.error).toBeNull()
    expect(s.display).toBe('7')
  })
  it('pulsar = otra vez sobre el error no lanza', () => {
    expect(() =>
      run([...digits('5'), op('÷'), ...digits('0'), equals, equals]),
    ).not.toThrow()
  })
})

describe('calculatorReducer — operaciones encadenadas', () => {
  it('2 + 3 + 4 = 9 (calcula el parcial al encadenar)', () => {
    const s = run([...digits('2'), op('+'), ...digits('3'), op('+'), ...digits('4'), equals])
    expect(s.display).toBe('9')
  })
  it('2 + 3 × 4 = 20 (evaluación de izquierda a derecha, sin precedencia)', () => {
    const s = run([...digits('2'), op('+'), ...digits('3'), op('×'), ...digits('4'), equals])
    expect(s.display).toBe('20')
  })
  it('100 − 50 − 25 = 25', () => {
    const s = run([
      ...digits('100'), op(MINUS), ...digits('50'), op(MINUS), ...digits('25'), equals,
    ])
    expect(s.display).toBe('25')
  })
  it('cadena que pasa por división entre cero corta con error al encadenar', () => {
    // Al pulsar el siguiente operador se evalúa el parcial 8 ÷ 0 -> error.
    const s = run([...digits('8'), op('÷'), ...digits('0'), op('+')])
    expect(s.error).toBe(ERROR_DIVIDE_BY_ZERO)
  })
  it('cambiar de operador sin teclear operando usa el último', () => {
    const s = run([...digits('6'), op('+'), op('×'), ...digits('2'), equals])
    expect(s.display).toBe('12')
  })
  it('el resultado de = puede encadenarse en una nueva operación', () => {
    const s = run([
      ...digits('2'), op('+'), ...digits('3'), equals, // 5
      op('×'), ...digits('10'), equals, // 50
    ])
    expect(s.display).toBe('50')
  })
  it('encadena sobre un resultado decimal de división: 10 ÷ 4 × 2 = 5', () => {
    const s = run([
      ...digits('10'), op('÷'), ...digits('4'), // parcial 2.5
      op('×'), ...digits('2'), equals,
    ])
    expect(s.display).toBe('5')
  })
})

describe('calculatorReducer — limpiar (C) y borrar (⌫)', () => {
  it('C restablece por completo', () => {
    const s = run([...digits('123'), op('+'), ...digits('45'), clear])
    expect(s).toEqual(initialState)
  })
  it('⌫ quita el último dígito', () => {
    expect(run([...digits('123'), del]).display).toBe('12')
  })
  it('⌫ sobre un dígito deja "0"', () => {
    expect(run([...digits('7'), del]).display).toBe('0')
  })
  it('⌫ sobre estado de error lo limpia', () => {
    const s = run([...digits('5'), op('÷'), ...digits('0'), equals, del])
    expect(s).toEqual(initialState)
  })
})

describe('calculatorReducer — la división es la única que puede dar decimales', () => {
  it('10 ÷ 4 = 2.5', () => {
    expect(run([...digits('10'), op('÷'), ...digits('4'), equals]).display).toBe('2.5')
  })
  it('7 ÷ 2 = 3.5', () => {
    expect(run([...digits('7'), op('÷'), ...digits('2'), equals]).display).toBe('3.5')
  })
  it('10 ÷ 3 se redondea a 10 decimales', () => {
    expect(run([...digits('10'), op('÷'), ...digits('3'), equals]).display).toBe('3.3333333333')
  })
  it('sumar/restar/multiplicar enteros siempre da un entero', () => {
    expect(run([...digits('7'), op('+'), ...digits('8'), equals]).display).toBe('15')
    expect(run([...digits('7'), op('×'), ...digits('3'), equals]).display).toBe('21')
  })
})
