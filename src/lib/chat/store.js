/**
 * 聊天模块 store
 */
// api
// https://www.showdoc.cc/25872885174382?page_id=640183500405704


export const CREATE_CHAT = 'CREATE_CHAT' //创建聊天
export const GET_CHAT_BY_ID = 'GET_CHAT_BY_ID' //获取聊天详情
export const SEND_MESSAGE = 'SEND_MESSAGE' //发送消息
export const GET_RECORD = 'GET_RECORD' // 获取 消息记录
export const GET_MSG_LIST = 'GET_MSG_LIST' // 获取 聊天列表
export const GET_UNREAD_MSG_LIST = 'GET_UNREAD_MSG_LIST' // 获取 未读消息
export const api = {
  [CREATE_CHAT]: `/monitorgrid/chat/createChat.json`,
  [GET_CHAT_BY_ID]: `/monitorgrid/chat/getChatById.json`,
  [SEND_MESSAGE]: `/monitorgrid/chat/sendMessage.json`,
  [GET_RECORD]: `/monitorgrid/chat/findMessageRecord.json`,
  [GET_MSG_LIST]: `/monitorgrid/chat/findMessageList.json`,
  [GET_UNREAD_MSG_LIST]: `/monitorgrid/chat/findUnReadMessage.json`,
}
const state = {
  contactsList: [], //联系人列表;
  currentChat: {},
  isSearch: false, //是否展示聊天记录页面
  recordInfo: {}, //聊天记录 相关
  searchMessageList: [], //通过name 查找的联系人
  unReadMessageList: [], //未读的 消息
}
const actions = (http) => ({
  createChat({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[CREATE_CHAT], playload)
        .then(rst => {
          if (rst.success) {
            resolve(rst.data)
            commit('updateContactsList', rst.data)
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
  getChatById({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[GET_CHAT_BY_ID], playload)
        .then(rst => {
          if (rst.success) {
            const __ARR = rst.data
            if (rst.data.messages.length > 0) {
              rst.data.messages.forEach((item, key) => {
                __ARR.messages[key].fromUser.id = item.fromUser.userId
                __ARR.messages[key].fromUser.organization = {}
                __ARR.messages[key].fromUser.organization.orgName = item.fromUser.orgName
              })
            }
            if (rst.data.user) {
              __ARR.user.organization = {}
              __ARR.user.organization.orgName = __ARR.user.orgName
            }
            if (rst.data.users) {
              rst.data.users.forEach((item, key) => {
                __ARR.users[key].id = item.userId
                __ARR.users[key].organization = {}
                __ARR.users[key].organization.orgName = item.orgName
              })
            }
            commit('updateChatDetail', __ARR)
            commit('updataUnReadNum', rst.data.id)
            resolve(rst.data)
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
  sendMessage({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[SEND_MESSAGE], playload)
        .then(rst => {
          if (rst.success) {
            resolve(rst.data)
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
  getRecord({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[GET_RECORD], playload)
        .then(rst => {
          if (rst.success) {
            resolve(rst.data || [])
            commit('updateRecord', rst.data || [])
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
  findMessageList({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[GET_MSG_LIST], playload)
      // http.get(api[GET_MSG_LIST], playload)
        .then(rst => {
          if (rst.success) {
            resolve(rst.data)
            if (playload.status === '0') {
              commit('updateUnReadMessageList', rst.data)
              commit('addUnReadNum', { list: rst.data, fromUserId: playload.fromUserId })
            }
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
  findUnReadMessage({ commit }, playload) {// eslint-disable-line
    return new Promise((resolve, reject) => {
      http.post(api[GET_UNREAD_MSG_LIST], playload)
        .then(rst => {
          if (rst.success) {
            resolve(rst.data)
          } else {
            reject(rst.msg)
          }
        })
        .catch(e => reject(e.message))
    })
  },
})
const mutations = {
  // 联系人
  updateContactsList(state, data) {
    const index = state.contactsList.findIndex((v) => v.id === data.id)
    if (index > -1) {
      state.contactsList.splice(index, 1)
      state.contactsList.unshift(data)
    } else {
      state.contactsList.unshift(data)
    }
  },
  //将未读消息添加到 人员列表中
  addUnReadNum(state, data) {
    data.list.forEach((val) => {
      const index = state.contactsList.findIndex((v) => v.id === val.chatId)
      if (index > -1) {
        state.contactsList[index].unReadCount = val.unReadCount
      } else {
        const { chatId, isGroup, unReadCount, name } = val
        state.contactsList.unshift({ id: chatId, isGroup, unReadCount, fromUserId: data.fromUserId, name }) // eslint-disable-line
      }
    })
    state.contactsList.sort((a, b) => {
      const aNum = a.unReadCount || 0
      const bNum = b.unReadCount || 0
      return bNum - aNum
    })
  },
  updataUnReadNum(state, id) {
    const index = state.contactsList.findIndex((v) => v.id === id)
    state.contactsList[index].unReadCount = 0
  },
  delContacts(state, id) {
    const index = state.contactsList.findIndex((v) => v.id === id)
    if (index > -1) {
      state.contactsList.splice(index, 1)
      state.currentChat = {}
    }
  },
  updateChatDetail(state, data) {
    state.currentChat = data
  },
  changeIsSearch(state, isSearch) {
    state.isSearch = isSearch
  },
  updateRecord(state, data) {
    state.recordInfo = data
  },
  updateSearchMessageList(state, list) {
    state.searchMessageList = list
  },
  updateUnReadMessageList(state, list) {
    state.unReadMessageList = list
  },
  emptyContact(state) {
    state.contactsList = []
  },
}
const getters = {
  currentChat(state) {
    return state.currentChat
  },
}
export default (http) => ({
  namespaced: true,
  state,
  actions: actions(http),
  mutations,
  getters,
})