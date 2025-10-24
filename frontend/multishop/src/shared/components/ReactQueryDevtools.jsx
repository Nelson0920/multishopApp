import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * Componente wrapper para ReactQueryDevtools
 * Solo se renderiza en desarrollo
 */
const Devtools = () => {
      // Solo renderizar en desarrollo
      if (import.meta.env.PROD) {
            return null
      }

      return <ReactQueryDevtools initialIsOpen={false} />
}

export default Devtools
