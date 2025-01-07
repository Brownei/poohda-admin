import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from "path"
import imageminMozjpeg from 'imagemin-mozjpeg'
import viteImagemin from 'vite-plugin-imagemin';
import imageminWebp from 'imagemin-webp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({}),
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 7,
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
