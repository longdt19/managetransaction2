<template>
  <section>
    <el-button type="danger" size="mini" @click="centerDialogVisible = true" icon="el-icon-delete"></el-button>

    <el-dialog
      title="Warning"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>Sau khi xóa sẽ không thể phục hồi.</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">Đồng ý</el-button>
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
      centerDialogVisible: false
    }
  }
}
</script>
