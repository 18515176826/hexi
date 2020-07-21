/* eslint-disable indent */
module.exports = {
  pluginOptions: {
    PROJ_TYPE: 'default', // 项目类型
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.5.4:8088',
        // target: 'http://192.168.40.159:8090/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
