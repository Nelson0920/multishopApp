/**
 * Clase de errores personalizada para el servicio de CPO
 * Maneja errores específicos del dominio de Clientes, Proveedores y Otros
 */
class CPOErrors extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'CPOErrors';
            this.code = code;
            this.statusCode = statusCode;
      }

      /**
       * Error cuando no se pueden obtener los CPOs
       */
      static getCPOError(message = 'Error al obtener CPOs', statusCode = 500) {
            return new CPOErrors('CPO_GET_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede crear un CPO
       */
      static createCPOError(message = 'Error al crear CPO', statusCode = 500) {
            return new CPOErrors('CPO_CREATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede actualizar un CPO
       */
      static updateCPOError(message = 'Error al actualizar CPO', statusCode = 500) {
            return new CPOErrors('CPO_UPDATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se encuentra un CPO
       */
      static cpoNotFoundError(message = 'CPO no encontrado', statusCode = 404) {
            return new CPOErrors('CPO_NOT_FOUND', message, statusCode);
      }

      /**
       * Error de validación de datos
       */
      static validationError(message = 'Datos de CPO inválidos', statusCode = 400) {
            return new CPOErrors('CPO_VALIDATION_ERROR', message, statusCode);
      }
}

export default CPOErrors;

