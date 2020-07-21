/**
 * !!!! 视频播放组件 该组件依赖若干请求 以及部分在 static 下的静态页面资源
 */

import Svp from '@ourea/video-player'
import store from '../../store'

const PLAY_TYPE = { '1': 'video', '2': 'window', '3': 'yssdk', '4': 'hik_pvia', '5': 'dahua' }

const hikPviaConf = () => {
  const {
    hik_pvia_appkey: appkey,
    hik_pvia_port: port,
    hik_pvia_ip: ip,
    hik_pvia_secret: secret,
  } = store.getters['globe/user/conf']
  return { appkey, port: +port, ip, secret }
}

/**
 * 海康插件播放器播放
 * @param {*} dataSet 点位数组
 */
const hikExePlayerHandler = async (dataSet) => {
  const params = {
    actionId: 'getCameraPlayManyUrl',
    ids: dataSet.map(v => v.id).join(','),
    platformId: `${dataSet[0].platformId}`,
  }
  const { url } = await store.dispatch('common/getCameraPlayManyUrl', params)
  return { url, type: 'video' }
}

/**
 * 宇视播放插件
 * @param {*} camera 摄像头数据
 */
const yssdkHandler = camera => ({ id: camera.id, type: camera.type })

/**
 * 海康播放器插件播放
 * @param {*} camera 摄像头数据信息
 */
const hikPviaHandler = camera => {
  const hikConf = hikPviaConf()
  return {
    id: camera.id,
    type: camera.type,
    hikInfo: {
      ...hikConf,
      code: camera.id,
    },
  }
}

/**
 * hls流播放
 * @param {*} camera 摄像头数据信息
 */
const hlsHandler = async camera => {
  const params = {
    id: `${camera.id}`,
    protocol: '0',
    actionId: 'getCameraPlayUrl',
  }
  const {
    playType,
    playrealUrl,
    activeUrl = null,
    interval = 0,
  } = await store.dispatch('common/getCameraPlayUrl', params)
  let heartBeat = null
  if (activeUrl) {
    const callback = () => fetch(activeUrl, { method: 'GET' })
    heartBeat = {
      callback,
      duration: interval,
    }
  }
  return {
    url: playrealUrl,
    id: d.id,
    type: PLAY_TYPE[playType],
    ...(heartBeat ? { heartBeat } : {}),
  }
}

export default {
  install(Vue) {
    const svp = new Svp({
      load: (dataSet, type, comp) => { // eslint-disable-line
        // eslint-disable-next-line no-magic-numbers
        if (type === 'video' && dataSet.length > 1) { // 海康 多画面
          return new Promise(resolve => {
            hikExePlayerHandler(dataSet)
              .then(resolve)
              .catch(() => svp.off())
          })
        } else {
          return Promise.all(dataSet.map(d => {
            return new Promise(resolve => {
              if (type === 'yssdk') { // 宇视
                resolve(yssdkHandler(d))
              } else if (type === 'hik_pvia') {
                resolve(hikPviaHandler(d))
              } else {
                hlsHandler(d)
                  .then(resolve)
                  .catch(() => svp.off())
              }
            })
          }))
        }
      },
    })
    Vue.prototype.svp = svp
  },
}
