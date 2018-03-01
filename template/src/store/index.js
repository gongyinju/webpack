import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      customerId: '020020',
      userName: '一个假设的经销商名称'
    },

    isLogedIn: false,
    currentUser: null, // 当前登录用户
    roles: null, // 当前用户的所有角色
    currentRole: null, //当前用户的当前角色
    currentDealer: null,  //当前经销商
    currentCompany: null //当前分公司
  },
  actions: actions,
  mutations: mutations,
  modules: {
  }
})

export default store
