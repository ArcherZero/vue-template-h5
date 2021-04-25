import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

Vue.config.productionTip = false

Vue.use(Vant)

if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole')
  /* eslint-disable no-new */
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
