import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import embedCSS from 'rollup-plugin-embed-css';

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
    embedCSS(),
    serve('dist')
  ]
};
