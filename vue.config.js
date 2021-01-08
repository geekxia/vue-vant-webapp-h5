module.exports = {
  devServer: {
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        target: 'http://10.36.149.14:9999',
        changeOrigin: true
      }
    }
  }
}
