import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})

// 全局store
window.store = new Vue({
  data: {
    state: {
      message: 'Hello!zzzzz'
    }
  },
  watch: {
    state: {
      handler(val, oldVal) {
        console.log('watch main')
        console.log('new', val)
        console.log('old', oldVal)
        console.log('emit')
        this.$emit('render')
      },
      deep: true
    }
  },
  methods: {
    setMessageAction(newValue) {
      console.log('setMessageAction triggered with', newValue)
      this.state.message = newValue
    }
  }
})
