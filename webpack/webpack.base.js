// const path = require("path");
const ENV = process.env;
const isPro = ENV.NODE_ENV === "production";

const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const {
  generateEntry,
  generateStyleGroup,
  generateHTMLWebpackPlugins
} = require("./config/getEntry");
const cssLoaders = require("./config/css");

const { cwd } = require("./config/tool");
const { getExternals, getProjectConfig } = require("./config/getProjectConfig");
/**
 * @method 生成初始化配置的方法
 * @param { Object } param0 项目的各项设置
 */
const baseConfigGenerate = ({ projectName, pages }) => {
  const projectConfig = getProjectConfig(projectName);
  return {
    mode: ENV.NODE_ENV,
    entry: generateEntry(projectName, pages),
    output: {
      path: cwd(ENV.BUILD_DIR),
      filename: `${projectName}/js/[name]-[hash:6].js`,
      publicPath: `${ENV.PUBLIC_PATH}/`,
      chunkFilename: `${projectName}/chunk/[name].[hash:6].js`
    },
    externals: getExternals(projectName),
    stats: isPro ? "normal" : "errors-only",
    resolve: {
      alias: {
        "@": cwd("src"),
        "@p": cwd("src", "projects"),
        vue$: "vue/dist/vue.runtime.esm.js"
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: ["node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.[jt]s(x?)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        ...cssLoaders(isPro, projectConfig),
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: `${projectName}/img/[name].[hash:8].[ext]`
                }
              }
            }
          }
        },
        {
          test: /\.(svg)(\?.*)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: `${projectName}/img/[name].[hash:8].[ext]`
              }
            }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                fallback: {
                  loader: "file-loader",
                  options: {
                    name: `${projectName}/media/[name].[hash:8].[ext]`
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                fallback: {
                  loader: "file-loader",
                  options: {
                    name: `${projectName}/fonts/[name].[hash:8].[ext]`
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(ejs|html)$/,
          use: [{ loader: "compile-ejs-loader" }]
        }
      ]
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          ...generateStyleGroup(pages)
        }
      }
    },
    plugins: [
      new Dotenv({ path: `./env/${ENV.BUILD_ENV_MODE}.env` }),
      new MiniCssExtractPlugin({
        filename: `${projectName}/style/[name]_[hash].css`,
        chunkFilename: `${projectName}/style/chunk/[name]_[hash].css`
      }),
      ...generateHTMLWebpackPlugins(projectName, pages)
    ]
  };
};

module.exports = baseConfigGenerate;
