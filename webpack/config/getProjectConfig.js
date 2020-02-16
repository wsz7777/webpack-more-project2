const fs = require("fs");
const { cwd, projectsPath, getProjectPagesPath } = require("./tool");
const { merge, mergeWith, isArray } = require("lodash");

const getProjectConfig = projectName => {
  const configPath = projectsPath(projectName, "config.js");
  const defaultConfig = require("./defaultEx");
  const projectConfig = fs.existsSync(configPath) ? require(configPath) : {};

  const df_config = [defaultConfig, projectConfig].reduce(
    (rst, item) =>
      mergeWith(rst, item, (objValue, srcValue) => {
        if (isArray(objValue)) return objValue.concat(srcValue);
      }),
    {}
  );
  df_config.projectName = projectName;
  // console.log(df_config);
  return df_config;
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
  const config = getProjectConfig(projectName).cdn;

  const other_config_arr = config.filter(
    ({ name, library }) => !(name && library)
  );

  const ex_config_obj = Object.values(
    config
      .filter(({ name, library }) => name && library)
      .reduce((rst, item) => (rst[item.name] = item) && rst, {})
  );

  return [...other_config_arr, ...ex_config_obj];
};

const getCDN = projectName => {
  const cdn = getCDN_Config(projectName);
  // console.log(cdn);
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

module.exports = { getProjectConfig, getCDN_Config, getCDN, getExternals };
