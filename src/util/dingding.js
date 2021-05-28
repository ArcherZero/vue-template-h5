/**
 * 钉钉免登
 * 需要需求方提供：
 *  - 前端使用：cropId
 *  - 后端使用：AgentId、AppKey、AppSecret
 *
 * 若无特殊需求，调用bindAndLogin即可绑定且登录
 */
import * as dd from 'dingtalk-jsapi'
import { Toast } from 'vant'
import store from '../store'

// 判断是否在钉钉环境
export function isDD () {
  return dd.env.platform !== 'notInDingTalk'
}

export function ready (cb) {
  dd.ready(function () {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    getCode(cb)
  })
}

// 获取钉钉临时授权code code只能使用一次
export function getCode (cb) {
  dd.runtime.permission.requestAuthCode({
    corpId: 'ding6e9e9a98964e247c35c2f4657eb6378f',
    onSuccess: function (result) {
      cb(result.code)
    },
    onFail: function (err) {
      console.error(err)
    }
  })
}

// 绑定
async function bind (code, token, cb) {
  const res = await CommonAction.dingTalkToUser({ code })
  if (!res) return cb(false)
  this.$toast('绑定成功！')
  getCode(this.getToken, cb)
  location.href = location.href.split('?')[0]
}

// 使用code登录
async function getToken (code, cb) {
  try {
    const res = await CommonAction.token({ code })
    if (res) {
      store.commit('SET_USER_INFO', res)
      cb(true)
    }
  } catch (e) {
    if (e.response?.data?.message === '未找到对应账号与之绑定') {
      cb(false)
    }
  }
}

/**
 * @desc 绑定或登录
 * 若有对应PC端页面，需先绑定PC端账号，绑定二维码中需携带登录账号的token
 * 若无对应PC端页面，直接登录，第一次登录后端需自动创建一个账号
 * @param { function } cb 回调函数，参数为boolean，true成功，false失败
 */
export function bindAndLogin (cb) {
  const isdd = isDD()
  if (!isdd) {
    Toast.fail('请再钉钉中打开')
    return
  }
  // alert(this.token)
  ready(async (code) => {
    this.code = code
    const param = new URLSearchParams(location.href.split('?')[1])
    const token = param.get('token')
    if (token) {
      // 若有url中有token则需要绑定
      bind(code, token, cb)
    } else {
      // 若无token，则直接登录
      getToken(code, cb)
    }
  })
}
