<template>
  <section>
    <el-tooltip class="item" effect="dark" content="Reset password" placement="top-start">
        <el-button size="mini" @click="centerDialogVisible = true" icon="el-icon-refresh"></el-button>
    </el-tooltip>
    <el-dialog title="Xác nhận reset password" :visible.sync="centerDialogVisible" width="30%" center>
      <div v-if="new_pass">
        <span>Mật khẩu mới: </span><el-tag type="danger">Tag 5</el-tag><br>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">Xác nhận</el-button>
        <el-button @click="centerDialogVisible = false">Hủy bỏ</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible: false,
      new_pass: null
    }
  }
}
</script>
