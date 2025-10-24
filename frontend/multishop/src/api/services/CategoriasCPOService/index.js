import { instanceUser } from '../../axios.js';
import CategoriasCPOErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Categorías CPO
 * Maneja todas las operaciones CRUD con el backend
 */
class CategoriasCPOService {
      constructor() {
            this.baseURL = '/clients/category';
      }

      /**
       * Obtener todas las categorías CPO
       * @param {string} searchTerm - Término de búsqueda
       * @returns {Promise<Array>} Lista de categorías CPO
       */
      async getAll(searchTerm = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('search', searchTerm);
                  }
                  const response = await instanceUser.get(`${this.baseURL}`, { params });
                  if (response.data.categories) {
                        return response.data.categories;
                  } else {
                        throw new CategoriasCPOErrors('CATEGORIAS_CPO_GET_ALL_ERROR', 'No se encontraron categorías CPO', 404);
                  }
            } catch (error) {
                  if (error instanceof CategoriasCPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasCPOErrors('CATEGORIAS_CPO_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener categorías CPO', error.response.status);
                  }
                  throw new CategoriasCPOErrors('CATEGORIAS_CPO_GET_ALL_ERROR', error.message ?? 'Error al obtener categorías CPO', 500);
            }
      }

      /**
       * Crear una nueva categoría CPO
       * @param {Object} categoriaData - Datos de la categoría CPO
       * @returns {Promise<Object>} Categoría CPO creada
       */
      async create(categoriaData) {
            try {
                  const response = await instanceUser.post(`${this.baseURL}/register`, categoriaData);
                  return response.data;
            } catch (error) {
                  if (error instanceof CategoriasCPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasCPOErrors('CATEGORIAS_CPO_CREATE_ERROR', error.response.data.message ?? 'Error al crear categoría CPO', error.response.status);
                  }
                  throw new CategoriasCPOErrors('CATEGORIAS_CPO_CREATE_ERROR', error.message ?? 'Error al crear categoría CPO', 500);
            }
      }

      /**
       * Actualizar una categoría CPO existente
       * @param {Object} categoriaData - Datos de la categoría CPO con ID
       * @returns {Promise<Object>} Categoría CPO actualizada
       */
      async update(categoriaData) {
            try {
                  const response = await instanceUser.put(`${this.baseURL}/edit/${categoriaData.id}`, {
                        name: categoriaData.name,
                        credit_limit: categoriaData.credit_limit,
                        credit_terms: categoriaData.credit_terms,
                        discount_percentage: categoriaData.discount_percentage,
                        id_accounting_accounts: categoriaData.id_accounting_accounts,
                        auxiliary1: categoriaData.auxiliary1,
                        auxiliary2: categoriaData.auxiliary2,
                        deadline_day: categoriaData.deadline_day
                  });
                  return response.data;
            } catch (error) {
                  if (error instanceof CategoriasCPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CategoriasCPOErrors('CATEGORIAS_CPO_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar categoría CPO', error.response.status);
                  }
                  throw new CategoriasCPOErrors('CATEGORIAS_CPO_UPDATE_ERROR', error.message ?? 'Error al actualizar categoría CPO', 500);
            }
      }
}

export default CategoriasCPOService;
