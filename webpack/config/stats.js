/**
 * @method 生成stats信息
 * @param { Boolean } isPro 是否为生产环境
 * @returns { Object } stats配置对象
 */
const statsFunc = isPro => {
  return {
    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    // 你可以使用 `!field` 来反转排序。
    assetsSort: "field",

    // 添加构建日期和构建时间信息
    builtAt: true,

    // 添加缓存（但未构建）模块的信息
    cached: true,

    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,

    // 添加 children 信息
    children: true,

    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,

    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: false,

    // 按指定的字段，对 chunk 进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    chunksSort: "field",

    // 用于缩短 request 的上下文目录
    // context: "../src/",

    // `webpack --colors` 等同于
    colors: true,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    // 通过对应的 bundle 显示入口起点
    entrypoints: false,

    // 添加 --env information
    env: false,

    // 添加错误信息
    errors: true,

    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,

    // 添加 compilation 的哈希值
    hash: true,

    // 添加构建模块信息
    modules: false,

    // 按指定的字段，对模块进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    modulesSort: "field",

    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,

    // 显示模块的导出
    providedExports: false,

    // 添加 public path 的信息
    publicPath: true,

    // 添加模块被引入的原因
    reasons: false,

    // 添加模块的源码
    source: false,

    // 添加时间信息
    timings: true,

    // 显示哪个模块导出被用到
    usedExports: false,

    // 添加 webpack 版本信息
    version: true,

    // 添加警告
    warnings: true
  };
};

module.exports = statsFunc;
