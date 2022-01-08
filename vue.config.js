const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: path.resolve('src/views/main.js')
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  productionSourceMap: false, // 打包生产时不要把源码暴露出去
  devServer: {
    host: '0.0.0.0',
    port: 8082,
    hot: true,
    // proxy: {}
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  configureWebpack: config => {}
}