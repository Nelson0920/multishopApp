import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CategoriasService from '@api/services/CategoriasService'
import CategoriasAdapter from '@business/adapters/CategoriasAdapter'
import CategoriasValidator from '@business/validators/CategoriasValidator'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

// Instancia del servicio
const categoriasService = new CategoriasService()

// Claves de query para cache
export const QUERY_KEYS = {
      lists: (searchTerm = '') => ['categorias', 'list', searchTerm],
}

/**
 * Hook para obtener todas las categorías
 * @param {Object} options - Opciones adicionales para la query
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Object} Resultado de la query
 */
export const useCategorias = (options = {}, searchTerm = '') => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(searchTerm),
            queryFn: async () => {
                  const data = await categoriasService.getAll(searchTerm);
                  const adaptedData = data.map((data) => CategoriasAdapter.adaptServiceToFormData(data));
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
 * Hook para crear una nueva categoría
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useCreateCategoria = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (categoriaData) => {
                  const sanitizedData = CategoriasValidator.sanitizeCategoriaData(categoriaData);
                  const adaptedData = CategoriasAdapter.adaptFormDataToService(sanitizedData);
                  //console.log('adaptedData', adaptedData);
                  return categoriasService.create(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['categorias', 'list'] })
                  toast.success('Categoría creada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook para actualizar una categoría
 * @param {Object} options - Opciones adicionales para la mutación
 * @returns {Object} Resultado de la mutación
 */
export const useUpdateCategoria = (options = {}) => {
      const queryClient = useQueryClient()

      return useMutation({
            mutationFn: (data) => {
                  const sanitizedData = CategoriasValidator.sanitizeCategoriaData(data);
                  const adaptedData = CategoriasAdapter.adaptFormDataToService(sanitizedData);
                  return categoriasService.update(adaptedData);
            },
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['categorias', 'list'] })
                  toast.success('Categoría actualizada correctamente');
            },
            onError: (error) => {
                  toast.error(error instanceof AxiosError ? error.response.data.message : error.message);
            },
            ...options,
      })
}

/**
 * Hook combinado para operaciones CRUD de categorías
 * @param {Object} params - Parámetros que incluyen options y searchTerm
 * @returns {Object} Todos los hooks de categorías
 */
export const useCategoriasOperations = (params = { options: {}, searchTerm: '' }) => {
      const categoriasQuery = useCategorias(params.options?.queries?.list ?? {}, params.searchTerm ?? '')
      const createMutation = useCreateCategoria(params.options?.mutations?.create ?? {})
      const updateMutation = useUpdateCategoria(params.options?.mutations?.update ?? {})

      return {
            categorias: categoriasQuery.data || [],

            isLoading: categoriasQuery.isLoading,
            isError: categoriasQuery.isError,
            error: categoriasQuery.error,

            createCategoria: createMutation.mutateAsync,
            updateCategoria: updateMutation.mutateAsync,

            isCreating: createMutation.isPending,
            isUpdating: updateMutation.isPending,
            createError: createMutation.error,
            updateError: updateMutation.error,

            refetch: categoriasQuery.refetch,
      }
}

export default {
      useCategorias,
      useCreateCategoria,
      useUpdateCategoria,
      useCategoriasOperations,
      QUERY_KEYS,
}
