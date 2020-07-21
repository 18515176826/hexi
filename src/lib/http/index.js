import Http, { httpConfig, HTTP_ERROR_MAP, HttpError } from 'venus-fetch' // eslint-disable-line
export const http = Http({
  conf: {
    credentials: 'include',
    baseUrl: `/api`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
})
export default (Vue, opt = {}) => {

  // const CUSTOM_HTTP_ERROR_STATUS = 602 // 前端项目内自定义错误码

  http.setOption(opt)

  http.injectAfter(rsp => {
    try {
      return rsp
      // const { success, code, message, msg } = rsp

      // if (!success || code === 40101) {
      //   if (code === 40101) { // 根据项目判断状态码
      //     return new HttpError({
      //       code,
      //       httpStatus: HttpError.TOKEN_EXPIRE, // 登录超时
      //       message: message || msg || HTTP_ERROR_MAP[HttpError.TOKEN_EXPIRE],
      //     })
      //   } else if (code !== 0) {
      //     return new HttpError({
      //       code,
      //       httpStatus: CUSTOM_HTTP_ERROR_STATUS, // 服务器返回的错误
      //       message: message || msg || '后台返回未知错误',
      //     })
      //   }
      // }
    } catch (error) {
      return error
      // return new HttpError({
      //   code: CUSTOM_HTTP_ERROR_STATUS,
      //   httpStatus: HttpError.RESPONSE_PARSING_FAILED, // 解析数据错误
      //   message: HTTP_ERROR_MAP[HttpError.RESPONSE_PARSING_FAILED],
      // })
    }
  })

  // http.setErrorHook((httpError, fetchUrl) => {
  //   console.log('[HTTP ERROR]', fetchUrl, httpError) // eslint-disable-line
  // })

  Vue.prototype.http = http
}
