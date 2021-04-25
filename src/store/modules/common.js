// import * as CommonAction from '@/api/common'

// 页面加载状态
export default {
  state: {
    loading: false,
    navigation: []
  },
  getters: {
    loading: state => state.loading,
    navigation: state => state.navigation
  },
  mutations: {
    SET_LOADING(state, val) {
      state.loading = val
    },
    SET_NAVIGATION (state, val) {
      state.navigation = val
    }
  },
  actions: {
    // action
  }
}
