module.exports = {
  devServer: {
    proxy: 'http://localhost:8080',
    port: 8081
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_mixins.scss";
        `
      }
    }
  }
}