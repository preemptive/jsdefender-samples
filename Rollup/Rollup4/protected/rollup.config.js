import html from "@rollup/plugin-html";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import serve from "rollup-plugin-serve";
import JSDefenderRollupPlugin from "@preemptive/jsdefender-rollup-plugin";
import postcss from 'rollup-plugin-postcss';

const jsdConfig = {
  configurationFile: "jsdefender.config.json",
  quietMode: false,
};

export default {
  input: ["src/index.js"],
  output: {
    dir: "dist",
    format: "es",
  },
  preserveEntrySignatures: false,
  plugins: [
    html(),
    image(),
    json(),
    JSDefenderRollupPlugin.default(jsdConfig),
    postcss(),
    serve("dist"),
  ],
};
