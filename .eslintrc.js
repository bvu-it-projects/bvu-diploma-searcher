module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    eqeqeq: 0,
    'no-irregular-whitespace': 0,
    '@typescript-eslint/camelcase': 'off',
    'linebreak-style': 0,
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 180 }],
    'vue/no-use-v-if-with-v-for': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
