const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  // productionSourceMap: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  devServer: {
    disableHostCheck: true,
    // proxy: 'http://cloud-music.pl-fe.cn/',
    proxy: {
      '/api': {
        target: 'http://cloud-music.pl-fe.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};
