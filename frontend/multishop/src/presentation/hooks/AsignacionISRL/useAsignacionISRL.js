import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AsignacionISRLService from '@api/services/AsignacionISRLService'
import AsignacionISRLAdapter from '@business/adapters/AsignacionISRLAdapter'
import AsignacionISRLValidator from '@business/validators/AsignacionISRLValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const asignacionISRLService = new AsignacionISRLService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: () => ['asignacionISRL', 'list'],
}

/**
 * Hook para obtener todos los conceptos de retención ISRL
 * @param {Object} options - Opciones adicionales para la query
 * @returns {Object} Resultado de la query
 */
export const useAsignacionISRL = (options = {}) => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(),
            queryFn: async () => {
                  const data = await asignacionISRLService.getAll();
                  const adaptedData = data.map((data) => AsignacionISRLAdapter.adaptServiceToFormData(data));
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
 * Hook para crear un nuevo concepto de retención ISRL
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateAsignacionISRL = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (conceptData) => {
                  const sanitizedData = AsignacionISRLValidator.sanitizeConceptData(conceptData);
                  const adaptedData = AsignacionISRLAdapter.adaptFormDataToService(sanitizedData);
                  return asignacionISRLService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() })
                  toast.success('Concepto de retención ISRL creado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar un concepto de retención ISRL
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateAsignacionISRL = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = AsignacionISRLValidator.sanitizeConceptData(data);
                  const adaptedData = AsignacionISRLAdapter.adaptFormDataToService(sanitizedData);
                  return asignacionISRLService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() })
                  toast.success('Concepto de retención ISRL actualizado correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de conceptos de retención ISRL
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Todos los hooks de conceptos ISRL
 */
export const useAsignacionISRLOperations = (options = {}) => {
      const asignacionISRLQuery = useAsignacionISRL(options.queries?.list)
      const createMutation = useCreateAsignacionISRL(options.mutations?.create)
      const updateMutation = useUpdateAsignacionISRL(options.mutations?.update)

      return {
            asignacionISRL: asignacionISRLQuery.data || [],

            isLoading: asignacionISRLQuery.isLoading,
            isError: asignacionISRLQuery.isError,
            error: asignacionISRLQuery.error,

            createAsignacionISRL: createMutation.mutateAsync,
            updateAsignacionISRL: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: asignacionISRLQuery.refetch,
      }
}

export default {
      useAsignacionISRL,
      useCreateAsignacionISRL,
      useUpdateAsignacionISRL,
      useAsignacionISRLOperations,
      QUERY_KEYS,
}
