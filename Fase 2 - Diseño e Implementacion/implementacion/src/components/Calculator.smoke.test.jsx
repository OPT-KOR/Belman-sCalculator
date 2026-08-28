import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Calculator from './Calculator.jsx'

describe('Calculator (render)', () => {
  it('monta la calculadora con el valor inicial "0"', () => {
    render(<Calculator />)
    expect(screen.getByLabelText('Calculadora básica')).toBeInTheDocument()
    expect(screen.getByTestId('result')).toHaveTextContent('0')
  })

  it('muestra las 4 teclas de operación básicas', () => {
    render(<Calculator />)
    for (const label of ['Sumar', 'Restar', 'Multiplicar', 'Dividir']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
  })
})
