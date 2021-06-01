/**
 * 微信免登
 * 需要需求方提供：
 *  - 前端使用：appid、appsecret
 *
 * 测试用appid请询问相关人员获取，需要先关注对应公众号
 *
 * 登录方式：
 *  - snsapi_base：静默授权，仅获取用户openid
 *  - snsapi_userinfo：需要用户手动同意，可获取用户昵称、头像等。授权一次后无需重复授权
 *
 * 特殊场景静默授权：对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的
 * 网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。
 */

// 跳转网页授权
export function jumpToGetAuth (params) {
  const code = sessionStorage.getItem('code')
  if (!code) {
    const appid = 'wx8a2ecdb02576162b'
    const redirectUrl = 'http://192.168.50.129:8080'
    const origin = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    const url = `${origin}?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base#wechat_redirect`
    location.href = url
  } else {
    // 暂无后端配合，自行调用接口 →_→，如果有幸写到了这里，请更新一下框架
    // 此处以获取code, 调用后端接口登录
    sessionStorage.removeItem('code')
  }
}
