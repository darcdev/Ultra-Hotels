const tsParser = require('@typescript-eslint/parser');
const ngParser = require('@angular-eslint/template-parser');
const js = require('@eslint/js');
const globals = require('globals');
const ts = require('@typescript-eslint/eslint-plugin');
const ng = require('@angular-eslint/eslint-plugin');
const ngTemplate = require('@angular-eslint/eslint-plugin-template');
const prettier = require('eslint-plugin-prettier');
const { plugins } = require('./tailwind.config');

module.exports = [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': ts,
      '@angular-eslint': ng,
      prettier: prettier,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs['recommended-requiring-type-checking'].rules,
      ...ts.configs['stylistic-type-checked'].rules,
      ...ng.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': 'error', // Prettier rule added
      'comma-dangle': ['off'],
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': ngTemplate,
      prettier: prettier,
    },
    languageOptions: {
      parser: ngParser,
    },
    rules: {
      ...ngTemplate.configs.recommended.rules,
      ...ngTemplate.configs.accessibility.rules,
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jasmine,
      },
      parserOptions: {
        project: ['./tsconfig.spec.json'],
      },
    },
  },
];
