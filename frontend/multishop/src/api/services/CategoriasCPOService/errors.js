/**
 * Clase de errores personalizada para CategoríasCPO
 * Maneja errores específicos del módulo de categorías CPO
 */
class CategoriasCPOErrors extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'CategoriasCPOErrors';
            this.code = code;
            this.statusCode = statusCode;
      }
}

export default CategoriasCPOErrors;
