module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/indent': ['error', 4],
        indent: ['error', 4]
    }
}