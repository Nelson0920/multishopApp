/**
 * Validador de negocio para Conceptos de Retención ISRL
 * Contiene todas las reglas de validación y lógica de negocio
 */
class AsignacionISRLValidator {
      /**
       * Validar formato del código ISRL
       * Formato esperado: ISRL seguido de números (ej: ISRL001)
       * @param {string} code - Código del concepto ISRL
       * @returns {boolean} true si es válido
       */
      static validateCodeFormat(code) {
            if (!code || typeof code !== 'string') {
                  return false;
            }

            const pattern = /^ISRL\d{3,}$/;
            return pattern.test(code.trim().toUpperCase());
      }

      /**
       * Validar nombre del concepto
       * @param {string} name - Nombre del concepto
       * @returns {boolean} true si es válido
       */
      static validateName(name) {
            if (!name || typeof name !== 'string') {
                  return false;
            }

            const trimmedName = name.trim();
            return trimmedName.length >= 3 && trimmedName.length <= 100;
      }

      /**
       * Validar porcentaje
       * @param {number|string} percentage - Porcentaje
       * @returns {boolean} true si es válido
       */
      static validatePercentage(percentage) {
            const numPercentage = parseFloat(percentage);
            return !isNaN(numPercentage) && numPercentage >= 0 && numPercentage <= 100;
      }

      /**
       * Validar monto sustraendo
       * @param {number|string} amount - Monto sustraendo
       * @returns {boolean} true si es válido
       */
      static validateSubtrahendAmount(amount) {
            const numAmount = parseFloat(amount);
            return !isNaN(numAmount) && numAmount >= 0;
      }

      /**
       * Validar datos completos del concepto ISRL
       * @param {Object} conceptData - Datos del concepto
       * @returns {Object} Resultado de la validación
       */
      static validateConceptData(conceptData) {
            const errors = {};
            let isValid = true;

            if (!this.validateCodeFormat(conceptData.code)) {
                  errors.code = 'El código debe tener formato ISRL seguido de números (ej: ISRL001)';
                  isValid = false;
            }

            if (!this.validateName(conceptData.name)) {
                  errors.name = 'El nombre debe tener entre 3 y 100 caracteres';
                  isValid = false;
            }

            if (!this.validatePercentage(conceptData.percentage_pn)) {
                  errors.percentage_pn = 'El porcentaje debe estar entre 0 y 100';
                  isValid = false;
            }

            if (!this.validatePercentage(conceptData.percentage_pj)) {
                  errors.percentage_pj = 'El porcentaje debe estar entre 0 y 100';
                  isValid = false;
            }

            if (!this.validateSubtrahendAmount(conceptData.subtrahend_amount_pn)) {
                  errors.subtrahend_amount_pn = 'El monto sustraendo debe ser mayor o igual a 0';
                  isValid = false;
            }

            if (conceptData.subtrahend_amount_pj && !this.validateSubtrahendAmount(conceptData.subtrahend_amount_pj)) {
                  errors.subtrahend_amount_pj = 'El monto sustraendo debe ser mayor o igual a 0';
                  isValid = false;
            }

            return {
                  isValid,
                  errors
            };
      }

      /**
       * Sanitizar datos del concepto ISRL
       * @param {Object} conceptData - Datos del concepto
       * @returns {Object} Datos sanitizados
       */
      static sanitizeConceptData(conceptData) {
            return {
                  id: conceptData.id || undefined,
                  code: conceptData.code?.trim().toUpperCase() || '',
                  name: conceptData.name?.trim() || '',
                  percentage_pn: parseFloat(conceptData.percentage_pn) || 0,
                  percentage_pj: parseFloat(conceptData.percentage_pj) || 0,
                  subtrahend_amount_pn: parseFloat(conceptData.subtrahend_amount_pn) || 0,
                  subtrahend_amount_pj: conceptData.subtrahend_amount_pj ? parseFloat(conceptData.subtrahend_amount_pj) : undefined
            };
      }
}

export default AsignacionISRLValidator;
