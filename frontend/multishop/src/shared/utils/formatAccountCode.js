/**
 * Formatea un código de cuenta con el patrón x.xx.x.xx
 * Si el texto empieza con un número, aplica el formato automáticamente
 * 
 * @param {string} value - Valor a formatear
 * @param {boolean} removeNonNumeric - Si es true, remueve todos los caracteres no numéricos antes de formatear
 * @returns {string} Valor formateado con el patrón x.xx.x.xx
 * 
 * @example
 * formatAccountCode('1101001') // '1.10.10.01'
 * formatAccountCode('1') // '1'
 * formatAccountCode('11') // '1.1'
 * formatAccountCode('110') // '1.10'
 * formatAccountCode('abc123') // 'abc123' (no empieza con número)
 */
export const formatAccountCode = (value, removeNonNumeric = false) => {
      if (!value || typeof value !== 'string') {
            return value || '';
      }

      // Si el texto no empieza con un número, no aplicar formato
      if (!/^\d/.test(value)) {
            return value;
      }

      // Limpiar el valor según el parámetro
      let numbersOnly;
      if (removeNonNumeric) {
            // Remover todos los caracteres no numéricos
            numbersOnly = value.replace(/[^0-9]/g, '');
      } else {
            // Solo remover los puntos existentes para reformatear
            numbersOnly = value.replace(/\./g, '');
      }

      // Aplicar el formato x.xx.x.xx
      if (numbersOnly.length === 0) {
            return '';
      }

      let formatted = numbersOnly.slice(0, 1); // Primer dígito (x)

      if (numbersOnly.length > 1) {
            formatted += '.' + numbersOnly.slice(1, 3); // Siguiente dos dígitos (xx)
      }

      if (numbersOnly.length > 3) {
            formatted += '.' + numbersOnly.slice(3, 4); // Siguiente dígito (x)
      }

      if (numbersOnly.length > 4) {
            formatted += '.' + numbersOnly.slice(4, 6); // Últimos dos dígitos (xx)
      }

      // Si hay más dígitos, agregarlos sin formato adicional
      if (numbersOnly.length > 6) {
            formatted += '.' + numbersOnly.slice(6);
      }

      return formatted;
};

export default formatAccountCode;
