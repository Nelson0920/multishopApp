/**
 * Validador para datos de Categorías
 * Implementa validaciones de negocio para el módulo de categorías
 */

class CategoriasValidator {
      /**
       * Sanitiza y valida los datos de una categoría
       * @param {Object} categoriaData - Datos de la categoría
       * @returns {Object} Datos sanitizados
       */
      static sanitizeCategoriaData(categoriaData) {
            if (!categoriaData || typeof categoriaData !== 'object') {
                  throw new Error('Los datos de la categoría son requeridos');
            }

            const sanitized = { ...categoriaData };

            // Sanitizar nombre
            if (sanitized.nombre) {
                  sanitized.nombre = sanitized.nombre.trim();
                  if (sanitized.nombre.length === 0) {
                        throw new Error('El nombre de la categoría no puede estar vacío');
                  }
                  if (sanitized.nombre.length > 100) {
                        throw new Error('El nombre de la categoría no puede exceder 100 caracteres');
                  }
            }

            // Sanitizar porcentajes
            if (sanitized.margenGanancia) {
                  sanitized.margenGanancia = this.sanitizePercentage(sanitized.margenGanancia);
            }

            if (sanitized.porcentajeComision) {
                  sanitized.porcentajeComision = this.sanitizePercentage(sanitized.porcentajeComision);
            }

            return sanitized;
      }

      /**
       * Sanitiza un valor de porcentaje
       * @param {string|number} percentage - Porcentaje a sanitizar
       * @returns {string} Porcentaje sanitizado
       */
      static sanitizePercentage(percentage) {
            if (typeof percentage === 'number') {
                  if (percentage < 0) return '0%';
                  if (percentage > 100) return '100%';
                  return `${percentage}%`;
            }

            if (typeof percentage === 'string') {
                  const cleanPercentage = percentage.replace('%', '').trim();
                  const parsed = parseFloat(cleanPercentage);

                  if (isNaN(parsed)) return '0%';
                  if (parsed < 0) return '0%';
                  if (parsed > 100) return '100%';

                  return `${parsed}%`;
            }

            return '0%';
      }

      /**
       * Valida que los datos de la categoría sean válidos para crear
       * @param {Object} categoriaData - Datos de la categoría
       * @returns {boolean} true si los datos son válidos
       */
      static validateForCreate(categoriaData) {
            try {
                  const sanitized = this.sanitizeCategoriaData(categoriaData);
                  return sanitized.nombre && sanitized.nombre.length > 0;
            } catch (error) {
                  return false;
            }
      }

      /**
       * Valida que los datos de la categoría sean válidos para actualizar
       * @param {Object} categoriaData - Datos de la categoría
       * @returns {boolean} true si los datos son válidos
       */
      static validateForUpdate(categoriaData) {
            try {
                  const sanitized = this.sanitizeCategoriaData(categoriaData);
                  return sanitized.id && sanitized.nombre && sanitized.nombre.length > 0;
            } catch (error) {
                  return false;
            }
      }

      /**
       * Obtiene mensajes de error de validación
       * @param {Object} categoriaData - Datos de la categoría
       * @returns {Array} Array de mensajes de error
       */
      static getValidationErrors(categoriaData) {
            const errors = [];

            if (!categoriaData || typeof categoriaData !== 'object') {
                  errors.push('Los datos de la categoría son requeridos');
                  return errors;
            }

            if (!categoriaData.nombre || categoriaData.nombre.trim().length === 0) {
                  errors.push('El nombre de la categoría es requerido');
            }

            if (categoriaData.nombre && categoriaData.nombre.length > 100) {
                  errors.push('El nombre de la categoría no puede exceder 100 caracteres');
            }

            return errors;
      }
}

export default CategoriasValidator;
