const path = require('path')
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
        // 执行顺序由后到前
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启css压缩 (这里打包报错？？？待查、、、注掉)
              // minimize: true
            }
          }
        ]
      }
    ]
  }
}