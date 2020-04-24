<template>
  <section class="single-main">
    <transition name="fade-transform" mode="out-in">
      <div
        v-html="content"
      />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'SingleMain',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.single-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.single-main {
  padding-top: 50px;
}
</style>
