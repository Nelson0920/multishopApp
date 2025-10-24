/**
 * Validador de negocio para Plan de Cuentas
 * Contiene todas las reglas de validación y lógica de negocio
 */
class PlanCuentasValidator {
      /**
       * Validar formato del código de cuenta
       * Formato esperado: N.N.N.N (números separados por puntos)
       * @param {string} codigo - Código de la cuenta
       * @returns {boolean} true si es válido
       */
      static validateCodigoFormat(codigo) {
            if (!codigo || typeof codigo !== 'string') {
                  return false;
            }

            const pattern = /^\d+(\.\d+)*$/;
            return pattern.test(codigo.trim());
      }

      /**
       * Validar nombre de la cuenta
       * @param {string} nombre - Nombre de la cuenta
       * @returns {boolean} true si es válido
       */
      static validateNombre(nombre) {
            if (!nombre || typeof nombre !== 'string') {
                  return false;
            }

            const trimmedNombre = nombre.trim();
            return trimmedNombre.length >= 3 && trimmedNombre.length <= 50;
      }

      /**
       * Validar formato de iniciales auxiliares
       * Formato esperado: "A, B, C" (letras separadas por comas y espacios)
       * @param {string} iniciales - Iniciales auxiliares
       * @returns {boolean} true si es válido
       */
      static validateInicialesFormat(iniciales) {
            if (!iniciales || typeof iniciales !== 'string') {
                  return true; // Campo opcional
            }

            const trimmedIniciales = iniciales.trim();
            if (trimmedIniciales === '') {
                  return true; // Campo vacío es válido
            }

            const pattern = /^[A-Z](,\s*[A-Z])*$/;
            return pattern.test(trimmedIniciales);
      }

      /**
       * Validar categoría de la cuenta
       * @param {string} categoria - Categoría de la cuenta
       * @returns {boolean} true si es válido
       */
      static validateCategoria(categoria) {
            if (!categoria || typeof categoria !== 'string') {
                  return false;
            }

            const validCategories = ['A', 'P', 'O', 'G'];
            return validCategories.includes(categoria.toUpperCase().trim());
      }

      /**
       * Validar datos completos de la cuenta
       * @param {Object} cuentaData - Datos de la cuenta
       * @returns {Object} Resultado de la validación
       */
      static validateCuentaData(cuentaData) {
            const errors = {};
            let isValid = true;

            if (!this.validateCodigoFormat(cuentaData.codigo)) {
                  errors.codigo = 'El código debe tener formato N.N.N.N (números separados por puntos)';
                  isValid = false;
            }

            if (!this.validateNombre(cuentaData.nombre)) {
                  errors.nombre = 'El nombre debe tener entre 3 y 50 caracteres';
                  isValid = false;
            }

            if (cuentaData.auxiliar1 && !this.validateInicialesFormat(cuentaData.auxiliar1)) {
                  errors.auxiliar1 = 'Las iniciales deben tener formato "A, B, C" (letras separadas por comas)';
                  isValid = false;
            }

            if (cuentaData.auxiliar2 && !this.validateInicialesFormat(cuentaData.auxiliar2)) {
                  errors.auxiliar2 = 'Las iniciales deben tener formato "A, B, C" (letras separadas por comas)';
                  isValid = false;
            }

            if (!this.validateCategoria(cuentaData.categoria)) {
                  errors.categoria = 'Debe seleccionar una categoría válida';
                  isValid = false;
            }

            return {
                  isValid,
                  errors
            };
      }

      /**
       * Sanitizar datos de la cuenta
       * @param {Object} cuentaData - Datos de la cuenta
       * @returns {Object} Datos sanitizados
       */
      static sanitizeCuentaData(cuentaData) {
            return {
                  id: cuentaData.id || undefined,
                  nombre: cuentaData.nombre?.trim().toUpperCase() || '',
                  codigo: cuentaData.codigo?.trim() || '',
                  auxiliar1: cuentaData.auxiliar1?.trim().toUpperCase() || '',
                  auxiliar2: cuentaData.auxiliar2?.trim().toUpperCase() || '',
                  categoria: cuentaData.categoria?.trim() || ''
            };
      }
}

export default PlanCuentasValidator;
