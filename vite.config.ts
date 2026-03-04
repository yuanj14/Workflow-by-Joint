import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, __dirname)
  const { VITE_APP_ENV } = env
  const PRODUCTION_ENV = command === 'build'
  return {
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    // 插件配置
    plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })],
    
    // 开发配置
    server: {
      port: 5173,
      host: true,
      // 手动刷新进行文件更新配置
      // hmr: false,
      // watch: { usePolling: true },
      proxy: {},
    },

    // 生产配置
    build: {
      sourcemap: PRODUCTION_ENV ? false : 'inline',
      outDir: 'dist',
      assetsDir: 'assets',
    },
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // '~' 代表项目根目录
        '~': path.resolve(__dirname, './'),
        // '@' 代表 src 目录
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
