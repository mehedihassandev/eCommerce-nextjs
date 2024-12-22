module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Next.js related imports.
          ['^next', '^@next'],
          // Packages `react` related packages come next.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // lib imports
          ['^(@|lib)(/.*|$)'],
          // Database imports.
          ['^(@|database)(/.*|$)'],
          // Hooks imports.
          ['^(@|hooks)(/.*|$)'],
          // Utils imports.
          ['^(@|utils)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    // add new line below import
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'import/no-duplicates': 'error',
    'lines-around-directive': ['error', 'always'],
    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: false,
        beforeBlockComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    // add new line above return
    'newline-before-return': 'error',
    // add new line after each var, const, let declaration
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['multiline-const', 'multiline-let', 'multiline-var'],
      },
    ],
  },
};
