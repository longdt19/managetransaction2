<template>
  <section>
    <el-button icon="el-icon-refresh-left" @click="dialogFormVisible = true"></el-button>
      <el-dialog title="Reset password" :visible.sync="dialogFormVisible">

        <el-row :gutter="30">
          <el-col :span="12"><div class="grid-content bg-purple">
              <el-form>
                <el-form-item label="Tên đăng nhập: ">
                  <el-input v-model="user.userName" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
          </div></el-col>

          <el-col :span="12"><div>
            <el-form>
              <el-form-item label="Mật khẩu mới: ">
                <el-input v-model="password"></el-input>
              </el-form-item>
            </el-form>
          </div></el-col>

        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reset_password()" :loading="loading">Xác nhận</el-button>
          <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
import {RESET_PASSWORD_URL} from '@/constants/endpoints'
export default {
  props: {
    user: {type: Object}
  },
  data () {
    return {
      dialogFormVisible: false,
      password: null,
      loading: false
    }
  },
  methods: {
    async reset_password () {
      if (this.loading) return
      this.loading = true
      const payload = {
        userName: this.user.userName,
        password: this.password
      }
      const response = await this.$services.do_request('put', RESET_PASSWORD_URL, payload)
      if (response.status === 202) {
        this.loading = false
        this.$message.success('Đổi mật khẩu thành công')
        this.dialogFormVisible = false
      }
    }
  }
}
</script>
