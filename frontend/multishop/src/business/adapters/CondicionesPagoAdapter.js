/**
 * Adapter para datos de Condiciones de Pago
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class CondicionesPagoAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario con campos de la UI
       * @returns {Object} Datos adaptados para la API
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const { days, discount_percentage, id } = formData;

            if (days === undefined || days === null || days === '') {
                  throw new Error('El campo días es requerido');
            }

            if (discount_percentage === undefined || discount_percentage === null || discount_percentage === '') {
                  throw new Error('El campo porcentaje de descuento es requerido');
            }

            return {
                  id: id || undefined,
                  days: parseInt(days) || 0,
                  discount_percentage: parseFloat(discount_percentage) || 0
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio de la API
       * @returns {Object} Datos adaptados para la UI
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const { days, discount_percentage, id } = serviceData;

            return {
                  id: id || undefined,
                  days: days || 0,
                  discount_percentage: discount_percentage || 0,
                  createdAt: serviceData.createdAt || ''
            };
      }

      /**
       * Valida que los datos del formulario tengan el formato correcto
       * @param {Object} formData - Datos del formulario
       * @returns {boolean} true si el formato es válido
       */
      static isValidFormData(formData) {
            return formData &&
                  typeof formData === 'object' &&
                  typeof formData.days !== 'undefined' &&
                  typeof formData.discount_percentage !== 'undefined' &&
                  formData.days !== '' &&
                  formData.discount_percentage !== '';
      }

      /**
       * Valida que los datos del servicio tengan el formato correcto
       * @param {Object} serviceData - Datos del servicio
       * @returns {boolean} true si el formato es válido
       */
      static isValidServiceData(serviceData) {
            return serviceData &&
                  typeof serviceData === 'object' &&
                  typeof serviceData.days === 'number' &&
                  typeof serviceData.discount_percentage === 'number';
      }
}

export default CondicionesPagoAdapter;
