import BaseError from '@shared/utils/baseError.js';

/**
 * Clase de errores específicos para Plan de Cuentas
 * Extiende BaseError para manejar errores del servicio
 */
class PlanCuentasErrors extends BaseError {
      constructor(code, message, statusCode = 500) {
            super('PlanCuentasErrors', code, message, statusCode);
      }
}

export default PlanCuentasErrors;
