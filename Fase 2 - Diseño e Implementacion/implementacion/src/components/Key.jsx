/**
 * Botón individual del teclado.
 * @param {string} label     Texto visible.
 * @param {'num'|'op'|'eq'|'func'} [variant='num']  Estilo del botón.
 * @param {'wide'|'tall'} [size]  `wide` ocupa 3 columnas (tecla "0"); `tall` ocupa 2 filas (tecla "=").
 * @param {() => void} onPress  Acción al pulsar.
 * @param {string} [ariaLabel]  Etiqueta accesible si el label es un símbolo.
 */
export default function Key({ label, variant = 'num', size, onPress, ariaLabel }) {
  const className = ['key', variant !== 'num' && variant, size && `key--${size}`]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={className} onClick={onPress} aria-label={ariaLabel ?? label}>
      {label}
    </button>
  )
}
