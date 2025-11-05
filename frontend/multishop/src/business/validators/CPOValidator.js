/**
 * Validador para datos de CPO (Clientes, Proveedores y Otros)
 * Implementa validaciones de negocio para el módulo de CPO
 */

class CPOValidator {
      /**
       * Sanitiza y valida los datos de un CPO
       * @param {Object} cpoData - Datos del CPO
       * @returns {Object} Datos sanitizados
       */
      static sanitizeCPOData(cpoData) {
            if (!cpoData || typeof cpoData !== 'object') {
                  throw new Error('Los datos del CPO son requeridos');
            }

            const sanitized = { ...cpoData };

            // Sanitizar nombre
            if (sanitized.name) {
                  sanitized.name = sanitized.name.trim();
                  if (sanitized.name.length === 0) {
                        throw new Error('El nombre no puede estar vacío');
                  }
                  if (sanitized.name.length > 200) {
                        throw new Error('El nombre no puede exceder 200 caracteres');
                  }
            }

            // Sanitizar RIF
            if (sanitized.rif) {
                  sanitized.rif = sanitized.rif.trim().toUpperCase();
                  if (sanitized.rif.length === 0) {
                        throw new Error('El RIF/Cédula no puede estar vacío');
                  }
            }

            // Sanitizar email
            if (sanitized.email) {
                  sanitized.email = sanitized.email.trim().toLowerCase();
                  if (sanitized.email.length > 0 && !this.isValidEmail(sanitized.email)) {
                        throw new Error('El email no es válido');
                  }
            }

            // Sanitizar teléfono
            if (sanitized.phone) {
                  sanitized.phone = sanitized.phone.trim();
            }

            // Sanitizar dirección
            if (sanitized.address) {
                  sanitized.address = sanitized.address.trim();
            }

            // Sanitizar observaciones
            if (sanitized.observations) {
                  sanitized.observations = sanitized.observations.trim();
                  if (sanitized.observations.length > 500) {
                        sanitized.observations = sanitized.observations.substring(0, 500);
                  }
            }

            // Sanitizar porcentajes numéricos
            if (sanitized.retention_percentage_iva !== undefined) {
                  sanitized.retention_percentage_iva = this.sanitizeNumber(
                        sanitized.retention_percentage_iva,
                        0,
                        100
                  );
            }

            if (sanitized.credit_limit !== undefined) {
                  sanitized.credit_limit = this.sanitizeNumber(sanitized.credit_limit, 0);
            }

            if (sanitized.discount_percentage !== undefined) {
                  sanitized.discount_percentage = this.sanitizeNumber(
                        sanitized.discount_percentage,
                        0,
                        100
                  );
            }

            // Sanitizar tipo
            if (sanitized.type) {
                  const validTypes = ['cliente', 'client', 'proveedor', 'provider', 'otros', 'other'];
                  if (!validTypes.includes(sanitized.type.toLowerCase())) {
                        throw new Error('El tipo debe ser cliente, proveedor u otros');
                  }
            }

            return sanitized;
      }

      /**
       * Sanitiza un valor numérico
       * @param {string|number} value - Valor a sanitizar
       * @param {number} min - Valor mínimo
       * @param {number} max - Valor máximo (opcional)
       * @returns {number} Valor sanitizado
       */
      static sanitizeNumber(value, min = 0, max = undefined) {
            let num = typeof value === 'string' ? parseFloat(value) : value;

            if (isNaN(num)) {
                  return min;
            }

            if (num < min) {
                  return min;
            }

            if (max !== undefined && num > max) {
                  return max;
            }

            return num;
      }

      /**
       * Valida que un email tenga formato válido
       * @param {string} email - Email a validar
       * @returns {boolean} true si el email es válido
       */
      static isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
      }

      /**
       * Valida que los datos del CPO sean válidos para crear
       * @param {Object} cpoData - Datos del CPO
       * @returns {boolean} true si los datos son válidos
       */
      static validateForCreate(cpoData) {
            try {
                  const sanitized = this.sanitizeCPOData(cpoData);
                  return (
                        sanitized.name &&
                        sanitized.name.length > 0 &&
                        sanitized.rif &&
                        sanitized.rif.length > 0 &&
                        sanitized.type &&
                        sanitized.type.length > 0
                  );
            } catch (error) {
                  return false;
            }
      }

      /**
       * Valida que los datos del CPO sean válidos para actualizar
       * @param {Object} cpoData - Datos del CPO
       * @returns {boolean} true si los datos son válidos
       */
      static validateForUpdate(cpoData) {
            try {
                  const sanitized = this.sanitizeCPOData(cpoData);
                  return (
                        sanitized.id &&
                        sanitized.name &&
                        sanitized.name.length > 0 &&
                        sanitized.rif &&
                        sanitized.rif.length > 0 &&
                        sanitized.type &&
                        sanitized.type.length > 0
                  );
            } catch (error) {
                  return false;
            }
      }

      /**
       * Obtiene mensajes de error de validación
       * @param {Object} cpoData - Datos del CPO
       * @returns {Array} Array de mensajes de error
       */
      static getValidationErrors(cpoData) {
            const errors = [];

            if (!cpoData || typeof cpoData !== 'object') {
                  errors.push('Los datos del CPO son requeridos');
                  return errors;
            }

            if (!cpoData.name || cpoData.name.trim().length === 0) {
                  errors.push('El nombre es requerido');
            }

            if (!cpoData.rif || cpoData.rif.trim().length === 0) {
                  errors.push('El RIF/Cédula es requerido');
            }

            if (!cpoData.type || cpoData.type.trim().length === 0) {
                  errors.push('El tipo es requerido');
            }

            if (cpoData.name && cpoData.name.length > 200) {
                  errors.push('El nombre no puede exceder 200 caracteres');
            }

            if (cpoData.email && !this.isValidEmail(cpoData.email)) {
                  errors.push('El email no es válido');
            }

            return errors;
      }
}

export default CPOValidator;

