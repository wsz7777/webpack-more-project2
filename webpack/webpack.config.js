const ENV = process.env;
const isPro = ENV.NODE_ENV === "production";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const configGenerate = require("./webpack.base");
const { entryArr } = require("./config/getEntry");
const FirstConfigDev = require("./config/devServer");
const { cwd } = require("./config/tool");

const FirstConfigEvery = {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: cwd("public"),
        to: isPro ? cwd("dist") : cwd("dist", ENV.PUBLIC_PATH.replace("/", ""))
      }
    ])
  ]
};

const arr = entryArr
  .map(projectDesc => configGenerate(projectDesc))
  // 每项添加内容
  .map(itemConfig =>
    merge(itemConfig, {
      plugins: [],
      module: {
        rules: [
          {
            enforce: "pre",
            test: /\.(vue|(j|t)sx?)$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: "eslint-loader",
                options: {
                  extensions: [".js", ".jsx", ".vue"],
                  cache: true,
                  cacheIdentifier: "81895b14",
                  emitWarning: true,
                  emitError: true,
                  fix: true
                }
              }
            ]
          }
        ]
      }
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
