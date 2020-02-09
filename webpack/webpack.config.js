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

const FirstConfigDev = {
  devServer: {
    contentBase: cwd("public"),
    compress: true,
    port: 9435,
    hot: true
  }
};

const arr = entryArr
  // 处理第一项
  .map((projectDesc, index) =>
    index
      ? configGenerate(projectDesc)
      : merge(
          configGenerate(projectDesc),
          FirstConfigEvery,
          isPro ? {} : FirstConfigDev
        )
  )
  // 每项添加内容
  .map(itemConfig =>
    merge(itemConfig, {
      plugins: []
    })
  );

console.log(`http://localhost:9435/webpack-dev-server`);

module.exports = arr;
