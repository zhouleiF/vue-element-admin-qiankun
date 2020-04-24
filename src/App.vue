<template>
  <div id="root">
    <router-view v-if="!isChildApp" />
    <layout v-else :loading="loading" :is-child-app="isChildApp" :content="content" />
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  name: 'App',
  components: {
    Layout
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    loading: Boolean
  },
  computed: {
    isChildApp() {
      if (this.$route.path.match('sub-app')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
