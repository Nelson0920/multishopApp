

/**
 * Adapter para datos de Categorías
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

import AuxiliaresAdapter from "./AuxiliaresAdapter";
import PlanCuentasAdapter from "./PlanCuentasAdapter";

class CategoriasAdapter {
      /**
       * Adapta los datos del formulario al formato del servicio
       * @param {Object} formData - Datos del formulario con campos de la UI
       * @returns {Object} Datos adaptados para la API { name: string, discount_percentage: number, profit_percentage: number, band_management: boolean }
       */
      static adaptFormDataToService(formData) {
            if (!formData || typeof formData !== 'object') {
                  throw new Error('Los datos del formulario son requeridos');
            }

            const {
                  nombre,
                  margenGanancia,
                  porcentajeComision,
                  id,
                  id_costCenter,
                  // cuentas y auxiliares desde la UI
                  cuentaVentas,
                  cuentaCompras,
                  cuentaConsumos,
                  cuentaDevCompras,
                  cuentaIVA,
                  auxiliarCompras,
                  auxiliarConsumos,
                  auxiliarDevCompras,
                  auxiliarIVA,
                  auxiliarIVA2,
            } = formData;

            if (!nombre) {
                  throw new Error('El campo nombre es requerido');
            }

            return {
                  id: id || undefined,
                  name: nombre.trim(),
                  discount_percentage: this.parsePercentage(porcentajeComision),
                  profit_percentage: this.parsePercentage(margenGanancia),
                  // opcional si la vista aún no lo provee
                  id_costCenter: id_costCenter || '67e5b2856a241f8805247bdb',
                  accounts: {
                        // Ventas (sin auxiliares en UI)
                        account_Sales: cuentaVentas?.id || undefined,
                        auxiliary1_Sales: undefined,
                        auxiliary2_Sales: undefined,
                        // Compras
                        account_buy: cuentaCompras?.id || undefined,
                        auxiliary1_buy: undefined,
                        auxiliary2_buy: auxiliarCompras?.id || undefined,
                        // Consumos
                        account_consumos: cuentaConsumos?.id || undefined,
                        auxiliary1_consumos: auxiliarConsumos?.id || undefined,
                        auxiliary2_consumos: undefined,
                        // Devoluciones en compras
                        account_devbuy: cuentaDevCompras?.id || undefined,
                        auxiliary1_devbuy: undefined,
                        auxiliary2_devbuy: auxiliarDevCompras?.id || undefined,
                        // Impuesto (IVA)
                        account_tax: cuentaIVA?.id || undefined,
                        auxiliary1_tax: auxiliarIVA?.id || undefined,
                        auxiliary2_tax: auxiliarIVA2?.id || undefined,
                  }
            };
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio { name: string, discount_percentage: number, profit_percentage: number, band_management: boolean, id: string }
       * @returns {Object} Datos adaptados para la UI { id: string, nombre: string, margenGanancia: string, porcentajeComision: string }
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const { name, discount_percentage, profit_percentage, id } = serviceData;

            const formData = {
                  id: id || undefined,
                  nombre: name || '',
                  margenGanancia: this.formatPercentage(profit_percentage),
                  porcentajeComision: this.formatPercentage(discount_percentage),
                  // mapear cuentas si vienen desde la API
                  cuentaVentas: PlanCuentasAdapter.adaptServiceToFormData(serviceData?.accounts?.account_Sales),
                  cuentaCompras: PlanCuentasAdapter.adaptServiceToFormData(serviceData?.accounts?.account_buy),
                  cuentaConsumos: PlanCuentasAdapter.adaptServiceToFormData(serviceData?.accounts?.account_consumos),
                  cuentaDevCompras: PlanCuentasAdapter.adaptServiceToFormData(serviceData?.accounts?.account_devbuy),
                  cuentaIVA: PlanCuentasAdapter.adaptServiceToFormData(serviceData?.accounts?.account_tax),
                  auxiliarCompras: AuxiliaresAdapter.adaptServiceToFormData(serviceData?.accounts?.auxiliary2_buy),
                  auxiliarConsumos: AuxiliaresAdapter.adaptServiceToFormData(serviceData?.accounts?.auxiliary1_consumos),
                  auxiliarDevCompras: AuxiliaresAdapter.adaptServiceToFormData(serviceData?.accounts?.auxiliary2_devbuy),
                  auxiliarIVA: AuxiliaresAdapter.adaptServiceToFormData(serviceData?.accounts?.auxiliary1_tax),
                  auxiliarIVA2: AuxiliaresAdapter.adaptServiceToFormData(serviceData?.accounts?.auxiliary2_tax),
                  id_costCenter: serviceData?.id_costCenter || ''
            };
            return formData;
      }

      /**
       * Convierte un porcentaje de string a número
       * @param {string|number} percentage - Porcentaje como string o número
       * @returns {number} Porcentaje como número
       */
      static parsePercentage(percentage) {
            if (typeof percentage === 'number') {
                  return percentage;
            }
            if (typeof percentage === 'string') {
                  const cleanPercentage = percentage.replace('%', '').trim();
                  const parsed = parseFloat(cleanPercentage);
                  return isNaN(parsed) ? 0 : parsed;
            }
            return 0;
      }

      /**
       * Convierte un porcentaje de número a string con formato
       * @param {number} percentage - Porcentaje como número
       * @returns {string} Porcentaje como string con símbolo %
       */
      static formatPercentage(percentage) {
            if (typeof percentage === 'number') {
                  return `${percentage}%`;
            }
            if (typeof percentage === 'string') {
                  return percentage.includes('%') ? percentage : `${percentage}%`;
            }
            return '0%';
      }

      /**
       * Valida que los datos del formulario tengan el formato correcto
       * @param {Object} formData - Datos del formulario
       * @returns {boolean} true si el formato es válido
       */
      static isValidFormData(formData) {
            return formData &&
                  typeof formData === 'object' &&
                  typeof formData.nombre === 'string' &&
                  formData.nombre.trim().length > 0;
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

export default CategoriasAdapter;
