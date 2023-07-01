module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    // 自定义规则
    'no-console': 'error',
    'no-undef': 'off', // TypeScript 会做这方面的校验
    'no-unneeded-ternary': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'max-params': 'off',
    'prefer-const': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'single'],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'react/iframe-missing-sandbox': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/triple-slash-reference': 'off',
  },
};
// module.exports = {
//   parser: 'babel-eslint',
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'prettier',
//     'plugin:import/recommended',
//   ],
//   rules: {
//     // ...其他规则
//     'prettier/prettier': 'error',
//     quotes: ['error', 'single'],
//   },
// };
