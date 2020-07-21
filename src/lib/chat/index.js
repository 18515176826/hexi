import ChatVue from './views/index'
import stores from './store'

export default (Vue, store, router, http) => {
  store.registerModule('chat', stores(http))
  const ExChat =  Vue.extend(ChatVue)
  const chatDom = document.createElement('div')
  chatDom.setAttribute('id', 'tqChat')
  const Chat = new ExChat({
    el: chatDom,
    store,
    router,
  })
  document.body.appendChild(Chat.$el)
  Vue.prototype.Chat = Chat
}