/**
 * Clase de errores personalizada para el servicio de Condiciones de Pago
 * Maneja errores específicos del dominio de condiciones de pago
 */
class CondicionesPagoErrors extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'CondicionesPagoErrors';
            this.code = code;
            this.statusCode = statusCode;
      }

      /**
       * Error cuando no se pueden obtener las condiciones de pago
       */
      static getCondicionesError(message = 'Error al obtener condiciones de pago', statusCode = 500) {
            return new CondicionesPagoErrors('CONDICIONES_PAGO_GET_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede crear una condición de pago
       */
      static createCondicionError(message = 'Error al crear condición de pago', statusCode = 500) {
            return new CondicionesPagoErrors('CONDICIONES_PAGO_CREATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede actualizar una condición de pago
       */
      static updateCondicionError(message = 'Error al actualizar condición de pago', statusCode = 500) {
            return new CondicionesPagoErrors('CONDICIONES_PAGO_UPDATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se encuentra una condición de pago
       */
      static condicionNotFoundError(message = 'Condición de pago no encontrada', statusCode = 404) {
            return new CondicionesPagoErrors('CONDICIONES_PAGO_NOT_FOUND', message, statusCode);
      }

      /**
       * Error de validación de datos
       */
      static validationError(message = 'Datos de condición de pago inválidos', statusCode = 400) {
            return new CondicionesPagoErrors('CONDICIONES_PAGO_VALIDATION_ERROR', message, statusCode);
      }
}

export default CondicionesPagoErrors;
