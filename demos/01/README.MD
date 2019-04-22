### 1. yarn start 
```
yarn start /demos/01/webpack.config.js
```
### 2. require('./main.css'), 使用Loader转换
> 要支持非js文件，要使用loader;
> 这里require('./main.css')，直接将css写入响应的js中了;
> 【扩展】提取css: extract-text-webpack-plugin

$ yarn add style-loader css-loader -D
```
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