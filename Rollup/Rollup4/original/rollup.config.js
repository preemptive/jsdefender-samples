import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: [ 'src/index.js' ],
  output: {
    dir: 'dist',
    format: 'es',
  },
  preserveEntrySignatures: false,
  plugins: [
    html(),
    image(),
    json(),
    postcss(),
    serve('dist')
  ]
};
