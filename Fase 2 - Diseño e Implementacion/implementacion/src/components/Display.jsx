/**
 * Pantalla de la calculadora: línea de historial (expresión) y línea de resultado.
 * Cuando hay un error, la línea de resultado muestra el mensaje de error.
 */
export default function Display({ history, value, error }) {
  return (
    <div className="screen" role="region" aria-label="Pantalla de la calculadora">
      <div className="screen-history" data-testid="history">
        {history || ' '}
      </div>
      {error ? (
        <div className="screen-error" role="alert" data-testid="error">
          {error}
        </div>
      ) : (
        <div className="screen-result" data-testid="result" aria-live="polite">
          {value}
        </div>
      )}
    </div>
  )
}
