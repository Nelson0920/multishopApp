/**
 * Clase de errores personalizada para el servicio de Categorías
 * Maneja errores específicos del dominio de categorías
 */
class CategoriasErrors extends Error {
      constructor(code, message, statusCode = 500) {
            super(message);
            this.name = 'CategoriasErrors';
            this.code = code;
            this.statusCode = statusCode;
      }

      /**
       * Error cuando no se pueden obtener las categorías
       */
      static getCategoriasError(message = 'Error al obtener categorías', statusCode = 500) {
            return new CategoriasErrors('CATEGORIAS_GET_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede crear una categoría
       */
      static createCategoriaError(message = 'Error al crear categoría', statusCode = 500) {
            return new CategoriasErrors('CATEGORIAS_CREATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se puede actualizar una categoría
       */
      static updateCategoriaError(message = 'Error al actualizar categoría', statusCode = 500) {
            return new CategoriasErrors('CATEGORIAS_UPDATE_ERROR', message, statusCode);
      }

      /**
       * Error cuando no se encuentra una categoría
       */
      static categoriaNotFoundError(message = 'Categoría no encontrada', statusCode = 404) {
            return new CategoriasErrors('CATEGORIAS_NOT_FOUND', message, statusCode);
      }

      /**
       * Error de validación de datos
       */
      static validationError(message = 'Datos de categoría inválidos', statusCode = 400) {
            return new CategoriasErrors('CATEGORIAS_VALIDATION_ERROR', message, statusCode);
      }
}

export default CategoriasErrors;
