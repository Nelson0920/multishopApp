import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PlanCuentasService from '@api/services/PlanCuentasService'
import PlanCuentasAdapter from '@business/adapters/PlanCuentasAdapter'
import PlanCuentasValidator from '@business/validators/PlanCuentasValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import PlanCuentasErrors from '../../../api/services/PlanCuentasService/errors'

// Instancia del servicio
const planCuentasService = new PlanCuentasService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['plan-cuentas', 'list', searchTerm],
}

/**
 * Hook para obtener todas las cuentas del plan
 * @param {Object} options - Opciones adicionales para la query
 * @param {string} searchTerm - Término de búsqueda
 * @param {string} category - Categoría de la cuenta
 * @returns {Object} Resultado de la query
 */
export const usePlanCuentas = (options = {}, searchTerm = '', category = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(`${searchTerm}-${category}`),
            queryFn: async () => {
                  const data = await planCuentasService.getAll(searchTerm, category);
                  const adaptedData = data.map((data) => PlanCuentasAdapter.adaptServiceToFormData(data));
                  return adaptedData;
            },
            staleTime: 2 * 60 * 1000, // 2 minutos
            gcTime: 10 * 60 * 1000, // 10 minutos
            retry: (failureCount, error) => {
                  // No reintentar si es un error personalizado de PlanCuentas
                  if (error instanceof PlanCuentasErrors) {
                        return false;
                  }
                  // Reintentar máximo 1 vez para otros errores
                  return failureCount < 1;
            },
            refetchOnWindowFocus: false,
            ...options,
      })
}

/**
 * Hook para crear una nueva cuenta
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateCuenta = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (cuentaData) => {
                  const sanitizedData = PlanCuentasValidator.sanitizeCuentaData(cuentaData);
                  const adaptedData = PlanCuentasAdapter.adaptFormDataToService(sanitizedData);
                  return planCuentasService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['plan-cuentas', 'list'] })
                  toast.success('Cuenta creada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar una cuenta
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateCuenta = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = PlanCuentasValidator.sanitizeCuentaData(data);
                  const adaptedData = PlanCuentasAdapter.adaptFormDataToService(sanitizedData);
                  return planCuentasService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['plan-cuentas', 'list'] })
                  toast.success('Cuenta actualizada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de cuentas
 * @param {Object} params - Parámetros que incluyen options y searchTerm
 * @returns {Object} Todos los hooks de cuentas
 */
export const usePlanCuentasOperations = (params = { options: {}, searchTerm: '', category: '' }) => {
      const cuentasQuery = usePlanCuentas(params.options?.queries?.list ?? {}, params.searchTerm ?? '', params.category ?? '')
      const createMutation = useCreateCuenta(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateCuenta(params.options?.mutations?.update ?? {})

      return {
            cuentas: cuentasQuery.data || [],

            isLoading: cuentasQuery.isLoading,
            isError: cuentasQuery.isError,
            error: cuentasQuery.error,

            createCuenta: createMutation.mutateAsync,
            updateCuenta: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: cuentasQuery.refetch,
      }
}

export default {
      usePlanCuentas,
      useCreateCuenta,
      useUpdateCuenta,
      usePlanCuentasOperations,
      QUERY_KEYS,
}
