import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import JSDefenderRollupPlugin from '@preemptive/jsdefender-rollup-plugin';

const jsdConfig = {
  configurationFile: "jsdefender.config.json",
  quietMode: false,
  enableInDevelopmentMode: true,
};


export default defineConfig({
  plugins: [
    react(),
    JSDefenderRollupPlugin.default(jsdConfig), // Place JSDefender in the main plugins array
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
