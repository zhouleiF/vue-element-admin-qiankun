<template>
  <div id="container" />
</template>

<script>
import { loadMicroApp } from 'qiankun'

const microAppConfigs = [
  {
    name: 'sub7200',
    entry: '//0.0.0.0:7200'
  },
  {
    name: 'sub7300',
    entry: '//0.0.0.0:7300'
  }
]
export default {
  name: 'MicroApp',
  data () {
    return {
      microApp: null
    }
  },
  mounted () {
    console.log('主应用mounted', this.microApp)
    const app = microAppConfigs[1]
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
