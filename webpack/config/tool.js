const path = require("path");

const CWD = process.cwd();

const cwd = (...arr) => path.join(CWD, ...arr);
const projectsPath = (...arr) => cwd("src", "projects", ...arr);
const getProjectPagesPath = (dir, ...filePath) => projectsPath(dir, "pages", ...filePath);

module.exports = {
  cwd,
  projectsPath,
  getProjectPagesPath
};
