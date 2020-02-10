const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { cwd } = require("./tool");

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
    loader: "sass-loader",
    options: {
      sourceMap: true,
      prependData: '@import "~@/styles/variables.scss";'
    }
  };

  const less_loader = {
    loader: "less-loader",
    options: {
      sourceMap: true
    }
  };

  const less_vars = {
    loader: "sass-resources-loader",
    options: {
      sourceMap: true,
      resources: cwd("src", "styles", "variables.less")
    }
  };

  const df_arr_loader = isModule => [
    style_loader,
    css_loader(isModule),
    postcss_loader
  ];

  // scss
  arr.push({
    test: /\.s[ac]ss$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [...df_arr_loader(true), scss_loader]
      },
      {
        use: [...df_arr_loader(), scss_loader]
      }
    ]
  });

  arr.push({
    test: /\.css$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [...df_arr_loader(true)]
      },
      {
        use: [...df_arr_loader()]
      }
    ]
  });

  arr.push({
    test: /\.less$/,
    oneOf: [
      {
        test: /\.module\.\w+$/,
        use: [...df_arr_loader(true), less_loader, less_vars]
      },
      {
        use: [...df_arr_loader(), less_loader, less_vars]
      }
    ]
  });

  return arr;
};

module.exports = getCssLoaderAbout;
