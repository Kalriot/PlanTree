import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Desactivar reglas específicas
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Permitir el uso de 'any'
      'react/react-in-jsx-scope': 'off', // No es necesario importar React
    },
  },
];
