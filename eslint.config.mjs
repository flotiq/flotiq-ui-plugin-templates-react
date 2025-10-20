import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'build'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    plugins: {
      react: reactPlugin,
      '@stylistic': stylistic,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          ignorePattern: '^import.+from.+;$',
        },
      ],
      'no-use-before-define': [
        'error',
        {
          variables: false,
        },
      ],
      'react/prop-types': 0,
    },
  },
];
