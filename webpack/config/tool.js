const path = require("path");

const CWD = process.cwd();
const cwdPath = (...arr) => path.join(CWD, ...arr);

module.exports = {
  cwdPath
};
