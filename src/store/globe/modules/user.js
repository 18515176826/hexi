import { http } from '../../../lib/http'
//import router from '@/router'
// import axios from 'axios'
// 定义action type
export const FINDCHILDORGANIZATION = 'FINDCHILDORGANIZATION'
export const GRIDONLINESTAT = 'GRIDONLINESTAT'
export const GRIDPATROLSTAT = 'GRIDPATROLSTAT'
export const HOTWORDSTAT = 'HOTWORDSTAT'
export const ISSUECOMPLETESTAT = 'ISSUECOMPLETESTAT'
export const ISSUEVALIDITYSTAT = 'ISSUEVALIDITYSTAT'
export const SAFETYINDEXSTAT = 'SAFETYINDEXSTAT'
export const BASEDATASTAT = 'BASEDATASTAT'


// const sid = window.location.hash.split('=')[1] ? window.location.hash.split('=')[1] : '1c1ca3ca-62de-47eb-bfd8-4f5b99098271'  // eslint-disable-line
// 指定对应api
export const api = {
  [FINDCHILDORGANIZATION]: `/dp/big/screen/binjiang/v2/findChildOrganization`, // 查询子层级组织列表
  [GRIDONLINESTAT]: `/dp/big/screen/binjiang/v2/gridOnlineStat`, // 网格员在线统计
  [GRIDPATROLSTAT]: `/dp/big/screen/binjiang/v2/gridPatrolStat`, // 网格员巡查统计
  [HOTWORDSTAT]: `/dp/big/screen/binjiang/v2/hotWordStat`, // 热词分析统计TOP5
  [ISSUECOMPLETESTAT]: `/dp/big/screen/binjiang/v2/issueCompleteStat`, // 事件办结率
  [ISSUEVALIDITYSTAT]: `/dp/big/screen/binjiang/v2/issueValidityStat`, // 事件有效性统计
  [SAFETYINDEXSTAT]: `/dp/big/screen/binjiang/v2/safetyIndexStat`, // 平安指数
  [BASEDATASTAT]: `/dp/big/screen/binjiang/v2/baseDataStat`, // 基础数据统计
}

// 初始化store对象
const state = {
  userInfo: {},
  userTheme: 'default',
  leftBottomData: {},
}

// 异步操作放到action handler里
const actions = {
  EssentialData({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 基础数据统计
      try {
        const rst = await http.get(api[BASEDATASTAT], {
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  SafenessIndex({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 平安指数
      try {
        const rst = await http.get(api[SAFETYINDEXSTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  DealWithComplete({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 事件有效性统计
      try {
        const rst = await http.get(api[ISSUECOMPLETESTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  AnEffective({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 事件有效性统计
      try {
        const rst = await http.get(api[ISSUEVALIDITYSTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  EventStudy({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 事件办结率
      try {
        const rst = await http.get(api[ISSUECOMPLETESTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  HotWordsAnalysis({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 热词分析统计TOP5
      try {
        const rst = await http.get(api[HOTWORDSTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  GridInquire({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 网格员巡查统计
      try {
        const rst = await http.get(api[GRIDPATROLSTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  GridStatistics({ commit }, orgId) { // eslint-disable-line
    return new Promise(async (resolve, reject) => { // 网格员在线统计
      try {
        const rst = await http.get(api[GRIDONLINESTAT], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  EssentialData({ commit }, orgId) { // eslint-disable-line
    console.log(orgId, 123)
    return new Promise(async (resolve, reject) => { // 子层级组织列表
      try {
        const rst = await http.get(api[FINDCHILDORGANIZATION], {
          // sessionId: sid,
          orgId: orgId,
        })
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
}

// 根据commit更新store
const mutations = {
  SET_USER_INFO(state, info) {
    state.userInfo = info
  },
  SET_USER_THEME(state, theme) {
    state.userTheme = theme
  },
  SET_LEFT(state, payload) {
    state.leftBottomData = payload
  },
}

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  userTheme(state) {
    return state.userTheme
  },
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
