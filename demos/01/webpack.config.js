const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const isDev = process.env.NODE_ENV !== 'production'
module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 匹配以.css结尾的文件。
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
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
  ],
  devServer: {
    open: true,
    port: 8000,
    hot: true,
    proxy: {//配置跨域，访问的域名会被代理到本地的3000端口
      '/api': 'http://localhost:3000'
    }
  },
}