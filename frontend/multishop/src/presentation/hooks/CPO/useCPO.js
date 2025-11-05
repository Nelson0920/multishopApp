import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CPOService from '@api/services/CPOService'
import CPOAdapter from '@business/adapters/CPOAdapter'
import CPOValidator from '@business/validators/CPOValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const cpoService = new CPOService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['cpo', 'list', searchTerm],
}

/**
 * Hook para obtener todos los CPOs
 * @param {Object} options - Opciones adicionales para la query
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Object} Resultado de la query
 */
export const useCPO = (options = {}, searchTerm = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(searchTerm),
            queryFn: async () => {
                  const data = await cpoService.getAll(searchTerm);
                  const adaptedData = data.map((item) => CPOAdapter.adaptServiceToFormData(item));
                  return adaptedData;
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response?.data?.message : error.message);
            },
            staleTime: 2000, // 2 segundos
            gcTime: 10 * 60 * 1000, // 10 minutos
            retry: 1,
            refetchOnWindowFocus: false,
            ...options,
      })
}

/**
 * Hook para crear un nuevo CPO
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateCPO = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (cpoData) => {
                  const sanitizedData = CPOValidator.sanitizeCPOData(cpoData);
                  const adaptedData = CPOAdapter.adaptFormDataToService(sanitizedData);
                  return cpoService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['cpo', 'list'] })
                  toast.success('CPO creado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response?.data?.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar un CPO
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateCPO = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = CPOValidator.sanitizeCPOData(data);
                  const adaptedData = CPOAdapter.adaptFormDataToService(sanitizedData);
                  // Incluir el ID en los datos para la actualización
                  adaptedData.id = sanitizedData.id;
                  return cpoService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['cpo', 'list'] })
                  toast.success('CPO actualizado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response?.data?.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de CPOs
 * @param {Object} params - Parámetros que incluyen options y searchTerm
 * @returns {Object} Todos los hooks de CPO
 */
export const useCPOOperations = (params = { options: {}, searchTerm: '' }) => {
      const cpoQuery = useCPO(params.options ?? {}, params.searchTerm ?? '')
      const createMutation = useCreateCPO(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateCPO(params.options?.mutations?.update ?? {})

      return {
            cpos: cpoQuery.data || [],

            isLoading: cpoQuery.isLoading,
            isError: cpoQuery.isError,
            error: cpoQuery.error,

            createCPO: createMutation.mutateAsync,
            updateCPO: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: cpoQuery.refetch,
      }
}

export default {
      useCPO,
      useCreateCPO,
      useUpdateCPO,
      useCPOOperations,
      QUERY_KEYS,
}

