import { instanceServices } from '../../axios.js';
import CategoriasErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Categorías
 * Maneja todas las operaciones CRUD con el backend
 */
class CategoriasService {
      constructor() {
            this.baseURL = '/category';
      }

      /**
       * Obtener todas las categorías
       * @param {string} searchTerm - Término de búsqueda
       * @returns {Promise<Array>} Lista de categorías
       */
      async getAll(searchTerm = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('name', searchTerm);
                  }
                  const response = await instanceServices.get(`${this.baseURL}`, { params });
                  if (response.data.data) {
                        return response.data.data;
                  } else {
                        throw new CategoriasErrors('CATEGORIAS_GET_ALL_ERROR', 'No se encontraron categorías', 404);
                  }
            } catch (error) {
                  if (error instanceof CategoriasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasErrors('CATEGORIAS_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener categorías', error.response.status);
                  }
                  throw new CategoriasErrors('CATEGORIAS_GET_ALL_ERROR', error.message ?? 'Error al obtener categorías', 500);
            }
      }

      /**
       * Crear una nueva categoría
       * @param {Object} categoriaData - Datos de la categoría
       * @returns {Promise<Object>} Categoría creada
       */
      async create(categoriaData) {
            try {
                  const response = await instanceServices.post(`${this.baseURL}/register`, categoriaData);
                  return response.data;
            } catch (error) {
                  if (error instanceof CategoriasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasErrors('CATEGORIAS_CREATE_ERROR', error.response.data.message ?? 'Error al crear categoría', error.response.status);
                  }
                  throw new CategoriasErrors('CATEGORIAS_CREATE_ERROR', error.message ?? 'Error al crear categoría', 500);
            }
      }

      /**
       * Actualizar una categoría existente
       * @param {Object} categoriaData - Datos de la categoría con ID
       * @returns {Promise<Object>} Categoría actualizada
       */
      async update(categoriaData) {
            try {
                  const response = await instanceServices.put(`${this.baseURL}/edit/${categoriaData.id}`, {
                        name: categoriaData.name,
                        discount_percentage: categoriaData.discount_percentage,
                        profit_percentage: categoriaData.profit_percentage,
                        accounts: categoriaData.accounts
                  });
                  return response.data;
            } catch (error) {
                  if (error instanceof CategoriasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasErrors('CATEGORIAS_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar categoría', error.response.status);
                  }
                  throw new CategoriasErrors('CATEGORIAS_UPDATE_ERROR', error.message ?? 'Error al actualizar categoría', 500);
            }
      }

}

export default CategoriasService;
