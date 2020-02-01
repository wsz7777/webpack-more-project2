const plugins = [
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: name => `${name}/style/less`
    },
    "vant"
  ],
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
    }
  ],
  [
    "import",
    {
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: "css"
    }
  ],
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-proposal-nullish-coalescing-operator"
];

if (process.env.NODE_ENV === "production") {
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}

module.exports = {
  presets: ["@vue/babel-preset-app"], // 包含 "@babel/preset-env"
  plugins
};
