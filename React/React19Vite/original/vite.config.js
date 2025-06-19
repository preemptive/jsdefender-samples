import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    target: 'es2024',  // Set the target to ES2024
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
});
