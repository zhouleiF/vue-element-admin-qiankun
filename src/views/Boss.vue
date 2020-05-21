<template>
  <div id="app" />
</template>

<script>
import { loadMicroApp } from 'qiankun'

const microAppConfig = {
    name: 'sub7200',
    entry: '//0.0.0.0:8080'
  }
export default {
  name: 'MicroApp',
  data () {
    return {
      microApp: null
    }
  },
  mounted () {
    const app = microAppConfig
    this.microApp = loadMicroApp({
      name: app.name,
      entry: app.entry,
      container: '#app'
    })
  },
  beforeDestroy () {
    this.microApp.unmount()
  }
}
</script>

<style>

</style>
