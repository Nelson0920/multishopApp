import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CategoriasCPOService from '@api/services/CategoriasCPOService'
import CategoriasCPOAdapter from '@business/adapters/CategoriasCPOAdapter'
import CategoriasCPOValidator from '@business/validators/CategoriasCPOValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const categoriasCPOService = new CategoriasCPOService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['categoriasCPO', 'list', searchTerm],
}

/**
 * Hook para obtener todas las categorías CPO
 * @param {Object} options - Opciones adicionales para la query
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Object} Resultado de la query
 */
export const useCategoriasCPO = (options = {}, searchTerm = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(searchTerm),
            queryFn: async () => {
                  const data = await categoriasCPOService.getAll(searchTerm);
                  const adaptedData = data.map((data) => CategoriasCPOAdapter.adaptServiceToFormData(data));
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
 * Hook para crear una nueva categoría CPO
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateCategoriaCPO = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (categoriaData) => {
                  const sanitizedData = CategoriasCPOValidator.sanitizeCategoriaData(categoriaData);
                  const adaptedData = CategoriasCPOAdapter.adaptFormDataToService(sanitizedData);
                  return categoriasCPOService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() })
                  toast.success('Categoría CPO creada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar una categoría CPO
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateCategoriaCPO = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = CategoriasCPOValidator.sanitizeCategoriaData(data);
                  const adaptedData = CategoriasCPOAdapter.adaptFormDataToService(sanitizedData);
                  return categoriasCPOService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() })
                  toast.success('Categoría CPO actualizada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de categorías CPO
 * @param {Object} params - Parámetros que incluyen options y searchTerm
 * @returns {Object} Todos los hooks de categorías CPO
 */
export const useCategoriasCPOOperations = (params = { options: {}, searchTerm: '' }) => {
      const categoriasCPOQuery = useCategoriasCPO(params.options?.queries?.list ?? {}, params.searchTerm ?? '')
      const createMutation = useCreateCategoriaCPO(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateCategoriaCPO(params.options?.mutations?.update ?? {})

      return {
            categoriasCPO: categoriasCPOQuery.data || [],

            isLoading: categoriasCPOQuery.isLoading,
            isError: categoriasCPOQuery.isError,
            error: categoriasCPOQuery.error,

            createCategoriaCPO: createMutation.mutateAsync,
            updateCategoriaCPO: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: categoriasCPOQuery.refetch,
      }
}

export default {
      useCategoriasCPO,
      useCreateCategoriaCPO,
      useUpdateCategoriaCPO,
      useCategoriasCPOOperations,
      QUERY_KEYS,
}
