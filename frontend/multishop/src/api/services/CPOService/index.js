import { instanceUser } from '../../axios.js';
import CPOErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para CPO (Clientes, Proveedores y Otros)
 * Maneja todas las operaciones CRUD con el backend
 */
class CPOService {
      constructor() {
            this.baseURL = '/clients';
      }

      /**
       * Obtener todos los CPOs
       * @param {string} searchTerm - Término de búsqueda
       * @returns {Promise<Array>} Lista de CPOs
       */
      async getAll(searchTerm = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('search', searchTerm);
                  }
                  const response = await instanceUser.get(`${this.baseURL}`, { params });
                  if (response.data.data || response.data.clients) {
                        return response.data.data || response.data.clients;
                  } else {
                        throw new CPOErrors('CPO_GET_ALL_ERROR', 'No se encontraron CPOs', 404);
                  }
            } catch (error) {
                  if (error instanceof CPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CPOErrors('CPO_GET_ALL_ERROR', error.response?.data?.message ?? 'Error al obtener CPOs', error.response?.status ?? 500);
                  }
                  throw new CPOErrors('CPO_GET_ALL_ERROR', error.message ?? 'Error al obtener CPOs', 500);
            }
      }

      /**
       * Crear un nuevo CPO
       * @param {Object} cpoData - Datos del CPO
       * @returns {Promise<Object>} CPO creado
       */
      async create(cpoData) {
            try {
                  const response = await instanceUser.post(`${this.baseURL}/register`, cpoData);
                  return response.data;
            } catch (error) {
                  if (error instanceof CPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CPOErrors('CPO_CREATE_ERROR', error.response?.data?.message ?? 'Error al crear CPO', error.response?.status ?? 500);
                  }
                  throw new CPOErrors('CPO_CREATE_ERROR', error.message ?? 'Error al crear CPO', 500);
            }
      }

      /**
       * Actualizar un CPO existente
       * @param {Object} cpoData - Datos del CPO con ID
       * @returns {Promise<Object>} CPO actualizado
       */
      async update(cpoData) {
            try {
                  // El endpoint PUT /clients/edit espera el ID en el body según el formato del usuario
                  const { id, ...updateData } = cpoData;
                  const response = await instanceUser.put(`${this.baseURL}/edit`, { ...updateData, id });
                  return response.data;
            } catch (error) {
                  if (error instanceof CPOErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CPOErrors('CPO_UPDATE_ERROR', error.response?.data?.message ?? 'Error al actualizar CPO', error.response?.status ?? 500);
                  }
                  throw new CPOErrors('CPO_UPDATE_ERROR', error.message ?? 'Error al actualizar CPO', 500);
            }
      }

}

export default CPOService;

