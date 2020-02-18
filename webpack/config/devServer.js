const ENV = process.env;
const { cwd } = require("./tool");

const options = {
  ws: false,
  changeOrigin: true,
  target: ENV.URL_ORIGIN
};

module.exports = {
  devServer: {
    publicPath: `${ENV.PUBLIC_PATH}/`,
    contentBase: cwd("dist"),
    compress: true,
    port: 9435,
    hot: true,
    overlay: true,
    open: true,
    // bonjour: true,
    openPage: "webpack-dev-server",
    writeToDisk: filePath => /\/image\//.test(filePath),
    proxy: {
      // 基础设施
      "/mobile/": {
        ...options,
        pathRewrite: {
          "^/mobile/": "/cms/xxx/mobile/" // rewrite path
        }
      },
      "/cms/": {
        ...options
        // pathRewrite: { "^/cms": "/" }
      },
      "/xxx": options
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/development\/vant_demo/, to: "/development/vant_demo/main.html" }]
    }
  }
};
