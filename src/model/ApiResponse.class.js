/**
 * @description 处理请求返回 response 类，返回200情况
 * response.data 格式：
 * {
 *    code: number
 *    message: string,
 *    data: [any] // 新增接口data返回为null
 * }
 */

class ApiResponse {
  constructor (response) {
    this.response = response.data
    this.code = response.data?.code || 0
    this.message = null
    this.data = null
    this.__handleResponse()
  }

  __handleResponse () {
    // 部分接口不以标准结构返回 统一成标准结构
    if (+this.response.code === 0 || this.response.code) {
      // getUserInfo 接口返回有code字段但是没有data字段
      this.data = this.response.data || this.response
      this.message = this.response.message
    } else {
      this.data = this.response
      this.message = '...'
    }

    if (this.code === 0 && this.data === null) this.data = true
  }
}

export default ApiResponse
