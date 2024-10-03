import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import fs from 'fs';

export default defineConfig({
  root: resolve(__dirname, 'src'), // Set the root to the source folder
  build: {
    outDir: resolve(__dirname, '../dist'), // Output directory for production build
    sourcemap: true,
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash][extname]'
      }
    }
  },
  server: {
    port: 3000, // Port for the Vite development server
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, 'src') },
      { find: "events", replacement: resolve('node_modules/events/') }
    ]
  },
  define: {
    localeList: fs.readdirSync('src/lang')
  },
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: false,
      include: path.resolve(__dirname, 'src/lang/**'),
      onError: (error) => {
        console.error('I18n Error:', error);
      }
    }),
    eslint()
  ]
});