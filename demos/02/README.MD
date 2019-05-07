## 配置
### 1. entry [看官网](https://www.webpackjs.com/configuration/entry-context/)
### 2. 用 webpack 构建一个可以被其他模块导入的js库。
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

### 3. 设置别名
```
resolve: {
    alias: {
      '@': path.resolve(__dirname, '../')
    }
  }

// 使用
var demo01 = require('@/01/dist/bundle')
```
### 4. 