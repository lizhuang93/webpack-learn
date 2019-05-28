### 1.构建做的事
> 构建其实是工程化、自动化思想
1. 代码转化：ts -> js; scss -> css、、、
2. 文件优化：压缩代码，图片、、、
3. 代码分割、合并
4. 自动刷新
5. 代码校验
### 2. 初始化
```
$ npm init
$ git init
$ git remote add origin git@github.com:lizhuang93/webpack-learn.git
$ git push -u origin master
$ yarn add webpack -D
// webpack 4+ 版本，还需要安装 CLI。
$ yarn add webpack-cli -D

// package.json
"scripts": {
    "start": "webpack --config webpack.config.js"
  },
// .gitignore
```
### 3. 启动
```
// yarn start /demos/01/webpack.config.js
$ yarn start /demos/demo-index/webpack.config.js

或
// 在当前目录下，npx 执行
demos/01/$ npx webpack
```
### 4. 传递环境变量
a. 使用yargs
```
$ yarn add yargs -D
// 使用
$ webpack --mode production
// 获取
const argv = require('yargs').argv
const mode = argv.mode
```
b. 使用cross-env
```
$ yarn add cross-evn -D
// 使用
$ cross-env mode=production webpack
// 获取
console.log(process.env.mode)
```