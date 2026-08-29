import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../../Fase 2 - Diseño e Implementacion/implementacion/src/components/Calculator.jsx'

/** Pulsa una secuencia de teclas por su nombre accesible / texto. */
async function press(user, ...labels) {
  const nameMap = {
    '+': 'Sumar',
    '-': 'Restar',
    '−': 'Restar',
    '×': 'Multiplicar',
    '*': 'Multiplicar',
    '÷': 'Dividir',
    '/': 'Dividir',
    '=': 'Igual',
    C: 'Limpiar',
    del: 'Borrar último dígito',
  }
  for (const label of labels) {
    const name = nameMap[label] ?? label
    await user.click(screen.getByRole('button', { name }))
  }
}
const result = () => screen.getByTestId('result').textContent.trim()
const history = () => screen.getByTestId('history').textContent.trim()

describe('Calculadora (UI) — operaciones básicas con clics', () => {
  it('suma: 12 + 8 = 20', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '1', '2', '+', '8', '=')
    expect(result()).toBe('20')
    expect(history()).toContain('12 + 8')
  })

  it('resta: 50 − 15 = 35', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '5', '0', '−', '1', '5', '=')
    expect(result()).toBe('35')
  })

  it('multiplicación: 9 × 9 = 81', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '9', '×', '9', '=')
    expect(result()).toBe('81')
  })

  it('división: 144 ÷ 12 = 12', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '1', '4', '4', '÷', '1', '2', '=')
    expect(result()).toBe('12')
  })
})

describe('Calculadora (UI) — solo enteros (sin punto decimal)', () => {
  it('no hay tecla de punto decimal', () => {
    render(<Calculator />)
    expect(screen.queryByRole('button', { name: 'Punto decimal' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '.' })).not.toBeInTheDocument()
  })

  it('no hay tecla de porcentaje', () => {
    render(<Calculator />)
    expect(screen.queryByRole('button', { name: 'Porcentaje' })).not.toBeInTheDocument()
  })

  it('el teclado físico ignora el punto: "1.5" se teclea como "15"', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await user.keyboard('1.5')
    expect(result()).toBe('15')
  })
})

describe('Calculadora (UI) — división entre cero', () => {
  it('muestra un mensaje de error y la app sigue viva', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '7', '÷', '0', '=')

    const error = screen.getByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error.textContent).toMatch(/dividir entre cero/i)
    // el contenedor de la calculadora sigue montado
    expect(screen.getByLabelText('Calculadora básica')).toBeInTheDocument()
  })

  it('se recupera al pulsar C', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '7', '÷', '0', '=', 'C')
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(result()).toBe('0')
  })

  it('se recupera empezando a teclear otro número', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '7', '÷', '0', '=', '5')
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(result()).toBe('5')
  })
})

describe('Calculadora (UI) — división con decimales y encadenadas', () => {
  it('la división puede dar decimales: 10 ÷ 4 = 2.5', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '1', '0', '÷', '4', '=')
    expect(result()).toBe('2.5')
  })

  it('operación encadenada: 2 + 3 + 4 = 9', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '2', '+', '3', '+', '4', '=')
    expect(result()).toBe('9')
  })

  it('encadena el resultado anterior: (2 + 3) × 10 = 50', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '2', '+', '3', '=', '×', '1', '0', '=')
    expect(result()).toBe('50')
  })
})

describe('Calculadora (UI) — limpiar y borrar', () => {
  it('⌫ borra el último dígito tecleado', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '1', '2', '3', 'del')
    expect(result()).toBe('12')
  })

  it('C reinicia todo', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await press(user, '9', '9', '+', '1', 'C')
    expect(result()).toBe('0')
    expect(history()).toBe('')
  })
})

describe('Calculadora (UI) — teclado físico', () => {
  it('permite escribir la operación con el teclado', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await user.keyboard('25*4=')
    expect(result()).toBe('100')
  })

  it('Escape limpia y Backspace borra', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await user.keyboard('123{Backspace}')
    expect(result()).toBe('12')
    await user.keyboard('{Escape}')
    expect(result()).toBe('0')
  })
})
