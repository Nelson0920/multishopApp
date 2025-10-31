import { useState, useEffect, useCallback } from 'react';
import InventarioService from '@api/services/InventarioService';
import InventarioAdapter from '@business/adapters/InventarioAdapter';
import InventarioValidator from '@business/validators/InventarioValidator';

const useInventario = () => {
      const [productos, setProductos] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [statistics, setStatistics] = useState({});
      const [categories, setCategories] = useState([]);

      const inventarioService = new InventarioService();

      // Cargar productos
      const loadProductos = useCallback(async (filters = {}) => {
            try {
                  setLoading(true);
                  setError(null);

                  const adaptedFilters = InventarioAdapter.adaptFilterData(filters);
                  const response = await inventarioService.getAll(filters.search || '', adaptedFilters);

                  const adaptedProducts = InventarioAdapter.adaptForTable(response);
                  setProductos(adaptedProducts);
            } catch (err) {
                  setError(err.message || 'Error al cargar productos');
                  console.error('Error loading productos:', err);
            } finally {
                  setLoading(false);
            }
      }, []);

      // Cargar estadísticas
      const loadStatistics = useCallback(async () => {
            try {
                  const stats = await inventarioService.getStatistics();
                  setStatistics(stats);
            } catch (err) {
                  console.error('Error loading statistics:', err);
            }
      }, []);

      // Crear producto
      const createProducto = useCallback(async (productoData) => {
            try {
                  setLoading(true);
                  setError(null);

                  const sanitizedData = InventarioValidator.sanitizeProductoData(productoData);
                  const adaptedData = InventarioAdapter.adaptFormDataToService(sanitizedData);

                  const response = await inventarioService.create(adaptedData);

                  // Recargar la lista de productos
                  await loadProductos();
                  await loadStatistics();

                  return response;
            } catch (err) {
                  setError(err.message || 'Error al crear producto');
                  throw err;
            } finally {
                  setLoading(false);
            }
      }, [loadProductos, loadStatistics]);

      // Actualizar producto
      const updateProducto = useCallback(async (productoData) => {
            try {
                  setLoading(true);
                  setError(null);

                  const sanitizedData = InventarioValidator.sanitizeProductoData(productoData);
                  const adaptedData = InventarioAdapter.adaptFormDataToService(sanitizedData);

                  const response = await inventarioService.update(adaptedData);

                  // Recargar la lista de productos
                  await loadProductos();
                  await loadStatistics();

                  return response;
            } catch (err) {
                  setError(err.message || 'Error al actualizar producto');
                  throw err;
            } finally {
                  setLoading(false);
            }
      }, [loadProductos, loadStatistics]);

      // Eliminar producto
      const deleteProducto = useCallback(async (productoId) => {
            try {
                  setLoading(true);
                  setError(null);

                  await inventarioService.delete(productoId);

                  // Recargar la lista de productos
                  await loadProductos();
                  await loadStatistics();

                  return true;
            } catch (err) {
                  setError(err.message || 'Error al eliminar producto');
                  throw err;
            } finally {
                  setLoading(false);
            }
      }, [loadProductos, loadStatistics]);

      // Actualizar stock
      const updateStock = useCallback(async (stockData) => {
            try {
                  setLoading(true);
                  setError(null);

                  const adaptedData = InventarioAdapter.adaptStockData(stockData);
                  const response = await inventarioService.updateStock(
                        adaptedData.id,
                        adaptedData.quantity,
                        adaptedData.operation
                  );

                  // Recargar la lista de productos
                  await loadProductos();
                  await loadStatistics();

                  return response;
            } catch (err) {
                  setError(err.message || 'Error al actualizar stock');
                  throw err;
            } finally {
                  setLoading(false);
            }
      }, [loadProductos, loadStatistics]);

      // Obtener productos con stock bajo
      const getLowStockProducts = useCallback(async () => {
            try {
                  const response = await inventarioService.getLowStockProducts();
                  return InventarioAdapter.adaptForTable(response);
            } catch (err) {
                  setError(err.message || 'Error al obtener productos con stock bajo');
                  throw err;
            }
      }, []);

      // Cargar categorías (esto debería venir de otro servicio)
      const loadCategories = useCallback(async () => {
            try {
                  // Por ahora usamos datos mock, pero esto debería ser un servicio real
                  const mockCategories = [
                        { id: '1', name: 'ELECTRONICOS' },
                        { id: '2', name: 'ROPA Y ACCESORIOS' },
                        { id: '3', name: 'HOGAR Y JARDIN' },
                        { id: '4', name: 'DEPORTES Y RECREACION' },
                        { id: '5', name: 'LIBROS Y PAPELERIA' },
                        { id: '6', name: 'BELLEZA Y CUIDADO PERSONAL' },
                        { id: '7', name: 'AUTOMOTRIZ' },
                        { id: '8', name: 'ALIMENTOS Y BEBIDAS' },
                        { id: '9', name: 'SALUD Y MEDICINA' },
                        { id: '10', name: 'JUGUETES Y JUEGOS' },
                        { id: '11', name: 'HERRAMIENTAS Y FERRETERIA' },
                        { id: '12', name: 'MASCOTAS Y ANIMALES' },
                        { id: '13', name: 'ARTESANIAS Y DECORACION' },
                        { id: '14', name: 'OFICINA Y TECNOLOGIA' },
                        { id: '15', name: 'VIAJES Y TURISMO' }
                  ];
                  setCategories(mockCategories);
            } catch (err) {
                  console.error('Error loading categories:', err);
            }
      }, []);

      // Inicializar datos
      useEffect(() => {
            loadProductos();
            loadStatistics();
            loadCategories();
      }, [loadProductos, loadStatistics, loadCategories]);

      return {
            // Estado
            productos,
            loading,
            error,
            statistics,
            categories,

            // Acciones
            loadProductos,
            createProducto,
            updateProducto,
            deleteProducto,
            updateStock,
            getLowStockProducts,
            loadStatistics,

            // Utilidades
            clearError: () => setError(null)
      };
};

export default useInventario;
