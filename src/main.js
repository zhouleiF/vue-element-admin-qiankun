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

import {
  registerMicroApps,
  runAfterFirstMounted,
  start
} from 'qiankun'
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

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}

let app = null

function render({
  appContent,
  loading
}) {
  if (!app) {
    app = new Vue({
      el: '#root',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading
        }
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}

render({
  loading: true
})

// 注册子应用
registerMicroApps([
{
  name: 'vue sub-app3',
  entry: '//localhost:7300',
  render,
  activeRule: genActiveRule('/sub-app3')
}
], {
  beforeLoad: [
    app => {
      console.log('before load', app)
    }
  ],
  beforeMount: [
    app => {
      console.log('before mount', app)
    }
  ],
  afterMount: [
    app => {
      console.log('after mount', app)
    }
  ],
  afterUnmount: [
    app => {
      console.log('after unload', app)
      app.render({
        appContent: '',
        loading: false
      })
    }
  ]
})

/**
 * @description 设置哪个子应用程序在主加载后默认处于活动状态
 * @param defaultAppLink: string 跳转链接
 */
// setDefaultMountApp('/home');

/**
 * @description 第一个应用构建完成后执行
 * @param 要执行的函数
 */
runAfterFirstMounted(() => console.info('first app mounted'))

/**
 * @description 启动主应用
 * @param prefetch 是否在第一次安装子应用程序后预取子应用程序的资产,默认为 true
 * @param jsSandbox 是否启用沙盒，当沙盒启用时，我们可以保证子应用程序是相互隔离的,默认为 true
 * @param singular 是否在一个运行时只显示一个子应用程序，这意味着子应用程序将等待挂载，直到卸载之前,默认为 true
 * @param fetch 设置一个fetch function,默认为 window.fetch
 */
start()

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
