const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { cwd, projectsPath, getProjectPagesPath } = require("./tool");

const { merge } = require("lodash");

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
 * @method 获取CDN配置
 * @param { String } projectName 项目名称
 * @return { 
        {
          name: String,
          library: String,
          js: String,
          css: String
        }[] 
    } 
 */
const getCDN_Config = projectName => {
  const configPath = projectsPath(projectName, "config.js");
  const df_config = require("./defaultEx").cdn;
  const pro_config = fs.existsSync(configPath) ? require(configPath).cdn : [];
  const other_config_arr = [
    ...df_config.filter(({ name, library }) => !(name && library)),
    ...pro_config.filter(({ name, library }) => !(name && library))
  ];
  const ex_config_obj = Object.values(
    [
      ...df_config.filter(({ name, library }) => name && library),
      ...pro_config.filter(({ name, library }) => name && library)
    ].reduce((rst, item) => (rst[item.name] = item) && rst, {})
  );

  const cdn = [...other_config_arr, ...ex_config_obj];
  return cdn;
};

const getCDN = projectName => {
  const cdn = getCDN_Config(projectName);
  console.log(cdn);
  // 抽离cdn配置
  const cdnConfig = { css: [], js: [] };
  cdnConfig.css = cdn.map(item => item.css).filter(e => e);
  cdnConfig.js = cdn.map(item => item.js).filter(e => e);
  return cdnConfig;
};

/**
 * @method  生成Externals对象
 * @param { String } projectName 项目名称
 * @return { Object } Externals
 */
const getExternals = projectName =>
  getCDN_Config(projectName)
    .filter(({ name, library }) => name && library)
    .reduce((rst, { name, library }) => (rst[name] = library) && rst, {});

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

module.exports = { getExternals, generateHTMLWebpackPlugins };
