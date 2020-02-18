const path = require("path");
const fs = require("fs");
const { /* cwd, */ projectsPath, getProjectPagesPath } = require("./tool");
const all = require("./getHTMLTemplates");

/**
 * @method 获取项目列表
 * @return { Array<String> }
 */
const getProjects = () => fs.readdirSync(projectsPath());

/**
 * @method  获取项目中的入口文件
 * @param { String } basePath 项目路的基础路径
 * @return { Array<String> }
 */
const getPages = basePath =>
  fs
    .readdirSync(basePath)
    .filter(fileName => /\.[jt]s$/.test(fileName))
    .map(pageName => pageName.replace(/\.\S*/, ""));

/**
 * @method  生成webpack的entry部分
 * @param { String } projectName 项目名称
 * @param { Array } pages 页面名称列表
 * @returns { Object }
 */
const generateEntry = (projectName, pages) => {
  const entry = {};
  pages.forEach(
    pageName => (entry[pageName] = projectsPath(projectName, "pages", `${pageName}.js`))
  );
  return entry;
};

const recursiveIssuer = Module => {
  if (Module.issuer) {
    return recursiveIssuer(Module.issuer);
  }
  if (Module.name) {
    return Module.name;
  }
  return false;
};

const generateStyleGroup = pages => {
  const groups = {};
  pages.forEach(page => {
    groups[`${page}Styles`] = {
      name: page,
      test: (m, c, entry = page) =>
        m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
      chunks: "all",
      enforce: true
    };
  });
  return groups;
};

/**
 * @const 获取的项目列表+入口文件
 */
const entryArr = getProjects().map(dir => ({
  projectName: dir,
  pages: getPages(getProjectPagesPath(dir))
}));

module.exports = {
  entryArr,
  generateEntry,
  generateStyleGroup,
  ...all
};
console.table(entryArr);
