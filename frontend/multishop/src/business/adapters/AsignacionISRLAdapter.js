/**
 * Adapter para datos de Conceptos de Retención ISRL
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class AsignacionISRLAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario { code: string, name: string, percentage_pn: number, percentage_pj: number, subtrahend_amount_pn: number, subtrahend_amount_pj: number }
       * @returns {Object} Datos adaptados para el servicio
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const { code, name, percentage_pn, percentage_pj, subtrahend_amount_pn, subtrahend_amount_pj, id } = formData;

            if (!code || !name || percentage_pn === undefined || percentage_pj === undefined || subtrahend_amount_pn === undefined) {
                  throw new Error('Los campos code, name, percentage_pn, percentage_pj y subtrahend_amount_pn son requeridos');
            }

            return {
                  id: id || undefined,
                  code: code.trim(),
                  name: name.trim(),
                  percentage_pn: parseFloat(percentage_pn),
                  percentage_pj: parseFloat(percentage_pj),
                  subtrahend_amount_pn: parseFloat(subtrahend_amount_pn),
                  subtrahend_amount_pj: subtrahend_amount_pj ? parseFloat(subtrahend_amount_pj) : undefined
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio
       * @returns {Object} Datos adaptados para el formulario
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const { code, name, percentage_pn, percentage_pj, subtrahend_amount_pn, subtrahend_amount_pj, id } = serviceData;

            return {
                  id: id || undefined,
                  code: code || '',
                  name: name || '',
                  percentage_pn: percentage_pn || '',
                  percentage_pj: percentage_pj || '',
                  subtrahend_amount_pn: subtrahend_amount_pn || '',
                  subtrahend_amount_pj: subtrahend_amount_pj || ''
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
                  typeof formData.code === 'string' &&
                  typeof formData.name === 'string' &&
                  (typeof formData.percentage_pn === 'number' || typeof formData.percentage_pn === 'string') &&
                  (typeof formData.percentage_pj === 'number' || typeof formData.percentage_pj === 'string') &&
                  (typeof formData.subtrahend_amount_pn === 'number' || typeof formData.subtrahend_amount_pn === 'string');
      }

      /**
       * Valida que los datos del servicio tengan el formato correcto
       * @param {Object} serviceData - Datos del servicio
       * @returns {boolean} true si el formato es válido
       */
      static isValidServiceData(serviceData) {
            return serviceData &&
                  typeof serviceData === 'object' &&
                  typeof serviceData.code === 'string' &&
                  typeof serviceData.name === 'string' &&
                  typeof serviceData.percentage_pn === 'number' &&
                  typeof serviceData.percentage_pj === 'number' &&
                  typeof serviceData.subtrahend_amount_pn === 'number';
      }
}

export default AsignacionISRLAdapter;
