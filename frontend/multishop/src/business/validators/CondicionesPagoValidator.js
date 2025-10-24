/**
 * Validador para datos de Condiciones de Pago
 * Implementa validaciones de negocio para el módulo de condiciones de pago
 */

class CondicionesPagoValidator {
      /**
       * Sanitiza y valida los datos de una condición de pago
       * @param {Object} condicionData - Datos de la condición de pago
       * @returns {Object} Datos sanitizados
       */
      static sanitizeCondicionData(condicionData) {
            if (!condicionData || typeof condicionData !== 'object') {
                  throw new Error('Los datos de la condición de pago son requeridos');
            }

            const sanitized = { ...condicionData };

            // Sanitizar días
            if (sanitized.days !== undefined) {
                  const days = parseInt(sanitized.days);
                  if (isNaN(days) || days < 0) {
                        sanitized.days = 0;
                  } else {
                        sanitized.days = days;
                  }
            }

            // Sanitizar porcentaje de descuento
            if (sanitized.discount_percentage !== undefined) {
                  const discountPercentage = parseFloat(sanitized.discount_percentage);
                  if (isNaN(discountPercentage) || discountPercentage < 0) {
                        sanitized.discount_percentage = 0;
                  } else if (discountPercentage > 100) {
                        sanitized.discount_percentage = 100;
                  } else {
                        sanitized.discount_percentage = discountPercentage;
                  }
            }

            return sanitized;
      }

      /**
       * Valida que los datos de la condición de pago sean válidos para crear
       * @param {Object} condicionData - Datos de la condición de pago
       * @returns {boolean} true si los datos son válidos
       */
      static validateForCreate(condicionData) {
            try {
                  const sanitized = this.sanitizeCondicionData(condicionData);
                  return sanitized.days !== undefined &&
                        sanitized.discount_percentage !== undefined &&
                        sanitized.days >= 0 &&
                        sanitized.discount_percentage >= 0 &&
                        sanitized.discount_percentage <= 100;
            } catch (error) {
                  return false;
            }
      }

      /**
       * Valida que los datos de la condición de pago sean válidos para actualizar
       * @param {Object} condicionData - Datos de la condición de pago
       * @returns {boolean} true si los datos son válidos
       */
      static validateForUpdate(condicionData) {
            try {
                  const sanitized = this.sanitizeCondicionData(condicionData);
                  return sanitized.id &&
                        sanitized.days !== undefined &&
                        sanitized.discount_percentage !== undefined &&
                        sanitized.days >= 0 &&
                        sanitized.discount_percentage >= 0 &&
                        sanitized.discount_percentage <= 100;
            } catch (error) {
                  return false;
            }
      }

      /**
       * Obtiene mensajes de error de validación
       * @param {Object} condicionData - Datos de la condición de pago
       * @returns {Array} Array de mensajes de error
       */
      static getValidationErrors(condicionData) {
            const errors = [];

            if (!condicionData || typeof condicionData !== 'object') {
                  errors.push('Los datos de la condición de pago son requeridos');
                  return errors;
            }

            if (condicionData.days === undefined || condicionData.days === null || condicionData.days === '') {
                  errors.push('El campo días es requerido');
            } else {
                  const days = parseInt(condicionData.days);
                  if (isNaN(days) || days < 0) {
                        errors.push('Los días deben ser un número entero mayor o igual a 0');
                  }
            }

            if (condicionData.discount_percentage === undefined || condicionData.discount_percentage === null || condicionData.discount_percentage === '') {
                  errors.push('El campo porcentaje de descuento es requerido');
            } else {
                  const discountPercentage = parseFloat(condicionData.discount_percentage);
                  if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
                        errors.push('El porcentaje de descuento debe estar entre 0 y 100');
                  }
            }

            return errors;
      }
}

export default CondicionesPagoValidator;
