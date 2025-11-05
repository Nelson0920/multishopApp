/**
 * Adapter para datos de CPO (Clientes, Proveedores y Otros)
 * Convierte los datos del formulario al formato esperado por el servicio
 * Implementa el patrón Adapter para adaptar interfaces incompatibles
 */

class CPOAdapter {
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
                  type,
                  rif,
                  name,
                  gender,
                  birthdate,
                  name_commercial,
                  address,
                  phone,
                  email,
                  observations,
                  id_categories_clients,
                  id_sellers,
                  credentials,
                  marketing_environment,
                  id_accounting_accounts,
                  auxiliary1,
                  auxiliary2,
                  bank_accounts,
                  id_PaymentConditions,
                  type_taxpayer,
                  retention_percentage_iva,
                  id_RetentionISLRConcepts,
                  automatic_islr,
                  blockade,
                  observations_blockade,
                  credit_conditions,
                  credit_limit,
                  credit_terms,
                  discount_percentage,
                  last_visit
            } = formData;

            if (!name || !rif || !type) {
                  throw new Error('Los campos name, rif y type son requeridos');
            }

            const adaptedData = {
                  type: type.trim(),
                  rif: rif.trim(),
                  name: name.trim(),
                  name_commercial: name_commercial?.trim() || '',
                  address: address?.trim() || '',
                  phone: phone?.trim() || '',
                  email: email?.trim() || '',
                  observations: observations?.trim() || '',
                  marketing_environment: marketing_environment || 'nacional',
                  bank_accounts: bank_accounts?.trim() || 'sin cuenta bancaria',
                  type_taxpayer: type_taxpayer || 'contribuyente',
                  retention_percentage_iva: this.parseNumber(retention_percentage_iva) || 0,
                  automatic_islr: automatic_islr || false,
                  blockade: blockade ? 1 : 0,
                  observations_blockade: observations_blockade?.trim() || ''
            };

            // Campos específicos para clientes
            if (type === 'cliente' || type === 'client') {
                  if (gender) {
                        adaptedData.gender = gender;
                  }
                  if (birthdate) {
                        adaptedData.birthdate = this.formatDate(birthdate);
                  }
                  if (credentials) {
                        adaptedData.credentials = {
                              username: credentials?.username || credentials?.trim() || '',
                              password: credentials?.password || ''
                        };
                  }
                  if (last_visit) {
                        adaptedData.last_visit = this.formatDate(last_visit);
                  }
            }

            // Campos de relaciones
            if (id_categories_clients) {
                  adaptedData.id_categories_clients = this.extractId(id_categories_clients);
            }

            if (id_sellers) {
                  adaptedData.id_sellers = this.extractId(id_sellers);
            }

            if (id_accounting_accounts) {
                  adaptedData.id_accounting_accounts = this.extractId(id_accounting_accounts);
            }

            if (auxiliary1) {
                  adaptedData.auxiliary1 = typeof auxiliary1 === 'object' ? auxiliary1.auxiliar : auxiliary1;
            }

            if (auxiliary2) {
                  adaptedData.auxiliary2 = typeof auxiliary2 === 'object' ? auxiliary2.auxiliar : auxiliary2;
            }

            if (id_PaymentConditions) {
                  adaptedData.id_PaymentConditions = this.extractId(id_PaymentConditions);
            }

            if (id_RetentionISLRConcepts) {
                  adaptedData.id_RetentionISLRConcepts = this.extractId(id_RetentionISLRConcepts);
            }

            // Campos opcionales de crédito
            if (credit_conditions !== undefined) {
                  adaptedData.credit_conditions = this.parseNumber(credit_conditions);
            }

            if (credit_limit !== undefined) {
                  adaptedData.credit_limit = this.parseNumber(credit_limit);
            }

            if (credit_terms !== undefined) {
                  adaptedData.credit_terms = this.parseNumber(credit_terms);
            }

            if (discount_percentage !== undefined) {
                  adaptedData.discount_percentage = this.parseNumber(discount_percentage);
            }

            // Si es edición, no incluimos el ID aquí porque el endpoint PUT /clients/edit
            // probablemente lo necesite en el body o en la URL según la estructura
            // Por ahora lo omitimos y se manejará en el servicio

            return adaptedData;
      }

      /**
       * Adapta los datos del servicio al formato del formulario
       * @param {Object} serviceData - Datos del servicio
       * @returns {Object} Datos adaptados para la UI
       */
      static adaptServiceToFormData(serviceData) {
            if (!serviceData || typeof serviceData !== 'object') {
                  throw new Error('Los datos del servicio son requeridos');
            }

            const {
                  id,
                  type,
                  rif,
                  name,
                  gender,
                  birthdate,
                  name_commercial,
                  address,
                  phone,
                  email,
                  observations,
                  id_categories_clients,
                  id_sellers,
                  credentials,
                  marketing_environment,
                  id_accounting_accounts,
                  auxiliary1,
                  auxiliary2,
                  bank_accounts,
                  id_PaymentConditions,
                  type_taxpayer,
                  retention_percentage_iva,
                  id_RetentionISLRConcepts,
                  automatic_islr,
                  blockade,
                  observations_blockade,
                  credit_conditions,
                  credit_limit,
                  credit_terms,
                  discount_percentage,
                  last_visit
            } = serviceData;

            const formData = {
                  id: id || undefined,
                  type: type || 'cliente',
                  rif: rif || '',
                  name: name || '',
                  gender: gender || '',
                  birthdate: birthdate ? this.parseDate(birthdate) : '',
                  name_commercial: name_commercial || '',
                  address: address || '',
                  phone: phone || '',
                  email: email || '',
                  observations: observations || '',
                  id_categories_clients: id_categories_clients || '',
                  id_sellers: id_sellers || '',
                  credentials: credentials?.username || credentials || '',
                  marketing_environment: marketing_environment || 'nacional',
                  id_accounting_accounts: id_accounting_accounts || '',
                  auxiliary1: auxiliary1 || '',
                  auxiliary2: auxiliary2 || '',
                  bank_accounts: bank_accounts || '',
                  id_PaymentConditions: id_PaymentConditions || '',
                  type_taxpayer: type_taxpayer || 'contribuyente',
                  retention_percentage_iva: retention_percentage_iva !== undefined ? retention_percentage_iva : 0,
                  id_RetentionISLRConcepts: id_RetentionISLRConcepts || '',
                  automatic_islr: automatic_islr || false,
                  blockade: blockade === 1 || blockade === true,
                  observations_blockade: observations_blockade || '',
                  credit_conditions: credit_conditions || undefined,
                  credit_limit: credit_limit || undefined,
                  credit_terms: credit_terms || undefined,
                  discount_percentage: discount_percentage || undefined,
                  last_visit: last_visit ? this.parseDate(last_visit) : ''
            };

            return formData;
      }

      /**
       * Extrae el ID de un objeto o valor
       * @param {string|Object} value - Valor que puede ser ID o objeto con ID
       * @returns {string} ID extraído
       */
      static extractId(value) {
            if (typeof value === 'string') {
                  return value;
            }
            if (typeof value === 'object' && value !== null) {
                  return value.id || value._id || value;
            }
            return value;
      }

      /**
       * Parsea un número de string o número
       * @param {string|number} value - Valor a parsear
       * @returns {number} Número parseado o 0
       */
      static parseNumber(value) {
            if (typeof value === 'number') {
                  return value;
            }
            if (typeof value === 'string') {
                  const parsed = parseFloat(value);
                  return isNaN(parsed) ? 0 : parsed;
            }
            return 0;
      }

      /**
       * Formatea una fecha para el servicio (ISO string)
       * @param {string} date - Fecha en formato string
       * @returns {string} Fecha en formato ISO
       */
      static formatDate(date) {
            if (!date) return undefined;
            if (typeof date === 'string') {
                  // Si ya está en formato ISO, devolverla
                  if (date.includes('T') || date.includes('Z')) {
                        return date;
                  }
                  // Si es formato YYYY-MM-DD, convertir a ISO
                  const d = new Date(date);
                  return isNaN(d.getTime()) ? undefined : d.toISOString();
            }
            return undefined;
      }

      /**
       * Parsea una fecha del servicio al formato del formulario
       * @param {string} date - Fecha en formato ISO
       * @returns {string} Fecha en formato YYYY-MM-DD
       */
      static parseDate(date) {
            if (!date) return '';
            try {
                  const d = new Date(date);
                  if (isNaN(d.getTime())) return '';
                  return d.toISOString().split('T')[0];
            } catch {
                  return '';
            }
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
                  formData.name.trim().length > 0 &&
                  typeof formData.rif === 'string' &&
                  formData.rif.trim().length > 0;
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
                  serviceData.name.trim().length > 0 &&
                  typeof serviceData.rif === 'string' &&
                  serviceData.rif.trim().length > 0;
      }
}

export default CPOAdapter;

