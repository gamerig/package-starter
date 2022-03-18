import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'MyLib', // this is the name of the global variable in browser
      file: 'dist/browser/my-lib.min.js',
      format: 'umd',
      sourcemap: !production,
      globals: {}, // map external libraries to their brower globals
    },
    external: [], // tell rollup to ignore bundling these libraries into the output
    plugins: [
      del({
        targets: ['./dist'],
        runOnce: !production,
      }),
      resolve(), // resolve imports and bundles them in the output file
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', declaration: true, declarationDir: 'dts' }),
      production &&
        terser({
          format: {
            comments: false,
          },
        }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: !production },
      { file: pkg.module, format: 'es', sourcemap: !production },
    ],
    external: [], // tell rollup to ignore bundling these libraries into the output
  },
  // bundle all type definitions into one file
  {
    input: 'dist/browser/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      del({
        targets: ['./dist/browser/dts'],
        hook: 'buildEnd',
      }),
    ],
  },
];
