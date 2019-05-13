const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const isDev = process.env.NODE_ENV !== 'production'
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: NODE_ENV,
  devtool: isDev ? 'eval-source-map' : false,
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'myBundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    // noParse: /main/,
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css"
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html')})
  ],
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
  }
}