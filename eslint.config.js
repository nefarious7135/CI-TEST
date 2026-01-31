const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'eslint.config.js',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'reports/**'
    ]
  },

  js.configs.recommended,

  // Base rules for all TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      globals: { ...globals.node }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ]
    }
  },

  // Overrides for test files only
  {
    files: ['tests/**/*.spec.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'no-console': 'off'
    }
  }
];
