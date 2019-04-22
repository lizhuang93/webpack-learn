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
```
