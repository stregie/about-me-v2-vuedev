import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue()
  ],
  server: {
    port: 5173,
    proxy: {
      '/vueapi': {
        target: 'http://localhost:6565',
        rewrite: (path) => path.replace(/^\/vueapi/, '/vueapi')
      }
    }
  }
}
