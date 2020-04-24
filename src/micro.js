
import {
  registerMicroApps,
  runAfterFirstMounted,
  start
} from 'qiankun'

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}
// 注册子应用
registerMicroApps([{
  name: 'sub-app1',
  entry: '//localhost:7200',
  container: '#micro',
  activeRule: genActiveRule('/micro/sub1')
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
