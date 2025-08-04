import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import JSDefenderRollupPlugin from '@preemptive/jsdefender-rollup-plugin';

const jsdConfig = {
  configurationFile: "jsdefender.config.json",
  quietMode: false,
  enableInDevelopmentMode: false,
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    JSDefenderRollupPlugin.default(jsdConfig),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
}));
