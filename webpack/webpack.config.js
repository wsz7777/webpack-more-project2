const ENV = process.env;
const isPro = ENV.NODE_ENV === "production";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const configGenerate = require("./webpack.base");
const { entryArr } = require("./config/getEntry");
const { cwd } = require("./config/tool");

const FirstConfigEvery = {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: cwd("public"), to: cwd("dist") }])
  ]
};

const options = {
  ws: false,
  changeOrigin: true,
  target: ENV.URL_ORIGIN
};

const FirstConfigDev = {
  devServer: {
    publicPath: `${ENV.PUBLIC_PATH}/`,
    contentBase: cwd("public"),
    compress: true,
    port: 9435,
    hot: true,
    overlay: true,
    open: true,
    openPage: "webpack-dev-server",
    host: "dev.xxxx.com",
    proxy: {
      // 基础设施
      "/xxx/mobile/": {
        ...options,
        pathRewrite: {
          "^/xxx/mobile/": "/cms/xxx/mobile/" // rewrite path
        }
      },
      "/cms/": {
        ...options
        // pathRewrite: { "^/cms": "/" }
      },
      "/xxx": options,
      [ENV.PUBLIC_PATH]: {
        ...options,
        target: "http://localhost:9435",
        pathRewrite: { [`^${ENV.PUBLIC_PATH}`]: "/" }
      }
    }
  }
};

const arr = entryArr
  .map(projectDesc => configGenerate(projectDesc))
  // 每项添加内容
  .map(itemConfig =>
    merge(itemConfig, {
      plugins: []
    })
  );

arr.unshift(
  merge(
    {
      entry: cwd("webpack", "first", "index.js"),
      output: {
        path: cwd(ENV.BUILD_DIR),
        filename: `[name]-[hash:6].js`,
        publicPath: `${ENV.PUBLIC_PATH}/`
      }
    },
    FirstConfigEvery,
    isPro ? {} : FirstConfigDev
  )
);

module.exports = arr;
