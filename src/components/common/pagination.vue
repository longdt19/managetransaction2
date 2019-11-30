<template>
  <div class="block" style="text-align: right; margin-top: 30px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="perPage"
      layout="total, prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    perPage: {type: Number}
  },
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange (val) {
      console.log(`current page: ${val}`)
    }
  },
  watch: {
    'perPage' (val) {
      console.log('new per page pagination', this.perPage)
    }
  }
}
</script>
