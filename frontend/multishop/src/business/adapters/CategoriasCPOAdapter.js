/**
 * Adapter para datos de Categorías CPO
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

import AuxiliaresAdapter from "./AuxiliaresAdapter";
import PlanCuentasAdapter from "./PlanCuentasAdapter";

class CategoriasCPOAdapter {
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
                  name,
                  credit_limit,
                  credit_terms,
                  discount_percentage,
                  plan_cuentas,
                  auxiliary1,
                  auxiliary2,
                  deadline_day,
                  id
            } = formData;

            if (!name) {
                  throw new Error('El campo nombre es requerido');
            }

            return {
                  id: id || undefined,
                  name: name.trim(),
                  credit_limit: parseFloat(credit_limit) || 0,
                  credit_terms: parseFloat(credit_terms) || 0,
                  discount_percentage: parseFloat(discount_percentage) || 0,
                  id_accounting_accounts: plan_cuentas?.id || '',
                  auxiliary1: auxiliary1?.id || '',
                  auxiliary2: auxiliary2?.id || '',
                  deadline_day: parseInt(deadline_day) || 365
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio de la API
       * @returns {Object} Datos adaptados para la UI
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const {
                  name,
                  credit_limit,
                  credit_terms,
                  discount_percentage,
                  accountingAccount,
                  auxiliary1,
                  auxiliary2,
                  deadline_day,
                  id
            } = serviceData;

            return {
                  id: id || undefined,
                  name: name || '',
                  credit_limit: credit_limit || 0,
                  credit_terms: credit_terms || 0,
                  discount_percentage: discount_percentage || 0,
                  plan_cuentas: PlanCuentasAdapter.adaptServiceToFormData(accountingAccount) || '',
                  auxiliary1: AuxiliaresAdapter.adaptServiceToFormData(auxiliary1) || '',
                  auxiliary2: AuxiliaresAdapter.adaptServiceToFormData(auxiliary2) || '',
                  deadline_day: deadline_day || 365,
                  createdAt: serviceData.createdAt || ''
            };
      }

      /**
       * Valida que los datos del formulario tengan el formato correcto
       * @param {Object} formData - Datos del formulario
       * @returns {boolean} true si el formato es válido
       */
      static isValidFormData(formData) {
            return formData &&
                  typeof formData === 'object' &&
                  typeof formData.name === 'string' &&
                  formData.name.trim().length > 0;
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
}

export default CategoriasCPOAdapter;
