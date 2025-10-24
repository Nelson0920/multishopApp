/**
 * Adapter para datos de Categorías
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class CategoriasAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario con campos de la UI
       * @returns {Object} Datos adaptados para la API { name: string, discount_percentage: number, profit_percentage: number, band_management: boolean }
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const { nombre, margenGanancia, porcentajeComision, id } = formData;

            if (!nombre) {
                  throw new Error('El campo nombre es requerido');
            }

            return {
                  id: id || undefined,
                  name: nombre.trim(),
                  discount_percentage: this.parsePercentage(porcentajeComision),
                  profit_percentage: this.parsePercentage(margenGanancia),
                  band_management: false // Valor por defecto según la estructura de la API
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio { name: string, discount_percentage: number, profit_percentage: number, band_management: boolean, id: string }
       * @returns {Object} Datos adaptados para la UI { id: string, nombre: string, margenGanancia: string, porcentajeComision: string }
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const { name, discount_percentage, profit_percentage, band_management, id } = serviceData;

            return {
                  id: id || undefined,
                  nombre: name || '',
                  margenGanancia: this.formatPercentage(profit_percentage),
                  porcentajeComision: this.formatPercentage(discount_percentage),
                  cuentaVentas: '',
                  cuentaCompras: '',
                  cuentaConsumos: '',
                  cuentaDevCompras: '',
                  cuentaIVA: '',
                  auxiliarCompras: '',
                  auxiliarConsumos: '',
                  auxiliarDevCompras: '',
                  auxiliarIVA: '',
                  auxiliarIVA2: ''
            };
      }

      /**
       * Convierte un porcentaje de string a número
       * @param {string|number} percentage - Porcentaje como string o número
       * @returns {number} Porcentaje como número
       */
      static parsePercentage(percentage) {
            if (typeof percentage === 'number') {
                  return percentage;
            }
            if (typeof percentage === 'string') {
                  const cleanPercentage = percentage.replace('%', '').trim();
                  const parsed = parseFloat(cleanPercentage);
                  return isNaN(parsed) ? 0 : parsed;
            }
            return 0;
      }

      /**
       * Convierte un porcentaje de número a string con formato
       * @param {number} percentage - Porcentaje como número
       * @returns {string} Porcentaje como string con símbolo %
       */
      static formatPercentage(percentage) {
            if (typeof percentage === 'number') {
                  return `${percentage}%`;
            }
            if (typeof percentage === 'string') {
                  return percentage.includes('%') ? percentage : `${percentage}%`;
            }
            return '0%';
      }

      /**
       * Valida que los datos del formulario tengan el formato correcto
       * @param {Object} formData - Datos del formulario
       * @returns {boolean} true si el formato es válido
       */
      static isValidFormData(formData) {
            return formData &&
                  typeof formData === 'object' &&
                  typeof formData.nombre === 'string' &&
                  formData.nombre.trim().length > 0;
      }

      /**
       * Valida que los datos del servicio tengan el formato correcto
       * @param {Object} serviceData - Datos del servicio
       * @returns {boolean} true si el formato es válido
       */
      static isValidServiceData(serviceData) {
            return serviceData &&
                  typeof serviceData === 'object' &&
                  typeof serviceData.name === 'string' &&
                  serviceData.name.trim().length > 0;
      }
}

export default CategoriasAdapter;
