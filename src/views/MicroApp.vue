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
    // const url = this.$route.path
    // const app = microAppConfigs.find(e => ('/microApp' + e.url) === url)
    // if (!app) this.$router.push('/')
    const app = microAppConfigs[1]
    this.microApp = loadMicroApp({
      name: app.name,
      entry: app.entry,
      container: '#container'
    })
  },
  beforeDestroy () {
    this.microApp.unmount()
  }
}
</script>

<style>

</style>
