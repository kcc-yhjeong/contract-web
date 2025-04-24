/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Prettier와 충돌 방지
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // import 정렬
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        // 기타 타입스크립트 룰도 필요에 따라 조정 가능
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react/react-in-jsx-scope': 'off', // React 17+에서는 불필요
        'import/order': 'off', // simple-import-sort와 충돌 방지
    },
};
