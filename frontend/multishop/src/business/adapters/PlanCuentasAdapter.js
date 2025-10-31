/**
 * Adapter para datos de Plan de Cuentas
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class PlanCuentasAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario { nombre: string, codigo: string, auxiliar1: string, auxiliar2: string, categoria: string }
       * @returns {Object} Datos adaptados { name: string, code_account: string, auxiliary1_initials: string, auxiliary2_initials: string, category: string }
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const { nombre, codigo, auxiliar1, auxiliar2, categoria, id } = formData;

            if (!nombre || !codigo) {
                  throw new Error('Los campos nombre y código son requeridos');
            }

            return {
                  id: id || undefined,
                  name: nombre.trim(),
                  code_account: codigo.trim(),
                  auxiliary1_initials: auxiliar1?.trim() || '',
                  auxiliary2_initials: auxiliar2?.trim() || '',
                  category_account: categoria?.trim() || ''
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio { name: string, code_account: string, auxiliary1_initials: string, auxiliary2_initials: string, category: string, id: string }
       * @returns {Object} Datos adaptados { id: string, nombre: string, codigo: string, auxiliar1: string, auxiliar2: string, categoria: string }
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  return null;
            }

            const { name, code_account, auxiliary1_initials, auxiliary2_initials, category_account, id } = serviceData;

            return {
                  id: id || undefined,
                  nombre: name || '',
                  codigo: code_account || '',
                  auxiliar1: auxiliary1_initials || '',
                  auxiliar2: auxiliary2_initials || '',
                  categoria: category_account || ''
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
                  typeof formData.nombre === 'string' &&
                  typeof formData.codigo === 'string' &&
                  typeof formData.categoria === 'string';
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
                  typeof serviceData.code_account === 'string' &&
                  typeof serviceData.category_account === 'string';
      }
}

export default PlanCuentasAdapter;
