import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import './plugins'
import './components'

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

sync(store, router)

async function main () {
  await store.dispatch('init')

  // 下面这一行是让new Vuew({xx})被eslint忽略npm
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    store,
    ...App,
  })
}

main()
