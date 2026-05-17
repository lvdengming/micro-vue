/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-16 18:18:25
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-17 11:04:33
 */
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    qiankun('micro-vue', {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/',
  server: {
    port: 8003,
    origin: 'http://localhost:8003',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
