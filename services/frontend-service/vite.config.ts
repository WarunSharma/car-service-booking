import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_USER_API_URL': JSON.stringify(env.VITE_USER_API_URL),
      'import.meta.env.VITE_APPOINTMENT_API_URL': JSON.stringify(env.VITE_APPOINTMENT_API_URL),
      'import.meta.env.VITE_PORT': JSON.stringify(env.VITE_PORT),
    },
    server: {
      port: parseInt(env.VITE_PORT),
    },
  }
})
