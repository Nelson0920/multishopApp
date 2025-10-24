import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CondicionesPagoService from '@api/services/CondicionesPagoService'
import CondicionesPagoAdapter from '@business/adapters/CondicionesPagoAdapter'
import CondicionesPagoValidator from '@business/validators/CondicionesPagoValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const condicionesPagoService = new CondicionesPagoService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['condicionesPago', 'list', searchTerm],
}

/**
 * Hook para obtener todas las condiciones de pago
 * @param {Object} options - Opciones adicionales para la query
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Object} Resultado de la query
 */
export const useCondicionesPago = (options = {}, searchTerm = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(searchTerm),
            queryFn: async () => {
                  const data = await condicionesPagoService.getAll(searchTerm);
                  const adaptedData = data.map((data) => CondicionesPagoAdapter.adaptServiceToFormData(data));
                  return adaptedData;
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            staleTime: 2 * 60 * 1000, // 2 minutos
            gcTime: 10 * 60 * 1000, // 10 minutos
            retry: 1,
            refetchOnWindowFocus: false,
            ...options,
      })
}

/**
 * Hook para crear una nueva condición de pago
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateCondicionPago = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (condicionData) => {
                  const sanitizedData = CondicionesPagoValidator.sanitizeCondicionData(condicionData);
                  const adaptedData = CondicionesPagoAdapter.adaptFormDataToService(sanitizedData);
                  return condicionesPagoService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['condicionesPago', 'list'] })
                  toast.success('Condición de pago creada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar una condición de pago
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateCondicionPago = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = CondicionesPagoValidator.sanitizeCondicionData(data);
                  const adaptedData = CondicionesPagoAdapter.adaptFormDataToService(sanitizedData);
                  return condicionesPagoService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['condicionesPago', 'list'] })
                  toast.success('Condición de pago actualizada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de condiciones de pago
 * @param {Object} params - Parámetros que incluyen options y searchTerm
 * @returns {Object} Todos los hooks de condiciones de pago
 */
export const useCondicionesPagoOperations = (params = { options: {}, searchTerm: '' }) => {
      const condicionesPagoQuery = useCondicionesPago(params.options?.queries?.list ?? {}, params.searchTerm ?? '')
      const createMutation = useCreateCondicionPago(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateCondicionPago(params.options?.mutations?.update ?? {})

      return {
            condicionesPago: condicionesPagoQuery.data || [],

            isLoading: condicionesPagoQuery.isLoading,
            isError: condicionesPagoQuery.isError,
            error: condicionesPagoQuery.error,

            createCondicionPago: createMutation.mutateAsync,
            updateCondicionPago: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: condicionesPagoQuery.refetch,
      }
}

export default {
      useCondicionesPago,
      useCreateCondicionPago,
      useUpdateCondicionPago,
      useCondicionesPagoOperations,
      QUERY_KEYS,
}
