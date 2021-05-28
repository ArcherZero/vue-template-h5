// postcss.config.js
module.exports = ({ file }) => {
  let remUnit
// 判断条件 请自行调整 我使用的是 mand-mobile ui  没有对vant引入进行测试
  if (file && file.dirname && file.dirname.indexOf('vant')>-1) {
      remUnit = 375
  } else {
      remUnit = 750
  }
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: remUnit,
      }
    }
  }
}



