import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'AI Chat Laboratory System',
        short_name: 'AI Lab',
        description: 'Laboratory Sample & Customer Management System',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/png/svg'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png/svg'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png/svg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})