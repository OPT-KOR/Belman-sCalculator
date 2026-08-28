import Calculator from './components/Calculator.jsx'

export default function App() {
  return (
    <>
      <div className="page-label">Calculadora Web Básica · React</div>
      <main className="app">
        <Calculator />
      </main>
      <div className="footnote">
        Suma · resta · multiplicación · división — con manejo interno de errores
      </div>
    </>
  )
}
