import { instanceServices } from '../../axios.js';
import AuxiliaresErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Auxiliares Contables
 * Maneja todas las operaciones CRUD con el backend
 */
class AuxiliaresService {
      constructor() {
            this.baseURL = '/accounts/auxiliaries';
      }

      /**
       * Obtener todos los auxiliares
       * @returns {Promise<Array>} Lista de auxiliares
       */
      async getAll(searchTerm = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('codigo', searchTerm);
                  }
                  const response = await instanceServices.get(`${this.baseURL}`, { params });
                  if (response.data.auxiliaries) {
                        return response.data.auxiliaries;
                  } else {
                        throw new AuxiliaresErrors('AUXILIARES_GET_ALL_ERROR', 'No se encontraron auxiliares', 404);
                  }
            } catch (error) {
                  if (error instanceof AuxiliaresErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AuxiliaresErrors('AUXILIARES_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener auxiliares', error.response.status);
                  }
                  throw new AuxiliaresErrors('AUXILIARES_GET_ALL_ERROR', error.message ?? 'Error al obtener auxiliares', 500);
            }
      }

      /**
       * Crear un nuevo auxiliar
       * @param {Object} auxiliarData - Datos del auxiliar
       * @returns {Promise<Object>} Auxiliar creado
       */
      async create(auxiliarData) {
            try {
                  const response = await instanceServices.post(`${this.baseURL}/register`, auxiliarData);
                  return response.data;
            } catch (error) {
                  if (error instanceof AuxiliaresErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AuxiliaresErrors('AUXILIARES_CREATE_ERROR', error.response.data.message ?? 'Error al crear auxiliar', error.response.status);
                  }
                  throw new AuxiliaresErrors('AUXILIARES_CREATE_ERROR', error.message ?? 'Error al crear auxiliar', 500);
            }
      }

      /**
       * Actualizar un auxiliar existente
       * @param {number} id - ID del auxiliar
       * @param {Object} auxiliarData - Nuevos datos del auxiliar
       * @returns {Promise<Object>} Auxiliar actualizado
       */
      async update(auxiliarData) {
            try {
                  const response = await instanceServices.put(`${this.baseURL}/edit/${auxiliarData.id}`, auxiliarData);
                  return response.data;
            } catch (error) {
                  if (error instanceof AuxiliaresErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AuxiliaresErrors('AUXILIARES_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar auxiliar', error.response.status);
                  }
                  throw new AuxiliaresErrors('AUXILIARES_UPDATE_ERROR', error.message ?? 'Error al actualizar auxiliar', 500);
            }
      }

}

export default AuxiliaresService;
