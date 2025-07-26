const { defineConfig } = require('eslint/config')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const vuePlugin = require('eslint-plugin-vue')
const vueParser = require('vue-eslint-parser')
const prettierPlugin = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

module.exports = defineConfig([
  {
    // Global ignores
    ignores: ['dist', 'node_modules'],
  },
  {
    // TypeScript + Vue support
    files: ['src/**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-components': 'warn',

      // Prettier integration
      'prettier/prettier': 'warn',
    },
  },
  {
    // JavaScript files
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
    },
  },
  prettierConfig, // Disable conflicting ESLint rules
])
