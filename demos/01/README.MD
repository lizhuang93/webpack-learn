## 简单使用webpack(入门)
### 1. yarn start 
```
$ yarn start ./demos/01/webpack.config.js
```
### 2. require('./main.css'), 使用Loader转换
> 要支持非js文件，要使用loader;
> 这里require('./main.css')，直接将css写入响应的js中了;
> 【扩展】提取css: extract-text-webpack-plugin
```
$ yarn add style-loader css-loader -D

// webpack.config.js
module: {
  rules: [
    {
      // 匹配以.css结尾的文件。
      test: /\.css$/,
      // 执行顺序由后到前.
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // 开启css压缩
            minimize: true
          }
        }
      ]
    }
  ]
}
```
### 3. plugin 是扩展 webpack 功能的
> 使用 ExtractTextPlugin 将注入到bundle.js文件里的css提取到单独的文件中。（webpack4 建议使用 MiniCssExtractPlugin）
```
// 只能在开发环境没有style-loader的情况使用。
$ yarn add mini-css-extract-plugin -D

// webpack.config.js
 module: {
    rules: [
      {
        // 匹配以.css结尾的文件。
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css"
    })
  ]
```
### 4. 使用DevServer
区别： 
操作|说明
---|---
build | 每次更改代码都需要重新打包.
--watch | 监听代码改变，自动重新打包，但需要手动刷新。
webpack-dev-server | 浏览器自动刷新。
webpack-dev-server --hot | 浏览器自动局部刷新
```
$ yarn add webpack-dev-server -D

// webpack.config.js
module.exports = {
  devServer: {
    open: true,
    port: 8000,
    hot: true,
    proxy: {//配置跨域，访问的域名会被代理到本地的3000端口
      '/api': 'http://localhost:3000'
    }
  },
}

```
然后切换到./demos/01目录，执行 $ npx webpack-dev-server,(注意，index.html 中 要使用内存里的bundle.js, <script src="bundle.js"></script>)
