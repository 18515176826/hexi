import * as stores from './views/children/*/store.js.js'

export default (http) => {
  const modules = {}
  const actions = {
    async getNowDate() {
      const rst = await apis.getNowDate()
      if (rst.code === 200 || rst.code === '200') {
        return new Date(rst.data)
      } else {
        throw rst.msg
      }
    },
  }
  Object.keys(stores).forEach(k => { modules[k] = stores[k](http) })
  return {
    namespaced: true,
    modules,
    actions,
  }
}
