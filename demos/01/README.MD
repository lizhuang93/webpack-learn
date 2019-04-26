### 1. yarn start 
```
$ yarn start /demos/01/webpack.config.js
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
$ yarn add mini-css-extract-plugin -

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
