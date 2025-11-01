import { useQuery } from '@tanstack/react-query'
import AuxiliaresService from '@api/services/AuxiliaresService'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import AuxiliaresAdapter from '@business/adapters/AuxiliaresAdapter'

export const QUERY_KEYS = {
      lists: (letters) => ['auxiliares', 'letters', letters],
}

const auxiliaresService = new AuxiliaresService()

export const useAuxiliaresByLetters = (letters) => {
      return useQuery({
            queryKey: QUERY_KEYS.lists(letters),
            queryFn: async () => {
                  if (!letters) return [];
                  const data = await auxiliaresService.getByLetters(letters);
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