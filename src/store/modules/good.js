import { fetchGoodList } from '@/utils/api'

const state = {
  msg: 'test vuex',
  goodObj: {}    // 用于实现Find页面数据缓存
}
const getters = {}
const mutations = {
  updateGoodObj(state, payload) {
    state.goodObj[payload.index] = payload.list
    // 深复制
    state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
  },
  clearGoodObj(state) {
    state.goodObj = {}
  }
}
const actions = {
  // 根据页面中activeKey来调接口
  // 拿到当前activeKey对应的商品列表数据，通过mutations方法将其放在goodObj中
  // 页面组件中，使用mapState来渲染视图
  getGoodList(store, payload) {
    fetchGoodList({cate: payload.cate}).then(res=>{
      store.commit('updateGoodObj', {index: payload.index, list: res.list})
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
