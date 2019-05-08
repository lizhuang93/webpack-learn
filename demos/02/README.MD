## 配置
### 1. entry [看官网](https://www.webpackjs.com/configuration/entry-context/)

### 2. output 
> 用 webpack 构建一个可以被其他模块导入的js库。
1. 将demos/01 以 commonjs模式导出
```
// demos/01/webpack.config.js
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2',
    libraryExport: '$'
  }

// demos/01/main.js
import show from './show'
require('./main.css')
function abc() {
  console.log('abc');
}
export const $ = {
  show,
  abc
}

// build 出bundle.js文件
$ demos/01: npx webpack
```
2. demos/02/main.js
```
var demo01 = require('../01/dist/bundle')
demo01.show('webpack')

// 将main.js 以devServer启动，打包到内存。
$ demos/02: npx webpack-dev-server
```
就可以看到demo1的内容了。

### 3. module
1. noParse 忽略大型的 library 可以提高构建性能
```
module: {
  noParse: /jquery|lodash/
}
```

### 4. resolve
1. 设置别名
```
resolve: {
    alias: {
      '@': path.resolve(__dirname, '../')
    }
  }

// 使用
var demo01 = require('@/01/dist/bundle')
```

### 5. DevServer
$ yarn add webpack-dev-server -D
```
  devServer: {
    // https: true,
    open: true,
    host: '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
    hot: true,
    proxy: {//配置跨域，访问的域名会被代理到本地的3000端口
      '/api': 'http://localhost:3000'
    }
  },
```
### 6. 其他配置
```
// eval-source-map: 生成用于开发环境的最佳品质的 source map
devtool: isDev ? 'eval-source-map' : false

// 防止将某些 import 的包(package)打包到 bundle 中
externals: /^(jquery|\$)$/i
```