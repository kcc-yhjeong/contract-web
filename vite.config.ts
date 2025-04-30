import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        host: true, // 모든 네트워크 인터페이스에서 접근 가능
        port: 5173, // 기본 포트
    },
});
