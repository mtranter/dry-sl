/* eslint-disable */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'prettier',
    '@typescript-eslint',
    'functional',
    'jest',
    'security',
    'scanjs-rules',
    'prototype-pollution-security-rules',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:security/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  ignorePatterns: ['**/dist/**/*.ts', '**/dist/**/*.js'],
  env: { jest: true, browser: true, node: true },
  rules: {
    // eslint
    'no-undef': 'off', // buggy
    'prefer-promise-reject-errors': 'off',
    // prettier
    'prettier/prettier': ['error'],
    // TypeScript
    'max-classes-per-file': ['error', 3],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // Functional
    'functional/no-expression-statement': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-conditional-statement': 'off',
    'functional/prefer-readonly-type': 'off',
    // jest
    'jest/prefer-strict-equal': 'off',
    // import
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // ScanJS rules
    'scanjs-rules/accidental_assignment': 'error',
    'scanjs-rules/assign_to_hostname': 'error',
    'scanjs-rules/assign_to_href': 'error',
    'scanjs-rules/assign_to_location': 'error',
    'scanjs-rules/assign_to_onmessage': 'error',
    'scanjs-rules/assign_to_pathname': 'error',
    'scanjs-rules/assign_to_protocol': 'error',
    'scanjs-rules/assign_to_search': 'error',
    'scanjs-rules/assign_to_src': 'error',
    'scanjs-rules/call_Function': 'error',
    'scanjs-rules/call_addEventListener': 'error',
    'scanjs-rules/call_addEventListener_deviceproximity': 'error',
    'scanjs-rules/call_addEventListener_message': 'error',
    'scanjs-rules/call_connect': 'error',
    'scanjs-rules/call_eval': 'error',
    'scanjs-rules/call_execScript': 'error',
    'scanjs-rules/call_hide': 'error',
    'scanjs-rules/call_open_remote=true': 'error',
    'scanjs-rules/call_parseFromString': 'error',
    'scanjs-rules/call_setImmediate': 'error',
    'scanjs-rules/call_setInterval': 'error',
    'scanjs-rules/call_setTimeout': 'error',
    'scanjs-rules/identifier_indexedDB': 'error',
    'scanjs-rules/identifier_localStorage': 'error',
    'scanjs-rules/identifier_sessionStorage': 'error',
    'scanjs-rules/new_Function': 'error',
    'scanjs-rules/property_addIdleObserver': 'error',
    'scanjs-rules/property_createContextualFragment': 'error',
    'scanjs-rules/property_crypto': 'error',
    'scanjs-rules/property_geolocation': 'error',
    'scanjs-rules/property_getUserMedia': 'error',
    'scanjs-rules/property_indexedDB': 'error',
    'scanjs-rules/property_localStorage': 'error',
    'scanjs-rules/property_mgmt': 'error',
    'scanjs-rules/property_sessionStorage': 'error',
    // prototype-pollution-security-rules rules
    'prototype-pollution-security-rules/detect-merge': 'error',
    'prototype-pollution-security-rules/detect-merge-objects': 'error',
    'prototype-pollution-security-rules/detect-merge-options': 'error',
    'prototype-pollution-security-rules/detect-deep-extend': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
