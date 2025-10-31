import { instanceServices } from '../../axios.js';
import CondicionesPagoErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Condiciones de Pago
 * Maneja todas las operaciones CRUD con el backend
 */
class CondicionesPagoService {
      constructor() {
            this.baseURL = '/finance/payment/condition';
      }

      /**
       * Obtener todas las condiciones de pago
       * @param {string} searchTerm - Término de búsqueda
       * @returns {Promise<Array>} Lista de condiciones de pago
       */
      async getAll(searchTerm = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('search', searchTerm);
                  }
                  const response = await instanceServices.get(`${this.baseURL}`, { params });
                  if (response.data.conditions) {
                        return response.data.conditions;
                  } else {
                        throw new CondicionesPagoErrors('CONDICIONES_PAGO_GET_ALL_ERROR', 'No se encontraron condiciones de pago', 404);
                  }
            } catch (error) {
                  if (error instanceof CondicionesPagoErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CondicionesPagoErrors('CONDICIONES_PAGO_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener condiciones de pago', error.response.status);
                  }
                  throw new CondicionesPagoErrors('CONDICIONES_PAGO_GET_ALL_ERROR', error.message ?? 'Error al obtener condiciones de pago', 500);
            }
      }

      /**
       * Crear una nueva condición de pago
       * @param {Object} condicionData - Datos de la condición de pago
       * @returns {Promise<Object>} Condición de pago creada
       */
      async create(condicionData) {
            try {
                  const response = await instanceServices.post(`${this.baseURL}/register`, condicionData);
                  return response.data;
            } catch (error) {
                  if (error instanceof CondicionesPagoErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CondicionesPagoErrors('CONDICIONES_PAGO_CREATE_ERROR', error.response.data.message ?? 'Error al crear condición de pago', error.response.status);
                  }
                  throw new CondicionesPagoErrors('CONDICIONES_PAGO_CREATE_ERROR', error.message ?? 'Error al crear condición de pago', 500);
            }
      }

      /**
       * Actualizar una condición de pago existente
       * @param {Object} condicionData - Datos de la condición de pago con ID
       * @returns {Promise<Object>} Condición de pago actualizada
       */
      async update(condicionData) {
            try {
                  const response = await instanceServices.put(`${this.baseURL}/edit/${condicionData.id}`, {
                        days: condicionData.days,
                        discount_percentage: condicionData.discount_percentage
                  });
                  return response.data;
            } catch (error) {
                  if (error instanceof CondicionesPagoErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new CondicionesPagoErrors('CONDICIONES_PAGO_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar condición de pago', error.response.status);
                  }
                  throw new CondicionesPagoErrors('CONDICIONES_PAGO_UPDATE_ERROR', error.message ?? 'Error al actualizar condición de pago', 500);
            }
      }

}

export default CondicionesPagoService;
