import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // React와 React 관련 imports
                        ['^react$', '^react-dom', '^react/(.*)$'],
                        // 외부 패키지
                        ['^@?\\w'],
                        // 내부 절대 경로
                        ['^@/(.*)$'],
                        // 상대 경로
                        [
                            '^\\.\\./?$',
                            '^\\.\\./(?=.*/)(?!/?$)',
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                        ],
                        // 스타일
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    }
);
