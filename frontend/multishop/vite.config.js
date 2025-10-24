import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      '@components': path.resolve(__dirname, './src/presentation/components'),
      '@pages': path.resolve(__dirname, './src/presentation/pages'),
      '@hooks': path.resolve(__dirname, './src/presentation/hooks'),
      '@presentation-styles': path.resolve(__dirname, './src/presentation/styles'),

      '@business': path.resolve(__dirname, './src/business'),
      '@validators': path.resolve(__dirname, './src/business/validators'),

      '@api': path.resolve(__dirname, './src/api'),
      '@services': path.resolve(__dirname, './src/api/services'),

      '@shared': path.resolve(__dirname, './src/shared'),
      '@shared-styles': path.resolve(__dirname, './src/shared/styles'),
      '@shared-hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@shared-components': path.resolve(__dirname, './src/shared/components'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@mocks': path.resolve(__dirname, './src/mocks'),

      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/shared/context'),
    }
  }
})
