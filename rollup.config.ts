import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

// testing
import babel from 'rollup-plugin-babel';
// also imported @babel/core

const pkg = require('./package.json')

const libraryName = 'react-xstate-js'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'react', 'react-dom'
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // testing
    babel({
      // otherwise Babel will convert our modules to CommonJS before Rollup gets a chance to do its thing
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),

    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs).
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
