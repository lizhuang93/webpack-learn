## 配置
### 1. entry [看官网](https://www.webpackjs.com/configuration/entry-context/)
### 2. 用 webpack 构建一个可以被其他模块导入的js库。
1. 将demos/01 以 commonjs模式导出
```
// demos/01/webpack.config.js
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    library: 'umd',
    libraryTarget: 'commonjs2'
  }

// build 出bundle.js文件
$ demos/01: npx webpack
```
2. demos/02/main.js
```
require('../01/dist/bundle')

// 将main.js 以devServer启动，打包到内存。
$ demos/02: npx webpack-dev-server
```
就可以看到demo1的内容了。
