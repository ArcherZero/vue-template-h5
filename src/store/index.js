import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    userInfo
  }
})
