/**
 * Clase de errores personalizada para el servicio de Inventario
 * Maneja errores específicos del módulo de inventario
 */
class InventarioErrors extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'InventarioErrors';
            this.code = code;
            this.statusCode = statusCode;
            this.timestamp = new Date().toISOString();
      }

      /**
       * Convierte el error a un objeto serializable
       * @returns {Object} Objeto con los detalles del error
       */
      toJSON() {
            return {
                  name: this.name,
                  code: this.code,
                  message: this.message,
                  statusCode: this.statusCode,
                  timestamp: this.timestamp
            };
      }

      /**
       * Crea un error de validación
       * @param {string} message - Mensaje de error
       * @returns {InventarioErrors} Error de validación
       */
      static validationError(message) {
            return new InventarioErrors('INVENTARIO_VALIDATION_ERROR', message, 400);
      }

      /**
       * Crea un error de no encontrado
       * @param {string} message - Mensaje de error
       * @returns {InventarioErrors} Error de no encontrado
       */
      static notFoundError(message = 'Producto no encontrado') {
            return new InventarioErrors('INVENTARIO_NOT_FOUND_ERROR', message, 404);
      }

      /**
       * Crea un error de conflicto
       * @param {string} message - Mensaje de error
       * @returns {InventarioErrors} Error de conflicto
       */
      static conflictError(message) {
            return new InventarioErrors('INVENTARIO_CONFLICT_ERROR', message, 409);
      }

      /**
       * Crea un error de servidor
       * @param {string} message - Mensaje de error
       * @returns {InventarioErrors} Error de servidor
       */
      static serverError(message = 'Error interno del servidor') {
            return new InventarioErrors('INVENTARIO_SERVER_ERROR', message, 500);
      }
}

export default InventarioErrors;
