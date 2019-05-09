## 实战
### 1. 使用babel-loader
```
// 注意 babel-loader@7 与 babel-core@6 配套使用；babel-loader@8 与 babel-core@7 配套使用。
$ yarn add babel-loader babel-core babel-preset-env -D
$ yarn add babel-plugin-transform-runtime babel-runtime -D

// 使用 babel-loader 的配置文件 .babelrc(babel 执行时自动读取根目录下的.babelrc)，
{
  "plugins": [
    [
      // 禁用了 babel 自动对每个文件的 runtime 注入, 而是使用第三方依赖 babel-runtime
      // yarn add babel-plugin-transform-runtime babel-runtime -D
      "transform-runtime",
      {
        "polyfill": false
      }
    ]
  ],
  // presets 告诉 babel 使用了哪些新语法特性。
  "presets": [
    // env 包含了 ES2015、ES2016、ES2017
    "env"
  ]
}
```
### 2. 由于各 loader、plugin 思路类似，这里暂且不做深入