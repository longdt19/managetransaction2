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
  .vue-numeric-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
