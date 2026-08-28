import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Raíz del repositorio y carpeta de pruebas de la Fase 3 (fuera de este subproyecto).
const repoRoot = path.resolve(import.meta.dirname, '../..').replace(/\\/g, '/')
const pruebasFase3 = `${repoRoot}/Fase 3 - Pruebas Despliegue y Mantenimiento/pruebas`

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ruta base para GitHub Pages (project site): https://opt-kor.github.io/Belman-sCalculator/
  base: process.env.GITHUB_PAGES === 'true' ? '/Belman-sCalculator/' : '/',
  // Permite que Vitest cargue los archivos de prueba de la Fase 3, que viven
  // fuera de la raíz de este subproyecto.
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: [
      'src/**/*.{test,spec}.{js,jsx}',
      `${pruebasFase3}/**/*.{test,spec}.{js,jsx}`,
    ],
    coverage: {
      provider: 'v8',
      include: ['src/logic/**', 'src/components/**'],
    },
  },
})
