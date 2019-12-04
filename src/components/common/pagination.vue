<template>
  <div class="block" style="text-align: right; margin-top: 30px">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="common_data.pagination.size"
      layout="total, prev, pager, next"
      :total="common_data.pagination.element_total"
      :current-page="common_data.pagination.current_page + 1"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$store.commit('Common/pagination_current_page', val - 1)
    }
  }
}
</script>
