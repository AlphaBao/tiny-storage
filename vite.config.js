import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    outDir: 'dist',
    lib: {
      name: 'tiny-storage',
      entry: './src/index.js',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => format === 'es' ? 'index.esm.js' : `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
    reportCompressedSize: true,
  },
});
