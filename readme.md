[TOC]

# webpack-more-project2

## 背景

2018年10月份，由于项目组原因改掉了以前的开发模式，把前端剥离出来交给我们专职的前端开发形成了前后端分离的模式。为了改善前端混沌的开发环境，于是有了第一版`webpack-more-project`的项目。但是这个项目并不完善，很多内容并没有支持，现在去一点一点修改他有点积重难返的感觉。于是乎，重新梳理对`webpack`的理解，重新选择组织方式，梳理`webpack.config`以期待有新的理解。

## 项目结构

```
.
├── .git
├── .vscode
├── dist							                      // 构建结果
├── public		                    // 静态资源
├── scripts                   // 项目脚本，如新建模板项目
├── src                       // 源码目录
│   ├── assets                // 公共的需要被优化的静态资源目录 如制作精灵图小图片文件
│   ├── components            // 公共的展示组件、固定逻辑组件
│   ├── utils                 // 公共的业务组件
│   ├── styles                // 公共的样式文件 主要是scss\less变量
│   └── projects              // 项目存放文件夹
│       ├── jqtest	            // jquery vue 混合项目demo
│       └── vuetest           // vue项目demo
├── webpack                   // webpack 配置目录
│   ├── config                // 生成webpack配置的各项相关方法
│   ├── webpack.base.js       // 单个项目的webpack配置
│   ├── webpack.build.js      // 最终打包的webpack配置
│   └── webpack.config.js     // webpack配置文件
├── .browserslistrc           // postcss 中 autoprefixer 插件相关配置
├── babel.config.js           // babel相关配置
├── jsconfig.json             // vscode编辑器相关的js编辑扩展描述文件
├── postcss.config.js         // postcss相关配置
├── readme.md                 // 这里主要是项目使用说明
├── package.json
├── LICENSE
├── .gitignore
└── yarn.lock
```

