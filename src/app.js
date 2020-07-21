import Vue from 'vue'
// 第三方组件
import { sync } from 'vuex-router-sync'
// !css 根据是否依赖 iview 放开注释
// import iview from 'iview'
// 文件目录
import views from  './views' // 视图
import directives from './directives' // 全局指令注册入口
import utils from './utils' // 全局工具注册入口
// http 框架
import Http, { http } from './lib/http'
// 路由
import router from './router'
// 状态管理框架
import store from './store'
// !css 根据是否依赖 iview 放开注释
// reset css
import 'normalize.css'
import './assets/css/init.css'
import './assets/css/reset-1.3.3.css'
// 入口组件
import App from './components/App/index.vue'

// import 'view-design/dist/styles/iview.css'

//聊天
import chat from './lib/chat'
Vue.use(chat, store, router, http)

// echarts
import echarts from 'echarts'


Vue.prototype.$echarts = echarts

//! css 根据是否依赖 iview 放开注释
Vue.use(directives)
Vue.use(utils)
Vue.use(Http)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App,
})

Vue.use(views, store, router, http)

export default app
