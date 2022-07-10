import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')       // 指定路径
    }
  },
  server: {
    host: '0.0.0.0',
    open: true,   // 构建打开浏览器
    port: 7000,   // 默认3000，可以自定义
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      }
    }             // 跨域配置
  }
})
