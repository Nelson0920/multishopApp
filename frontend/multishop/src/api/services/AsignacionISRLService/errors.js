/**
 * Errores específicos para el servicio de Asignación ISRL
 * Maneja errores personalizados del módulo de conceptos de retención ISRL
 */

class AsignacionISRLError extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'AsignacionISRLError';
            this.code = code;
            this.statusCode = statusCode;
      }
}

export default AsignacionISRLError;
