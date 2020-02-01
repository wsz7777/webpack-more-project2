// import { cloneDeep } from "lodash";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getCssLoaderAbout = isPro => {
  const arr = [];

  const modules = {
    localIdentName: isPro ? "[hash:base64:7]" : "[name]-[local]-[hash:base64:5]"
  };

  const style_loader = isPro
    ? MiniCssExtractPlugin.loader
    : {
        loader: "style-loader" // 将 JS 字符串生成为 style 节点
      };

  const css_loader = isModules => ({
    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
    options: {
      sourceMap: true,
      modules: isModules ? modules : false
    }
  });

  const postcss_loader = {
    loader: "postcss-loader",
    options: { sourceMap: true }
  };

  const scss_loader = {
    loader: "sass-loader", // 将 Sass 编译成 CSS
    options: {
      sourceMap: true,
      prependData: '@import "~@/styles/variables.scss";'
    }
  };

  const less_loader = {
    loader: "sass-loader", // 将 Sass 编译成 CSS
    options: {
      sourceMap: true,
      prependData: '@import "~@/styles/variables.scss";'
    }
  };

  // scss
  arr.push({
    test: /\.s[ac]ss$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [style_loader, css_loader(true), postcss_loader, scss_loader]
      },
      {
        use: [style_loader, css_loader(), postcss_loader, scss_loader]
      }
    ]
  });

  arr.push({
    test: /\.css$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [style_loader, css_loader(true), postcss_loader]
      },
      {
        use: [style_loader, css_loader(), postcss_loader]
      }
    ]
  });

  arr.push({
    test: /\.less$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [style_loader, css_loader(true), postcss_loader, less_loader]
      },
      {
        use: [style_loader, css_loader(), postcss_loader, less_loader]
      }
    ]
  });

  return arr;
};

module.exports = getCssLoaderAbout;
