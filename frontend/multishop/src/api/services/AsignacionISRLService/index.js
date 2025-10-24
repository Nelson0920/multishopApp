import { instanceServices } from '../../axios.js';
import AsignacionISRLError from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Conceptos de Retención ISRL
 * Maneja todas las operaciones CRUD con el backend
 */
class AsignacionISRLService {
      constructor() {
            this.baseURL = '/finance/concept/islr';
      }

      /**
       * Obtener todos los conceptos de retención ISRL
       * @returns {Promise<Array>} Lista de conceptos ISRL
       */
      async getAll() {
            try {
                  const response = await instanceServices.get(`${this.baseURL}`);
                  if (response.data.concept) {
                        return response.data.concept;
                  } else {
                        throw new AsignacionISRLError('ASIGNACION_ISRL_GET_ALL_ERROR', 'No se encontraron conceptos de retención ISRL', 404);
                  }
            } catch (error) {
                  if (error instanceof AsignacionISRLError) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AsignacionISRLError('ASIGNACION_ISRL_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener conceptos de retención ISRL', error.response.status);
                  }
                  throw new AsignacionISRLError('ASIGNACION_ISRL_GET_ALL_ERROR', error.message ?? 'Error al obtener conceptos de retención ISRL', 500);
            }
      }

      /**
       * Crear un nuevo concepto de retención ISRL
       * @param {Object} conceptData - Datos del concepto
       * @returns {Promise<Object>} Concepto creado
       */
      async create(conceptData) {
            try {
                  const response = await instanceServices.post(`${this.baseURL}/register`, conceptData);
                  return response.data;
            } catch (error) {
                  if (error instanceof AsignacionISRLError) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AsignacionISRLError('ASIGNACION_ISRL_CREATE_ERROR', error.response.data.message ?? 'Error al crear concepto de retención ISRL', error.response.status);
                  }
                  throw new AsignacionISRLError('ASIGNACION_ISRL_CREATE_ERROR', error.message ?? 'Error al crear concepto de retención ISRL', 500);
            }
      }

      /**
       * Actualizar un concepto de retención ISRL existente
       * @param {Object} conceptData - Nuevos datos del concepto
       * @returns {Promise<Object>} Concepto actualizado
       */
      async update(conceptData) {
            try {
                  const response = await instanceServices.put(`${this.baseURL}/edit/${conceptData.id}`, {
                        code: conceptData.code,
                        name: conceptData.name,
                        percentage_pn: conceptData.percentage_pn,
                        percentage_pj: conceptData.percentage_pj,
                        subtrahend_amount_pn: conceptData.subtrahend_amount_pn,
                        subtrahend_amount_pj: conceptData.subtrahend_amount_pj
                  });
                  return response.data;
            } catch (error) {
                  if (error instanceof AsignacionISRLError) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new AsignacionISRLError('ASIGNACION_ISRL_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar concepto de retención ISRL', error.response.status);
                  }
                  throw new AsignacionISRLError('ASIGNACION_ISRL_UPDATE_ERROR', error.message ?? 'Error al actualizar concepto de retención ISRL', 500);
            }
      }
}

export default AsignacionISRLService;
