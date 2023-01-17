import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://javascriptfield.github.io',
  base: '/docs',
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
        },
      },
    },
  },
});
