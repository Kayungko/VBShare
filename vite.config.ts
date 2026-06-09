import { defineConfig } from 'vite'

const now = new Date()
const appVersion = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
  '-',
  String(now.getHours()).padStart(2, '0'),
  String(now.getMinutes()).padStart(2, '0'),
  String(now.getSeconds()).padStart(2, '0'),
].join('')

export default defineConfig({
  plugins: [],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  server: {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      Expires: '0',
      Pragma: 'no-cache',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      Expires: '0',
      Pragma: 'no-cache',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
