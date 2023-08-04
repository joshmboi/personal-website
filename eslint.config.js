//Grabbed from create-react-app
'use strict';

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  plugins: [
    'react',
    '@typescript-eslint',
  ],

  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    project: './tsconfig.json',
  },

  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:import/typescript',
    'prettier',
  ],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  ignorePatterns: [
    'node_modules/',
    'src/assets/tfjs-model'
  ],

  rules: {
    'react/react-in-jsx-scope': 'off',
  }
}