import { useQuery } from '@tanstack/react-query'
import AuxiliaresService from '@api/services/AuxiliaresService'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import AuxiliaresAdapter from '@business/adapters/AuxiliaresAdapter'

export const QUERY_KEYS = {
      lists: (letters, searchTerm) => ['auxiliares', 'letters', letters, searchTerm],
}

const auxiliaresService = new AuxiliaresService()

export const useAuxiliaresByLetters = ({ enabled, letters, searchTerm = '' }) => {
      return useQuery({
            enabled,
            queryKey: QUERY_KEYS.lists(letters, searchTerm),
            queryFn: async () => {
                  if (!letters || !enabled) return [];
                  const data = await auxiliaresService.getByLetters(letters, searchTerm);
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
      })
}