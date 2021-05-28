export default {
  state: {
    bindToken: '',
    userInfo: {
      access_token: ''
    },
    userInfoObj: null
  },
  getters: {
    bindToken: state => state.bindToken,
    token: state => state.userInfo?.access_token
  },
  mutations: {
    SET_BIND_TOKEN (state, val) {
      state.bindToken = val
    },
    // 存数据
    getUserInfo (state, obj) {
      state[obj.typeName] = obj.typeNum
    },
    SET_USER_INFO (state, obj) {
      state.userInfo = obj
    },
    setUserInfoObj (state, obj) {
      state.userInfoObj = obj
    }
  },
  actions: {
    // action
  }
}
