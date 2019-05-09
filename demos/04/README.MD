## webpack 优化
### 1. 优化开发体验，提升开发效率
  1. 优化构建速度
  2. 优化使用体验
### 2. 优化输出质量 
  1. 减少首屏加载时间
  2. 提升流畅度（代码性能）。
<hr>

## 1.1 优化构建速度
### 1. 缩小文件搜素范围
- loader: 尽可能使用 test、include、exclude 三个配置来命中文件。
- resolve.modules: 第三方模块 ['node_modules'] 找不到时，会去 ['../node_modules'] 中找，再没有就去 ['../../node_modules'] , 以此类推。当明确第三方模块都在 ['node_modules'] 时， 使用绝对路径。
  ```
  resolve: {
    // 使用绝对路径指明第三方模块的位置，以减少搜索。
    modules: [path.resolve(__dirname, 'node_modules')]
  }
  ```
- resolve.extensions: ['js'] 尽可能减少后缀尝试的可能性。
- module.noParse: 忽略对没有必要进行转译的文件(jquery.min.js)。
### 2. 生成动态链接库 使用DllPlugin
> 为什么加快构建速度？ 只要不升级，只编译一次。
1. 先使用 DllPlugin(新建一个webpack_dll.config.js) 插件将第三方插件(react、react-dom等)生成js和json(react.dll.js、react.manifest.json)。
2. 然后使用 DllReferencePlugin(在webpack.config.js中) 插件使用json。
    ```
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: require('./dist/react.manifest.json')
      })
    ]
    ```
