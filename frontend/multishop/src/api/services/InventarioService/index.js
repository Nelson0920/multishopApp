import InventarioErrors from './errors.js';
import INVENTARIO_DATA from '../../../mocks/Inventario.json';

/**
 * Servicio de API para Inventario
 * Maneja todas las operaciones CRUD con el backend
 */
class InventarioService {
      constructor() {
            this.baseURL = '/inventory';
      }

      /**
       * Obtener todos los productos del inventario
       * @param {string} searchTerm - Término de búsqueda
       * @param {Object} filters - Filtros adicionales (categoría, estado, etc.)
       * @returns {Promise<Array>} Lista de productos
       */
      async getAll(searchTerm = '', filters = {}) {
            try {
                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 500));

                  let filteredData = [...INVENTARIO_DATA];

                  // Aplicar filtro de búsqueda
                  if (searchTerm) {
                        const searchLower = searchTerm.toLowerCase();
                        filteredData = filteredData.filter(producto =>
                              producto.codigo?.toLowerCase().includes(searchLower) ||
                              producto.descripcion?.toLowerCase().includes(searchLower) ||
                              producto.nombre?.toLowerCase().includes(searchLower) ||
                              producto.cod_barra?.toLowerCase().includes(searchLower)
                        );
                  }

                  // Aplicar filtros adicionales
                  if (filters.categoria && filters.categoria !== '') {
                        filteredData = filteredData.filter(producto => producto.categoria === filters.categoria);
                  }

                  if (filters.estado && filters.estado !== '') {
                        filteredData = filteredData.filter(producto => producto.estado === filters.estado);
                  }

                  if (filters.con_existencia) {
                        filteredData = filteredData.filter(producto => producto.existencia_general > 0);
                  }

                  if (filters.activos) {
                        filteredData = filteredData.filter(producto => producto.estado === 'active');
                  }

                  return filteredData;
            } catch (error) {
                  throw new InventarioErrors('INVENTARIO_GET_ALL_ERROR', error.message ?? 'Error al obtener productos', 500);
            }
      }

      /**
       * Obtener un producto por ID
       * @param {string} id - ID del producto
       * @returns {Promise<Object>} Producto encontrado
       */
      async getById(id) {
            try {
                  if (!id) {
                        throw new InventarioErrors('INVENTARIO_GET_BY_ID_ERROR', 'ID del producto es requerido', 400);
                  }

                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 300));

                  const producto = INVENTARIO_DATA.find(item => item.id === id);
                  if (!producto) {
                        throw InventarioErrors.notFoundError('Producto no encontrado');
                  }

                  return producto;
            } catch (error) {
                  if (error instanceof InventarioErrors) {
                        throw error;
                  }
                  throw new InventarioErrors('INVENTARIO_GET_BY_ID_ERROR', error.message ?? 'Error al obtener producto', 500);
            }
      }

      /**
       * Crear un nuevo producto
       * @param {Object} productoData - Datos del producto
       * @returns {Promise<Object>} Producto creado
       */
      async create(productoData) {
            try {
                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 800));

                  // Generar nuevo ID
                  const newId = (Math.max(...INVENTARIO_DATA.map(item => parseInt(item.id))) + 1).toString();

                  // Crear nuevo producto
                  const nuevoProducto = {
                        id: newId,
                        codigo: productoData.codigo,
                        descripcion: productoData.descripcion,
                        categoria: productoData.categoria,
                        proveedor: productoData.proveedor,
                        und_x_bult: productoData.und_x_bult || "1.00",
                        cod_barra: productoData.cod_barra || "",
                        referencia: productoData.referencia || "",
                        porcentaje_impuesto: productoData.porcentaje_impuesto || "0.00",
                        componente: productoData.componente || "",
                        producto_compuesto: productoData.producto_compuesto || "No",
                        prioridad_busquedas: productoData.prioridad_busquedas || "",
                        ganancia: productoData.ganancia || "0.00",
                        precio1_con_impuesto: productoData.precio1_con_impuesto || "0.00",
                        precio1_sin_impuesto: productoData.precio1_sin_impuesto || "0.00",
                        precio2_con_impuesto: productoData.precio2_con_impuesto || "0.00",
                        precio2_sin_impuesto: productoData.precio2_sin_impuesto || "0.00",
                        precio3_con_impuesto: productoData.precio3_con_impuesto || "0.00",
                        precio3_sin_impuesto: productoData.precio3_sin_impuesto || "0.00",
                        precio4_con_impuesto: productoData.precio4_con_impuesto || "0.00",
                        precio4_sin_impuesto: productoData.precio4_sin_impuesto || "0.00",
                        precio_regulado: productoData.precio_regulado || "0.00",
                        existencia_general: "0.00",
                        rotacion: "0.00",
                        rotacion_cada_dias: "60",
                        dias_inventario: "0.00",
                        venta_diaria_base_dias: "45",
                        venta_diaria_promedio: "0.00",
                        valores_estimados_semanal: "0",
                        stock_minimo_dias: "8",
                        stock_minimo: "0.00",
                        stock_maximo_dias: "60",
                        stock_maximo: "0.00",
                        venta_media_base_dias: "60",
                        venta_media_diaria: "0.00",
                        ultima_actualizacion: new Date().toLocaleDateString('es-ES'),
                        excluir_calculo_rotacion: false,
                        fecha_creacion: new Date().toLocaleDateString('es-ES'),
                        en_promocion: "No",
                        producto_inactivo: false,
                        ultima_venta: "",
                        pesado_fraccionado: "No",
                        en_inventario: true,
                        fecha_ultima_compra: "",
                        aplica_cadena_frio: false,
                        bloqueo_cedula: false,
                        fecha_confirmacion: "",
                        hablador_prc_justo: false,
                        cantidad_comprada: "0.00",
                        requiere_recipe: false,
                        no_aplica_bandas: true,
                        descontinuado: false,
                        producto_catalogo_oferta: "No",
                        fecha_actual: new Date().toLocaleDateString('es-ES'),
                        registro_encontrado: "N/A",
                        total_registros: INVENTARIO_DATA.length + 1,
                        ultima_actualizacion_general: new Date().toLocaleString('es-ES'),
                        valorizacion_costo_promedio: "0.00",
                        dias_inventario_general: "0.00",
                        rotacion_inventario: "0.00",
                        criterios_activos: true,
                        criterios_con_existencia: true,
                        criterios_menos_exacta: true,
                        moneda: "01 - Dolar USD",
                        buscar_por_codigo: true,
                        buscar_por_nombre: false,
                        buscar_por_barra: false,
                        estado: "active",
                        fechaCreacion: new Date().toISOString(),
                        fechaActualizacion: new Date().toISOString()
                  };

                  // Agregar a los datos mock (en una aplicación real esto sería persistido en BD)
                  INVENTARIO_DATA.push(nuevoProducto);

                  return nuevoProducto;
            } catch (error) {
                  throw new InventarioErrors('INVENTARIO_CREATE_ERROR', error.message ?? 'Error al crear producto', 500);
            }
      }

      /**
       * Actualizar un producto existente
       * @param {Object} productoData - Datos del producto con ID
       * @returns {Promise<Object>} Producto actualizado
       */
      async update(productoData) {
            try {
                  if (!productoData.id) {
                        throw new InventarioErrors('INVENTARIO_UPDATE_ERROR', 'ID del producto es requerido', 400);
                  }

                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 600));

                  const index = INVENTARIO_DATA.findIndex(item => item.id === productoData.id);
                  if (index === -1) {
                        throw InventarioErrors.notFoundError('Producto no encontrado');
                  }

                  // Actualizar producto existente
                  const productoActualizado = {
                        ...INVENTARIO_DATA[index],
                        ...productoData,
                        fechaActualizacion: new Date().toISOString()
                  };

                  INVENTARIO_DATA[index] = productoActualizado;

                  return productoActualizado;
            } catch (error) {
                  if (error instanceof InventarioErrors) {
                        throw error;
                  }
                  throw new InventarioErrors('INVENTARIO_UPDATE_ERROR', error.message ?? 'Error al actualizar producto', 500);
            }
      }

      /**
       * Eliminar un producto
       * @param {string} id - ID del producto
       * @returns {Promise<Object>} Confirmación de eliminación
       */
      async delete(id) {
            try {
                  if (!id) {
                        throw new InventarioErrors('INVENTARIO_DELETE_ERROR', 'ID del producto es requerido', 400);
                  }

                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 400));

                  const index = INVENTARIO_DATA.findIndex(item => item.id === id);
                  if (index === -1) {
                        throw InventarioErrors.notFoundError('Producto no encontrado');
                  }

                  // Eliminar producto
                  const productoEliminado = INVENTARIO_DATA.splice(index, 1)[0];

                  return {
                        message: 'Producto eliminado exitosamente',
                        producto: productoEliminado
                  };
            } catch (error) {
                  if (error instanceof InventarioErrors) {
                        throw error;
                  }
                  throw new InventarioErrors('INVENTARIO_DELETE_ERROR', error.message ?? 'Error al eliminar producto', 500);
            }
      }

      /**
       * Actualizar stock de un producto
       * @param {string} id - ID del producto
       * @param {number} quantity - Cantidad a agregar/quitar
       * @param {string} operation - Operación: 'add', 'subtract', 'set'
       * @returns {Promise<Object>} Producto actualizado
       */
      async updateStock(id, quantity, operation = 'set') {
            try {
                  if (!id) {
                        throw new InventarioErrors('INVENTARIO_UPDATE_STOCK_ERROR', 'ID del producto es requerido', 400);
                  }
                  if (quantity === null || quantity === undefined) {
                        throw new InventarioErrors('INVENTARIO_UPDATE_STOCK_ERROR', 'Cantidad es requerida', 400);
                  }

                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 500));

                  const producto = INVENTARIO_DATA.find(item => item.id === id);
                  if (!producto) {
                        throw InventarioErrors.notFoundError('Producto no encontrado');
                  }

                  let nuevaExistencia = parseFloat(producto.existencia_general);

                  switch (operation) {
                        case 'add':
                              nuevaExistencia += parseFloat(quantity);
                              break;
                        case 'subtract':
                              nuevaExistencia -= parseFloat(quantity);
                              break;
                        case 'set':
                        default:
                              nuevaExistencia = parseFloat(quantity);
                              break;
                  }

                  // Actualizar existencia
                  producto.existencia_general = nuevaExistencia.toFixed(2);
                  producto.fechaActualizacion = new Date().toISOString();

                  return producto;
            } catch (error) {
                  if (error instanceof InventarioErrors) {
                        throw error;
                  }
                  throw new InventarioErrors('INVENTARIO_UPDATE_STOCK_ERROR', error.message ?? 'Error al actualizar stock', 500);
            }
      }

      /**
       * Obtener productos con stock bajo
       * @returns {Promise<Array>} Lista de productos con stock bajo
       */
      async getLowStockProducts() {
            try {
                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 300));

                  const productosStockBajo = INVENTARIO_DATA.filter(producto => {
                        const existencia = parseFloat(producto.existencia_general);
                        const stockMinimo = parseFloat(producto.stock_minimo);
                        return existencia <= stockMinimo;
                  });

                  return productosStockBajo;
            } catch (error) {
                  throw new InventarioErrors('INVENTARIO_LOW_STOCK_ERROR', error.message ?? 'Error al obtener productos con stock bajo', 500);
            }
      }

      /**
       * Obtener estadísticas del inventario
       * @returns {Promise<Object>} Estadísticas del inventario
       */
      async getStatistics() {
            try {
                  // Simular delay de API
                  await new Promise(resolve => setTimeout(resolve, 400));

                  const totalProductos = INVENTARIO_DATA.length;
                  const productosActivos = INVENTARIO_DATA.filter(p => p.estado === 'active').length;
                  const productosInactivos = INVENTARIO_DATA.filter(p => p.estado === 'inactive').length;
                  const productosDescontinuados = INVENTARIO_DATA.filter(p => p.estado === 'discontinued').length;

                  const productosConStock = INVENTARIO_DATA.filter(p => parseFloat(p.existencia_general) > 0).length;
                  const productosSinStock = INVENTARIO_DATA.filter(p => parseFloat(p.existencia_general) === 0).length;

                  const productosStockBajo = INVENTARIO_DATA.filter(p => {
                        const existencia = parseFloat(p.existencia_general);
                        const stockMinimo = parseFloat(p.stock_minimo);
                        return existencia <= stockMinimo && existencia > 0;
                  }).length;

                  const valorTotalInventario = INVENTARIO_DATA.reduce((total, producto) => {
                        const existencia = parseFloat(producto.existencia_general);
                        const costo = parseFloat(producto.costo || 0);
                        return total + (existencia * costo);
                  }, 0);

                  return {
                        totalProductos,
                        productosActivos,
                        productosInactivos,
                        productosDescontinuados,
                        productosConStock,
                        productosSinStock,
                        productosStockBajo,
                        valorTotalInventario: valorTotalInventario.toFixed(2),
                        fechaActualizacion: new Date().toISOString()
                  };
            } catch (error) {
                  throw new InventarioErrors('INVENTARIO_STATISTICS_ERROR', error.message ?? 'Error al obtener estadísticas', 500);
            }
      }
}

export default InventarioService;
