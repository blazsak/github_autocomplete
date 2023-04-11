module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'prettier'
    ],
    rules: {
        // 'react/react-in-jsx-scope': 'off',
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    }
}
