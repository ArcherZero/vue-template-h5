import axios from './axios'

const apiRouter = '/api-equipment'

// 获取token
export function token (data) {
  const param = qs.stringify({
    ...data,
    client_id: 'evm-dingtalk',
    client_secret: 'evm-dingtalk',
    grant_type: 'dingTalk'
  })
  return axios.post('/api-auth/oauth/token', param)
}

// 钉钉绑定
export function dingTalkToUser (data) {
  return axios.post(apiRouter + '/dingtalk/dingTalkToUser', data)
}
