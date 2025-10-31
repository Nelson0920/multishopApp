import { instanceServices } from '../../axios.js';
import PlanCuentasErrors from './errors.js';
import { AxiosError } from 'axios';

/**
 * Servicio de API para Plan de Cuentas
 * Maneja todas las operaciones CRUD con el backend
 */
class PlanCuentasService {
      constructor() {
            this.baseURL = '/accounts/accounting';
      }

      /**
       * Obtener todas las cuentas del plan
       * @param {string} searchTerm - Término de búsqueda
       * @returns {Promise<Array>} Lista de cuentas
       */
      async getAll(searchTerm = '', category = '') {
            try {
                  const params = new URLSearchParams();
                  if (searchTerm) {
                        params.append('search', searchTerm);
                  }
                  if (category) {
                        params.append('category', category);
                  }
                  const response = await instanceServices.get(`${this.baseURL}`, { params });
                  if (response.data.accounting) {
                        return response.data.accounting;
                  } else {
                        throw new PlanCuentasErrors('PLAN_CUENTAS_GET_ALL_ERROR', 'No se encontraron cuentas', 404);
                  }
            } catch (error) {
                  if (error instanceof PlanCuentasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new PlanCuentasErrors('PLAN_CUENTAS_GET_ALL_ERROR', error.response.data.message ?? 'Error al obtener cuentas', error.response.status);
                  }
                  throw new PlanCuentasErrors('PLAN_CUENTAS_GET_ALL_ERROR', error.message ?? 'Error al obtener cuentas', 500);
            }
      }

      /**
       * Crear una nueva cuenta
       * @param {Object} cuentaData - Datos de la cuenta
       * @returns {Promise<Object>} Cuenta creada
       */
      async create(cuentaData) {
            try {
                  const response = await instanceServices.post(`${this.baseURL}/register`, cuentaData);
                  return response.data;
            } catch (error) {
                  console.log('error create', error);
                  if (error instanceof PlanCuentasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new PlanCuentasErrors('PLAN_CUENTAS_CREATE_ERROR', error.response.data.message ?? 'Error al crear cuenta', error.response.status);
                  }
                  throw new PlanCuentasErrors('PLAN_CUENTAS_CREATE_ERROR', error.message ?? 'Error al crear cuenta', 500);
            }
      }

      /**
       * Actualizar una cuenta existente
       * @param {Object} cuentaData - Datos de la cuenta con ID
       * @returns {Promise<Object>} Cuenta actualizada
       */
      async update(cuentaData) {
            try {
                  const response = await instanceServices.put(`${this.baseURL}/edit/${cuentaData.id}`, {
                        name: cuentaData.name,
                        code_account: cuentaData.code_account,
                        auxiliary1_initials: cuentaData.auxiliary1_initials,
                        auxiliary2_initials: cuentaData.auxiliary2_initials,
                        category_account: cuentaData.category_account,
                  });
                  return response.data;
            } catch (error) {
                  if (error instanceof PlanCuentasErrors) {
                        throw error;
                  }
                  if (error instanceof AxiosError) {
                        throw new PlanCuentasErrors('PLAN_CUENTAS_UPDATE_ERROR', error.response.data.message ?? 'Error al actualizar cuenta', error.response.status);
                  }
                  throw new PlanCuentasErrors('PLAN_CUENTAS_UPDATE_ERROR', error.message ?? 'Error al actualizar cuenta', 500);
            }
      }

}

export default PlanCuentasService;
