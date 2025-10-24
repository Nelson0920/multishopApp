import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AuxiliaresService from '@api/services/AuxiliaresService'
import AuxiliaresAdapter from '@business/adapters/AuxiliaresAdapter'
import AuxiliaresValidator from '@business/validators/AuxiliaresValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const auxiliaresService = new AuxiliaresService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['auxiliares', 'list', searchTerm],
}

/**
 * Hook para obtener todos los auxiliares
 * @param {Object} options - Opciones adicionales para la query
 * @returns {Object} Resultado de la query
 */
export const useAuxiliares = (options = {}, searchTerm = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(searchTerm),
            queryFn: async () => {
                  console.log('searchTerm', searchTerm);
                  const data = await auxiliaresService.getAll(searchTerm);
                  const adaptedData = data.map((data) => AuxiliaresAdapter.adaptServiceToFormData(data));
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
 * Hook para crear un nuevo auxiliar
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateAuxiliar = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (auxiliarData) => {
                  const sanitizedData = AuxiliaresValidator.sanitizeAuxiliarData(auxiliarData);
                  const adaptedData = AuxiliaresAdapter.adaptFormDataToService(sanitizedData);
                  return auxiliaresService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['auxiliares', 'list'] })
                  toast.success('Auxiliar creado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar un auxiliar
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateAuxiliar = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = AuxiliaresValidator.sanitizeAuxiliarData(data);
                  const adaptedData = AuxiliaresAdapter.adaptFormDataToService(sanitizedData);
                  return auxiliaresService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['auxiliares', 'list'] })
                  toast.success('Auxiliar actualizado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de auxiliares
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Todos los hooks de auxiliares
 */
export const useAuxiliaresOperations = (params = { options: {}, searchTerm: '' }) => {
      const auxiliaresQuery = useAuxiliares(params.options ?? {}, params.searchTerm ?? '')
      const createMutation = useCreateAuxiliar(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateAuxiliar(params.options?.mutations?.update ?? {})

      return {
            auxiliares: auxiliaresQuery.data || [],

            isLoading: auxiliaresQuery.isLoading,
            isError: auxiliaresQuery.isError,
            error: auxiliaresQuery.error,

            createAuxiliar: createMutation.mutateAsync,
            updateAuxiliar: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: auxiliaresQuery.refetch,
      }
}

export default {
      useAuxiliares,
      useCreateAuxiliar,
      useUpdateAuxiliar,
      useAuxiliaresOperations,
      QUERY_KEYS,
}