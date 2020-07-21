import { http } from '../../../lib/http'

const urls = {
  GET_CAMERA_PLAY_URL: '/monitorgrid/permission/getCameraPlayUrl.json', // !雪亮接口的示例 获取单个播放地址
  GET_CAMERA_PLAY_MANY_URL: '/fusionApplication/social/getCameraPlayManyUrl.json', // !雪亮接口的示例 获取多个摄像头的播放数据
}

export const getCameraPlayUrl = (payload) => {
  return http.get(urls['GET_CAMERA_PLAY_URL'], payload)
}

export const getCameraPlayManyUrl = (payload) => {
  return http.get(urls['GET_CAMERA_PLAY_MANY_URL'], payload)
}
