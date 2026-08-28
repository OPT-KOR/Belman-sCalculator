/**
 * Botón individual del teclado.
 * @param {string} label     Texto visible.
 * @param {'num'|'op'|'eq'|'func'} [variant='num']  Estilo del botón.
 * @param {boolean} [wide=false]  Ocupa dos columnas (tecla "0").
 * @param {() => void} onPress  Acción al pulsar.
 * @param {string} [ariaLabel]  Etiqueta accesible si el label es un símbolo.
 */
export default function Key({ label, variant = 'num', wide = false, onPress, ariaLabel }) {
  const className = ['key', variant !== 'num' && variant, wide && 'zero']
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={className} onClick={onPress} aria-label={ariaLabel ?? label}>
      {label}
    </button>
  )
}
