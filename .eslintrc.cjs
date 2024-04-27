module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-unresolved': ['off'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '[@]common/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
