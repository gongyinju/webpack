import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      userName: '一个名字很长很长的公司',
      customerId: '1.2xefsd.x'
    }
  },
  actions: actions,
  mutations: mutations,
  modules: {
  }
})

export default store
