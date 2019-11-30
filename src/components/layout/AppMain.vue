<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
  margin: 20px
}
</style>
