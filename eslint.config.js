import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs['eslint-recommended'].rules,
      ...typescriptEslint.configs['recommended'].rules,
      ...typescriptEslint.configs['recommended-requiring-type-checking'].rules,
    },
  },
];
