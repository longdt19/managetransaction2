<template>
  <section>
    <el-button type="danger" size="mini" @click="centerDialogVisible = true" icon="el-icon-delete"></el-button>

    <el-dialog
      title="Warning"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="" style="text-align: center">
        <span>Sau khi xóa sẽ không thể phục hồi.</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="do_request()" :loading="loading">Đồng ý</el-button>
        <el-button @click="centerDialogVisible = false">Hủy bỏ</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    apiUrl: {type: String},
    scope: {type: Object}
  },
  data () {
    return {
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    async do_request () {
      if (this.loading) return
      this.loading = true

      let url = this.apiUrl
      url = url + '/' + this.scope.id

      const response = await this.$services.do_request('delete', url)
      this.loading = false

      if (response.status === 200) {
        this.$message.success('Xóa thành công')
      }

      this.loading = false
      this.$emit('done_request')
      this.centerDialogVisible = false
    }
  }
}
</script>
