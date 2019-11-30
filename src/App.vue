<template>
  <section>
    <div id="app">
      <router-view/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" src="./assets/sass/app.scss"></style>
<style lang="scss" src="./assets/sass/custom.scss"></style>

<style>
.el-loading-mask {
  top: -10px;
  left: -10px
}
</style>
<style media="screen">
  .el-loading-spinner {
    top: 50%
  }
</style>
