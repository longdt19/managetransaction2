<template lang="html">
<section style="text-align: right">
  <span>Hiển thị</span>
  <el-select v-model="value" style="width: 80px; margin-left: 10px; margin-bottom: 20px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</section>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          value: 10,
          label: 10
        },
        {
          value: 20,
          label: 20
        },
        {
          value: 30,
          label: 30
        },
        {
          value: 50,
          label: 50
        }
      ],
      value: 10
    }
  },
  watch: {
    'value' (val) {
      this.$store.commit('Common/pagination_current_page', 0)
      this.$store.commit('Common/pagination_size', val)
    }
  }
}
</script>

<style lang="css">
</style>
