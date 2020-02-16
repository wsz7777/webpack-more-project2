const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("lodash");
const { cwd, projectsPath, getProjectPagesPath } = require("./tool");
const { getCDN } = require("./getProjectConfig");

const otherConfig = {
  xhtml: true,
  minify: {
    removeAttributeQuotes: true,
    removeComments: true,
    collapseWhitespace: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  meta: {
    charset: { charset: "UTF-8" },
    // 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
    "X-UA-Compatible": { "http-equiv": "X-UA-Compatible", content: "ie=edge" },
    renderer: "webkit",
    viewport:
      "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, minimal-ui, viewport-fit=cover",
    "force-rendering": "webkit",
    "format-detection": "telephone=no,email=no,adress=no",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black",
    "screen-orientation": "portrait",
    "full-screen": "yes",
    browsermode: "application",
    "x5-orientation": "portrait",
    "x5-fullscreen": "true",
    "x5-page-mode": "app",
    "msapplication-tap-highlight": "no"
  } /* ,
  cdn: {
    css: ["main.css"],
    js: ["assets/head_bundle.js", "assets/main_bundle.js"],
  } */
};

/**
 * @method  生成HTMLWebpackPlugins插件配置列表
 * @param { String } projectName 项目名称
 * @param { Array } pages 页面名称列表
 * @returns { Array }
 */
const generateHTMLWebpackPlugins = (projectName, pages) =>
  pages.map(page => {
    const templatePagePath = getProjectPagesPath(projectName, `${page}.html`);
    const useTemplate = fs.existsSync(templatePagePath);
    const cdn = getCDN(projectName);

    const defaultConfig = {
      title: page,
      filename: `${projectName}/${page}.html`,
      chunks: [page],
      otherConfig,
      cdn
    };

    const tempConfig = useTemplate
      ? {
          template: `${templatePagePath}`
        }
      : {
          template: cwd("src", "template", "index.html")
        };

    const restConfig = merge(defaultConfig, otherConfig, tempConfig);
    return new HTMLWebpackPlugin(restConfig);
  });

module.exports = { generateHTMLWebpackPlugins };
