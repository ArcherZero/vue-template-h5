const StyleLintPlugin = require('stylelint-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// const BASE_URL = 'https://api.local.hzmantu.com'

module.exports = {
  publicPath: './', // 静态资源引用路径
  outputDir: 'dist', // 打包文件放置位置
  assetsDir: 'static', // 静态资源文件夹
  indexPath: 'index.html', // 入口文件位置，相对于outputDir
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  productionSourceMap: false, // 生产环境不关闭source map
  // devServer: {
  //   host: '0.0.0.0'
  // },
  chainWebpack: config => {
    config.plugin('stylelint')
      .use(StyleLintPlugin, [{
        configFile: '.stylelintrc.js',
        files: ['**/*.scss', '**/*.vue'],
        fix: true,
        formatter: 'verbose'
      }])
      .end()
      // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .end()
  }
}
