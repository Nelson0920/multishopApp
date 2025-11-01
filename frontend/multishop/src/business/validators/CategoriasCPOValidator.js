/**
 * Validador para datos de Categorías CPO
 * Implementa validaciones de negocio para el módulo de categorías CPO
 */

class CategoriasCPOValidator {
      /**
       * Sanitiza y valida los datos de una categoría CPO
       * @param {Object} categoriaData - Datos de la categoría CPO
       * @returns {Object} Datos sanitizados
       */
      static sanitizeCategoriaData(categoriaData) {
            if (!categoriaData || typeof categoriaData !== 'object') {
                  throw new Error('Los datos de la categoría CPO son requeridos');
            }

            const sanitized = { ...categoriaData };

            // Sanitizar nombre
            if (sanitized.name) {
                  sanitized.name = sanitized.name.trim();
                  if (sanitized.name.length === 0) {
                        throw new Error('El nombre de la categoría CPO no puede estar vacío');
                  }
                  if (sanitized.name.length > 100) {
                        throw new Error('El nombre de la categoría CPO no puede exceder 100 caracteres');
                  }
            }

            // Sanitizar límite de crédito
            if (sanitized.credit_limit !== undefined) {
                  const creditLimit = parseFloat(sanitized.credit_limit);
                  if (isNaN(creditLimit) || creditLimit < 0) {
                        sanitized.credit_limit = 0;
                  } else {
                        sanitized.credit_limit = creditLimit;
                  }
            }

            // Sanitizar términos de crédito
            if (sanitized.credit_terms !== undefined) {
                  const creditTerms = parseFloat(sanitized.credit_terms);
                  if (isNaN(creditTerms) || creditTerms < 0) {
                        sanitized.credit_terms = 0;
                  } else {
                        sanitized.credit_terms = creditTerms;
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

            // Sanitizar día límite
            if (sanitized.deadline_day !== undefined) {
                  const deadlineDay = parseInt(sanitized.deadline_day);
                  if (isNaN(deadlineDay) || deadlineDay < 1) {
                        sanitized.deadline_day = 365;
                  } else {
                        sanitized.deadline_day = deadlineDay;
                  }
            }

            return sanitized;
      }

      /**
       * Valida que los datos de la categoría CPO sean válidos para crear
       * @param {Object} categoriaData - Datos de la categoría CPO
       * @returns {boolean} true si los datos son válidos
       */
      static validateForCreate(categoriaData) {
            try {
                  const sanitized = this.sanitizeCategoriaData(categoriaData);
                  return sanitized.name && sanitized.name.length > 0;
            } catch (error) {
                  console.log('error validateForCreate', error);
                  return false;
            }
      }

      /**
       * Valida que los datos de la categoría CPO sean válidos para actualizar
       * @param {Object} categoriaData - Datos de la categoría CPO
       * @returns {boolean} true si los datos son válidos
       */
      static validateForUpdate(categoriaData) {
            try {
                  const sanitized = this.sanitizeCategoriaData(categoriaData);
                  return sanitized.id && sanitized.name && sanitized.name.length > 0;
            } catch (error) {
                  console.log('error validateForUpdate', error);
                  return false;
            }
      }

      /**
       * Obtiene mensajes de error de validación
       * @param {Object} categoriaData - Datos de la categoría CPO
       * @returns {Array} Array de mensajes de error
       */
      static getValidationErrors(categoriaData) {
            const errors = [];

            if (!categoriaData || typeof categoriaData !== 'object') {
                  errors.push('Los datos de la categoría CPO son requeridos');
                  return errors;
            }

            if (!categoriaData.name || categoriaData.name.trim().length === 0) {
                  errors.push('El nombre de la categoría CPO es requerido');
            }

            if (categoriaData.name && categoriaData.name.length > 100) {
                  errors.push('El nombre de la categoría CPO no puede exceder 100 caracteres');
            }

            if (categoriaData.credit_limit !== undefined) {
                  const creditLimit = parseFloat(categoriaData.credit_limit);
                  if (isNaN(creditLimit) || creditLimit < 0) {
                        errors.push('El límite de crédito debe ser un número válido mayor o igual a 0');
                  }
            }

            if (categoriaData.credit_terms !== undefined) {
                  const creditTerms = parseFloat(categoriaData.credit_terms);
                  if (isNaN(creditTerms) || creditTerms < 0) {
                        errors.push('Los términos de crédito deben ser un número válido mayor o igual a 0');
                  }
            }

            if (categoriaData.discount_percentage !== undefined) {
                  const discountPercentage = parseFloat(categoriaData.discount_percentage);
                  if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
                        errors.push('El porcentaje de descuento debe estar entre 0 y 100');
                  }
            }

            if (categoriaData.deadline_day !== undefined) {
                  const deadlineDay = parseInt(categoriaData.deadline_day);
                  if (isNaN(deadlineDay) || deadlineDay < 1) {
                        errors.push('El día límite debe ser un número entero mayor a 0');
                  }
            }

            return errors;
      }
}

export default CategoriasCPOValidator;