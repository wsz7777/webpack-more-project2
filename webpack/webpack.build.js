const merge = require("webpack-merge");

const configArr = require("./webpack.config");

const buildConfig = {
  // mode: "production"
};

module.exports = configArr.map(config => merge(config, buildConfig));
