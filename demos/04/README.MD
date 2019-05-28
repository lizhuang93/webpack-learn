## webpack 优化
### 1. 优化开发体验，提升开发效率
  1. 优化构建速度
  2. 优化使用体验
### 2. 优化输出质量 
  1. 减少首屏加载时间
  2. 提升流畅度（代码性能）。
<br><br>

# 1. 优化开发体验，提升开发效率
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
### 3. 利用 CUP 多核， 使用 HappyPack 加快 loader 转换
> webpack 构建流程中最耗时的就是 Loader 转换，js 单线程只能对文件一个一个的处理，HappyPack 原理就是将这部分任务，分解到多个进程，减少构建时间。
```

$ yarn add happypack -D

const HappyPack = require('happypack')
// 共享进程池， 以防止资源占用过多
const happyThreadPool = HappyPack.ThreadPool({size: 5})
modules: {
  rules: [
    test: /\.js$/,
    use: ['happypack/loader?id=babel'],
    exclude: path.resolve(__dirname, 'node_modules')
  ],
  rules: [
    test: /\.css$/,
    use: ['happypack/loader?id=css'],
    exclude: path.resolve(__dirname, 'node_modules')
  ]
}
plugins: [
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool
  }),
  new HappyPack({
    id: 'css',
    loaders: ['css-loader'],
    threadPool: happyThreadPool
  })
]
```
### 4. 利用 CUP 多核， 使用 ParalleUglifyPlugin 加快 UglifyJS 的压缩。
> 线上代码压缩时， UglifyJS 去一个一个的压缩， ParalleUglifyPlugin 会开启多个子进程，每个子进程还是通过 UglifyJS 去压缩的。

## 1.2 优化使用体验
### 1. 使用 webpack 自带的 watch, 手动刷新页面。
```
$ webpack --watch 

或

module.export = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}
```
### 3. 使用 webapck-dev-server, 自动刷新页面。
### 4. 模块热替换

# 2. 优化输出质量 

## 2.1 减少首屏加载时间
### 1. 区分环境
注意： 请使用 ***process.env.NODE_ENV***， 社区约定的！！！
### 2. 压缩代码
- 压缩js：UglifyJSPlugin
- 压缩ES6: UglifyESPlugin
- 压缩css：cssnano, css-loader 已内置，使用： ```use:['css-loader?minimize'] ```。
### 3. CDN 动静分离
```
output: {
  publicPath: '//static.cdn.com/'
}
```
### 4. 使用 Tree Shaking 剔除用不上的死代码
### 5. 提取公共代码 CommonsChunkPlugin
### 6. 分割代码以按需加载
```
// 使用
const Home = () => import(/* webpackChunkName: 'support' */ './home');

// webpack.config.js
output: {
  chunkFilename: '[name].[chunkhash:8].js'
}
```
## 2.2 提升流畅度（代码性能）
- prepack: 编译时提前将计算结果放入编译后的代码中。【还不成熟，不建议用于生产环境】
- Scope Hoisting, 使用 ModuleConcatenationPlugin。【仅适用于由 ES6 模块】