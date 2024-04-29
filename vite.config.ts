import path from 'path'

import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer() as never, cssnanoPlugin() as never],
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
