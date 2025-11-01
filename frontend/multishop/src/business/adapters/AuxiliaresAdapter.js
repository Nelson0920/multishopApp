/**
 * Adapter para datos de Auxiliares
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class AuxiliaresAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario { auxiliar: string, nombre: string }
       * @returns {Object} Datos adaptados { name: string, auxiliary_code: string }
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const { auxiliar, nombre, id } = formData;

            if (!auxiliar || !nombre) {
                  throw new Error('Los campos auxiliar y nombre son requeridos');
            }

            return {
                  id: id || undefined,
                  name: nombre.trim(),
                  auxiliary_code: auxiliar.trim()
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio { name: string, auxiliary_code: string, id: string }
       * @returns {Object} Datos adaptados { id: string, auxiliar: string, nombre: string }
       */
      static adaptServiceToFormData(serviceData) {
            if (typeof serviceData === 'string') {
                  return {
                        id: serviceData,
                        auxiliar: serviceData,
                        nombre: serviceData
                  };
            }
            if (!serviceData || typeof serviceData !== 'object') {
                  return null;
            }


            const { name, auxiliary_code, id } = serviceData;

            return {
                  id: id || undefined,
                  auxiliar: auxiliary_code || '',
                  nombre: name || ''
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
                  typeof formData.auxiliar === 'string' &&
                  typeof formData.nombre === 'string';
      }

      /**
       * Valida que los datos del servicio tengan el formato correcto
       * @param {Object} serviceData - Datos del servicio
       * @returns {boolean} true si el formato es válido
       */
      static isValidServiceData(serviceData) {
            return serviceData &&
                  typeof serviceData === 'object' &&
                  typeof serviceData.auxiliary_code === 'string' &&
                  typeof serviceData.name === 'string';
      }
}

export default AuxiliaresAdapter;
