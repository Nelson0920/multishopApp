/**
 * Validador para datos de Inventario
 * Implementa validaciones de negocio para el módulo de inventario
 */

class InventarioValidator {
      /**
       * Sanitiza y valida los datos de un producto
       * @param {Object} productoData - Datos del producto
       * @returns {Object} Datos sanitizados
       */
      static sanitizeProductoData(productoData) {
            if (!productoData || typeof productoData !== 'object') {
                  throw new Error('Los datos del producto son requeridos');
            }

            const sanitized = { ...productoData };

            // Sanitizar nombre
            if (sanitized.nombre) {
                  sanitized.nombre = sanitized.nombre.trim();
                  if (sanitized.nombre.length === 0) {
                        throw new Error('El nombre del producto no puede estar vacío');
                  }
                  if (sanitized.nombre.length > 200) {
                        throw new Error('El nombre del producto no puede exceder 200 caracteres');
                  }
            }

            // Sanitizar descripción
            if (sanitized.descripcion) {
                  sanitized.descripcion = sanitized.descripcion.trim();
                  if (sanitized.descripcion.length > 1000) {
                        throw new Error('La descripción no puede exceder 1000 caracteres');
                  }
            }

            // Sanitizar precios y costos
            if (sanitized.precio !== undefined) {
                  sanitized.precio = this.sanitizePrice(sanitized.precio);
            }

            if (sanitized.costo !== undefined) {
                  sanitized.costo = this.sanitizePrice(sanitized.costo);
            }

            // Sanitizar stock
            if (sanitized.stock !== undefined) {
                  sanitized.stock = this.sanitizeStock(sanitized.stock);
            }

            if (sanitized.stockMinimo !== undefined) {
                  sanitized.stockMinimo = this.sanitizeStock(sanitized.stockMinimo);
            }

            if (sanitized.stockMaximo !== undefined) {
                  sanitized.stockMaximo = this.sanitizeStock(sanitized.stockMaximo);
            }

            // Sanitizar SKU
            if (sanitized.sku) {
                  sanitized.sku = sanitized.sku.trim().toUpperCase();
                  if (sanitized.sku.length > 50) {
                        throw new Error('El SKU no puede exceder 50 caracteres');
                  }
            }

            // Sanitizar código de barras
            if (sanitized.codigoBarras) {
                  sanitized.codigoBarras = sanitized.codigoBarras.trim();
                  if (sanitized.codigoBarras.length > 20) {
                        throw new Error('El código de barras no puede exceder 20 caracteres');
                  }
            }

            // Sanitizar estado
            if (sanitized.estado) {
                  const validStates = ['active', 'inactive', 'discontinued'];
                  if (!validStates.includes(sanitized.estado)) {
                        sanitized.estado = 'active';
                  }
            }

            return sanitized;
      }

      /**
       * Sanitiza un valor de precio
       * @param {string|number} price - Precio a sanitizar
       * @returns {number} Precio sanitizado
       */
      static sanitizePrice(price) {
            if (typeof price === 'number') {
                  if (price < 0) return 0;
                  return Math.round(price * 100) / 100; // Redondear a 2 decimales
            }

            if (typeof price === 'string') {
                  const cleanPrice = price.replace(/[,$]/g, '').trim();
                  const parsed = parseFloat(cleanPrice);

                  if (isNaN(parsed)) return 0;
                  if (parsed < 0) return 0;

                  return Math.round(parsed * 100) / 100;
            }

            return 0;
      }

      /**
       * Sanitiza un valor de stock
       * @param {string|number} stock - Stock a sanitizar
       * @returns {number} Stock sanitizado
       */
      static sanitizeStock(stock) {
            if (typeof stock === 'number') {
                  return Math.max(0, Math.floor(stock));
            }

            if (typeof stock === 'string') {
                  const cleanStock = stock.trim();
                  const parsed = parseInt(cleanStock);

                  if (isNaN(parsed)) return 0;
                  return Math.max(0, parsed);
            }

            return 0;
      }

      /**
       * Valida que los datos del producto sean válidos para crear
       * @param {Object} productoData - Datos del producto
       * @returns {boolean} true si los datos son válidos
       */
      static validateForCreate(productoData) {
            try {
                  const sanitized = this.sanitizeProductoData(productoData);

                  return sanitized.nombre &&
                        sanitized.nombre.length > 0 &&
                        sanitized.precio >= 0 &&
                        sanitized.costo >= 0 &&
                        sanitized.stock >= 0;
            } catch (error) {
                  console.error('Error al validar datos de producto:', error);
                  return false;
            }
      }

      /**
       * Valida que los datos del producto sean válidos para actualizar
       * @param {Object} productoData - Datos del producto
       * @returns {boolean} true si los datos son válidos
       */
      static validateForUpdate(productoData) {
            try {
                  const sanitized = this.sanitizeProductoData(productoData);

                  return sanitized.id &&
                        sanitized.nombre &&
                        sanitized.nombre.length > 0 &&
                        sanitized.precio >= 0 &&
                        sanitized.costo >= 0 &&
                        sanitized.stock >= 0;
            } catch (error) {
                  console.error('Error al validar datos de producto:', error);
                  return false;
            }
      }

      /**
       * Valida los datos de actualización de stock
       * @param {Object} stockData - Datos de stock
       * @returns {boolean} true si los datos son válidos
       */
      static validateStockUpdate(stockData) {
            if (!stockData || typeof stockData !== 'object') {
                  return false;
            }

            const { cantidad, operacion, productoId } = stockData;

            if (!productoId) {
                  return false;
            }

            if (cantidad === null || cantidad === undefined) {
                  return false;
            }

            const validOperations = ['add', 'subtract', 'set'];
            if (operacion && !validOperations.includes(operacion)) {
                  return false;
            }

            return true;
      }

      /**
       * Valida los datos de filtros de búsqueda
       * @param {Object} filterData - Datos de filtros
       * @returns {boolean} true si los datos son válidos
       */
      static validateFilters(filterData) {
            if (!filterData || typeof filterData !== 'object') {
                  return true; // Los filtros son opcionales
            }

            // Validar que los valores de filtro sean válidos
            if (filterData.categoria && typeof filterData.categoria !== 'string') {
                  return false;
            }

            if (filterData.estado) {
                  const validStates = ['active', 'inactive', 'discontinued'];
                  if (!validStates.includes(filterData.estado)) {
                        return false;
                  }
            }

            if (filterData.stockBajo !== undefined && typeof filterData.stockBajo !== 'boolean') {
                  return false;
            }

            return true;
      }

      /**
       * Obtiene mensajes de error de validación
       * @param {Object} productoData - Datos del producto
       * @returns {Array} Array de mensajes de error
       */
      static getValidationErrors(productoData) {
            const errors = [];

            if (!productoData || typeof productoData !== 'object') {
                  errors.push('Los datos del producto son requeridos');
                  return errors;
            }

            if (!productoData.nombre || productoData.nombre.trim().length === 0) {
                  errors.push('El nombre del producto es requerido');
            }

            if (productoData.nombre && productoData.nombre.length > 200) {
                  errors.push('El nombre del producto no puede exceder 200 caracteres');
            }

            if (productoData.descripcion && productoData.descripcion.length > 1000) {
                  errors.push('La descripción no puede exceder 1000 caracteres');
            }

            if (productoData.precio !== undefined && productoData.precio < 0) {
                  errors.push('El precio no puede ser negativo');
            }

            if (productoData.costo !== undefined && productoData.costo < 0) {
                  errors.push('El costo no puede ser negativo');
            }

            if (productoData.stock !== undefined && productoData.stock < 0) {
                  errors.push('El stock no puede ser negativo');
            }

            if (productoData.stockMinimo !== undefined && productoData.stockMinimo < 0) {
                  errors.push('El stock mínimo no puede ser negativo');
            }

            if (productoData.stockMaximo !== undefined && productoData.stockMaximo < 0) {
                  errors.push('El stock máximo no puede ser negativo');
            }

            if (productoData.stockMinimo !== undefined && productoData.stockMaximo !== undefined) {
                  if (productoData.stockMinimo > productoData.stockMaximo) {
                        errors.push('El stock mínimo no puede ser mayor al stock máximo');
                  }
            }

            if (productoData.sku && productoData.sku.length > 50) {
                  errors.push('El SKU no puede exceder 50 caracteres');
            }

            if (productoData.codigoBarras && productoData.codigoBarras.length > 20) {
                  errors.push('El código de barras no puede exceder 20 caracteres');
            }

            if (productoData.estado) {
                  const validStates = ['active', 'inactive', 'discontinued'];
                  if (!validStates.includes(productoData.estado)) {
                        errors.push('El estado debe ser: active, inactive o discontinued');
                  }
            }

            return errors;
      }

      /**
       * Valida que un SKU sea único
       * @param {string} sku - SKU a validar
       * @param {Array} existingProducts - Lista de productos existentes
       * @param {string} excludeId - ID del producto a excluir de la validación
       * @returns {boolean} true si el SKU es único
       */
      static validateUniqueSKU(sku, existingProducts, excludeId = null) {
            if (!sku || !Array.isArray(existingProducts)) {
                  return true;
            }

            return !existingProducts.some(product =>
                  product.sku === sku.toUpperCase() && product.id !== excludeId
            );
      }

      /**
       * Valida que un código de barras sea único
       * @param {string} barcode - Código de barras a validar
       * @param {Array} existingProducts - Lista de productos existentes
       * @param {string} excludeId - ID del producto a excluir de la validación
       * @returns {boolean} true si el código de barras es único
       */
      static validateUniqueBarcode(barcode, existingProducts, excludeId = null) {
            if (!barcode || !Array.isArray(existingProducts)) {
                  return true;
            }

            return !existingProducts.some(product =>
                  product.barcode === barcode && product.id !== excludeId
            );
      }

      /**
       * Valida que el margen de ganancia sea razonable
       * @param {number} precio - Precio de venta
       * @param {number} costo - Costo del producto
       * @returns {Object} Resultado de la validación con mensaje
       */
      static validateProfitMargin(precio, costo) {
            if (precio <= 0 || costo < 0) {
                  return { isValid: false, message: 'Precio y costo deben ser valores válidos' };
            }

            const margin = ((precio - costo) / precio) * 100;

            if (margin < 0) {
                  return { isValid: false, message: 'El precio debe ser mayor al costo' };
            }

            if (margin > 90) {
                  return { isValid: true, message: 'Margen de ganancia muy alto (>90%)', warning: true };
            }

            if (margin < 5) {
                  return { isValid: true, message: 'Margen de ganancia muy bajo (<5%)', warning: true };
            }

            return { isValid: true, message: `Margen de ganancia: ${margin.toFixed(2)}%` };
      }
}

export default InventarioValidator;
