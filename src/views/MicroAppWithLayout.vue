<template>
  <div id="container" />
</template>

<script>
import { loadMicroApp } from 'qiankun'

const app = {
  name: 'MicroAppWithLayout',
  entry: '//0.0.0.0:7500'
}
export default {
  name: 'MicroAppWithLayout',
  data () {
    return {
      microApp: null
    }
  },
  mounted () {
    console.log('主应用mounted', this.microApp)
    this.microApp = loadMicroApp({
      name: app.name,
      entry: app.entry,
      container: '#container'
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.microApp && this.microApp.mountPromise.then(() => this.microApp.unmount()).then(() => {
      this.microApp = null
      next()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.microApp && this.microApp.mountPromise.then(() => this.microApp.unmount()).then(() => {
      this.microApp = null
      next()
    })
  },
  beforeDestroy () {
    this.microApp && this.microApp.mountPromise.then(() => {
      this.microApp.unmount()
      this.microApp = null
    })
  }
}
</script>

<style>

</style>
