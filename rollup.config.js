import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import virtual from 'rollup-plugin-virtual';

const entry = `
  export { createRenderer, combineRules, enhance } from './node_modules/fela/es/index.js';
`;

export default [
  {
    input: 'entry.js',
    output: {
      file: './fela.js',
      format: 'es',
    },
    plugins: [
      virtual ({ 'entry.js': entry }),
      resolve(),
      commonjs(),
    ],
  },
];
