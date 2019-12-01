<template>
  <section>
    <el-input v-model="inputModel" v-if="type === 'text'"></el-input>
  </section>
</template>

<script>
export default {
  props: {
    type: {type: String, default: 'text'},
    inputModel: {type: String}
  }
}
</script>
