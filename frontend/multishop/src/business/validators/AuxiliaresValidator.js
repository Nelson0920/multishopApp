/**
 * Validador de negocio para Auxiliares Contables
 * Contiene todas las reglas de validación y lógica de negocio
 */
class AuxiliaresValidator {
      /**
       * Validar formato del código auxiliar
       * Formato esperado: L (1 letra)
       * @param {string} auxiliar - Código del auxiliar
       * @returns {boolean} true si es válido
       */
      static validateAuxiliarFormat(auxiliar) {
            if (!auxiliar || typeof auxiliar !== 'string') {
                  return false;
            }

            const pattern = /^[A-Z]$/;
            return pattern.test(auxiliar.trim());
      }

      /**
       * Validar nombre del auxiliar
       * @param {string} nombre - Nombre del auxiliar
       * @returns {boolean} true si es válido
       */
      static validateNombre(nombre) {
            if (!nombre || typeof nombre !== 'string') {
                  return false;
            }

            const trimmedNombre = nombre.trim();
            return trimmedNombre.length >= 3 && trimmedNombre.length <= 20;
      }

      /**
       * Validar datos completos del auxiliar
       * @param {Object} auxiliarData - Datos del auxiliar
       * @returns {Object} Resultado de la validación
       */
      static validateAuxiliarData(auxiliarData) {
            const errors = {};
            let isValid = true;

            if (!this.validateAuxiliarFormat(auxiliarData.auxiliar)) {
                  errors.auxiliar = 'El código auxiliar debe tener formato N.1234567 (1 letra + punto + 7 números)';
                  isValid = false;
            }

            if (!this.validateNombre(auxiliarData.nombre)) {
                  errors.nombre = 'El nombre debe tener entre 3 y 20 caracteres';
                  isValid = false;
            }

            return {
                  isValid,
                  errors
            };
      }


      /**
       * Sanitizar datos del auxiliar
       * @param {Object} auxiliarData - Datos del auxiliar
       * @returns {Object} Datos sanitizados
       */
      static sanitizeAuxiliarData(auxiliarData) {
            return {
                  id: auxiliarData.id || undefined,
                  auxiliar: auxiliarData.auxiliar?.trim().toUpperCase() || '',
                  nombre: auxiliarData.nombre?.trim().toUpperCase() || ''
            };
      }
}

export default AuxiliaresValidator;
