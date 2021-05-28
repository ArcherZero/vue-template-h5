import axios from './axios'
import { cleanObj } from '@/util'
import qs from 'qs'

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

// 获取短信验证码
export function sms (data) {
  return axios.get('/api-taxi/sms/code', { ...cleanObj(data) })
}
