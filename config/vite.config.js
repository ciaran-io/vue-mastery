import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import nesting from 'tailwindcss/nesting';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: './config/auto-imports.d.ts',
      // options
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './config/.eslintrc-auto-import.json',
      },
      dirs: ['./src/stores', './src/helpers'],
    }),
    Components({
      dirs: ['./src/components', './src/pages'],
      /* options */
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, '../src') },
  },

  css: {
    postcss: {
      plugins: [
        nesting,
        require('tailwindcss')({
          config: 'config/tailwind.config.js',
        }),
        autoprefixer,
      ],
    },
  },
});
