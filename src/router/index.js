import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Screen = () => import('@/views/screen/views')
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/screen',
      component: Screen,
      name: 'Screen',
      redirect: '/screen/population',
      children: [
        {
          path: 'population',
          name: 'population',
          component: () => import('@/views/screen/views/population'),
        },
      ],
    },
  ],
})
