const path = require('path')
const webpack = require('webpack')
// MiniCssExtractPlugin 抽离css文件，只有生产环境有效
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin =require("clean-webpack-plugin")
const isDev = process.env.MODE !== 'production'
const MODE = process.env.MODE || 'development'

module.exports = {
  mode: MODE,
  devtool: isDev ? 'eval-source-map' : false,
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    // noParse: /main/,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // 也可使用.babelrc配置文件
          // options: {
          //   presets: ['env'],
          //   plugins: ['transform-runtime']
          // }
        }
      },
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
      '@': path.resolve(__dirname, './')
    }
  },
  plugins: [
    // 需要增量部署的场景不要使用此配置。
    new CleanWebpackPlugin(),
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