const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const configGenerate = require("./webpack.base");
const { entryArr } = require("./config/getEntry");
const { cwdPath } = require("./config/tool");

const arr = entryArr.map((projectDesc, index) =>
  index
    ? configGenerate(projectDesc)
    : merge(configGenerate(projectDesc), {
        plugins: [
          new CleanWebpackPlugin(),
          new CopyWebpackPlugin([
            { from: cwdPath("public"), to: cwdPath("dist") }
          ])
        ]
      })
);

console.log(`http://localhost:9000/webpack-dev-server`)
module.exports = arr;
