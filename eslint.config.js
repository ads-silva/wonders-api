import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.node },
    files: ['src/**/*.mjs'],
    ignores: ['**/*.config.js', '.config/*', 'node_modules'],
    rules: {
      'no-unused-vars': ['warn'],
    },
  },
];
