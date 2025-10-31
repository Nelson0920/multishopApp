/**
 * Adapter para datos de Inventario
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class InventarioAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario con campos de la UI
       * @returns {Object} Datos adaptados para la API
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const {
                  nombre,
                  descripcion,
                  categoriaId,
                  precio,
                  costo,
                  stock,
                  stockMinimo,
                  stockMaximo,
                  sku,
                  codigoBarras,
                  estado,
                  id
            } = formData;

            if (!nombre) {
                  throw new Error('El campo nombre es requerido');
            }

            return {
                  id: id || undefined,
                  name: nombre.trim(),
                  description: descripcion ? descripcion.trim() : '',
                  category_id: categoriaId || null,
                  price: this.parseNumber(precio),
                  cost: this.parseNumber(costo),
                  stock: this.parseNumber(stock),
                  min_stock: this.parseNumber(stockMinimo),
                  max_stock: this.parseNumber(stockMaximo),
                  sku: sku ? sku.trim() : '',
                  barcode: codigoBarras ? codigoBarras.trim() : '',
                  status: estado || 'active'
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio
       * @returns {Object} Datos adaptados para la UI
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const {
                  name,
                  description,
                  category_id,
                  price,
                  cost,
                  stock,
                  min_stock,
                  max_stock,
                  sku,
                  barcode,
                  status,
                  id
            } = serviceData;

            return {
                  id: id || undefined,
                  nombre: name || '',
                  descripcion: description || '',
                  categoriaId: category_id || '',
                  precio: this.formatNumber(price),
                  costo: this.formatNumber(cost),
                  stock: this.formatNumber(stock),
                  stockMinimo: this.formatNumber(min_stock),
                  stockMaximo: this.formatNumber(max_stock),
                  sku: sku || '',
                  codigoBarras: barcode || '',
                  estado: status || 'active'
            };
      }

      /**
       * Convierte un valor de string a número
       * @param {string|number} value - Valor como string o número
       * @returns {number} Valor como número
       */
      static parseNumber(value) {
            if (typeof value === 'number') {
                  return value;
            }
            if (typeof value === 'string') {
                  const cleanValue = value.replace(/[,$]/g, '').trim();
                  const parsed = parseFloat(cleanValue);
                  return isNaN(parsed) ? 0 : parsed;
            }
            return 0;
      }

      /**
       * Convierte un número a string con formato de moneda
       * @param {number} value - Valor como número
       * @returns {string} Valor como string con formato
       */
      static formatNumber(value) {
            if (typeof value === 'number') {
                  return value.toFixed(2);
            }
            if (typeof value === 'string') {
                  return value;
            }
            return '0.00';
      }

      /**
       * Adapta los datos para actualización de stock
       * @param {Object} stockData - Datos de stock
       * @returns {Object} Datos adaptados para la API
       */
      static adaptStockData(stockData) {
            if (!stockData || typeof stockData !== 'object') {
                  throw new Error('Los datos de stock son requeridos');
            }

            const { cantidad, operacion, productoId } = stockData;

            if (!productoId) {
                  throw new Error('ID del producto es requerido');
            }

            return {
                  id: productoId,
                  quantity: this.parseNumber(cantidad),
                  operation: operacion || 'set'
            };
      }

      /**
       * Adapta los datos de filtros para la búsqueda
       * @param {Object} filterData - Datos de filtros
       * @returns {Object} Filtros adaptados para la API
       */
      static adaptFilterData(filterData) {
            if (!filterData || typeof filterData !== 'object') {
                  return {};
            }

            const adapted = {};

            if (filterData.categoria) {
                  adapted.category_id = filterData.categoria;
            }

            if (filterData.estado) {
                  adapted.status = filterData.estado;
            }

            if (filterData.stockBajo !== undefined) {
                  adapted.low_stock = filterData.stockBajo;
            }

            return adapted;
      }

      /**
       * Valida que los datos del formulario tengan el formato correcto
       * @param {Object} formData - Datos del formulario
       * @returns {boolean} true si el formato es válido
       */
      static isValidFormData(formData) {
            return formData &&
                  typeof formData === 'object' &&
                  typeof formData.nombre === 'string' &&
                  formData.nombre.trim().length > 0;
      }

      /**
       * Valida que los datos del servicio tengan el formato correcto
       * @param {Object} serviceData - Datos del servicio
       * @returns {boolean} true si el formato es válido
       */
      static isValidServiceData(serviceData) {
            return serviceData &&
                  typeof serviceData === 'object' &&
                  typeof serviceData.name === 'string' &&
                  serviceData.name.trim().length > 0;
      }

      /**
       * Adapta los datos para mostrar en tabla
       * @param {Array} products - Lista de productos del servicio
       * @returns {Array} Lista adaptada para mostrar en tabla
       */
      static adaptForTable(products) {
            if (!Array.isArray(products)) {
                  return [];
            }

            return products.map(product => ({
                  id: product.id,
                  nombre: product.descripcion || product.name || '',
                  descripcion: product.descripcion || product.description || '',
                  categoria: product.categoria || product.category_name || 'Sin categoría',
                  precio: this.formatCurrency(product.precio1_con_impuesto || product.price),
                  costo: this.formatCurrency(product.precio1_sin_impuesto || product.cost),
                  stock: product.existencia_general || product.stock,
                  stockMinimo: product.stock_minimo || product.min_stock,
                  stockMaximo: product.stock_maximo || product.max_stock,
                  sku: product.codigo || product.sku,
                  codigoBarras: product.cod_barra || product.barcode,
                  estado: product.estado || product.status,
                  fechaCreacion: product.created_at,
                  fechaActualizacion: product.updated_at
            }));
      }

      /**
       * Formatea un número como moneda
       * @param {number} value - Valor numérico
       * @returns {string} Valor formateado como moneda
       */
      static formatCurrency(value) {
            if (typeof value === 'number') {
                  return new Intl.NumberFormat('es-VE', {
                        style: 'currency',
                        currency: 'VES'
                  }).format(value);
            }
            return 'Bs. 0,00';
      }

      /**
       * Adapta los datos de estadísticas
       * @param {Object} statsData - Datos de estadísticas del servicio
       * @returns {Object} Estadísticas adaptadas para la UI
       */
      static adaptStatistics(statsData) {
            if (!statsData || typeof statsData !== 'object') {
                  return {};
            }

            return {
                  totalProductos: statsData.total_products || 0,
                  productosActivos: statsData.active_products || 0,
                  productosInactivos: statsData.inactive_products || 0,
                  valorTotalInventario: this.formatCurrency(statsData.total_inventory_value || 0),
                  productosStockBajo: statsData.low_stock_products || 0,
                  productosSinStock: statsData.out_of_stock_products || 0,
                  categoriaMasProductos: statsData.category_with_most_products || 'N/A',
                  ultimaActualizacion: statsData.last_updated || new Date().toISOString()
            };
      }
}

export default InventarioAdapter;
