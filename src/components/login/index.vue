<template>
<section>
  <el-row style="justify-content: center; align-items: center; display: flex">
    <el-col :xs="24"  :md="16"><div class="grid-content bg-purple">
      <img src="/static/login/images/login.png" alt="" class="img-fluid">
    </div></el-col>
    <el-col :xs="24" :md="8" v-loading="loading"><div class="grid-content bg-purple"  >
      <div class="" >
        <h2 class="form-tittle">Đăng nhập</h2>
      </div>
          <p class="form-description">Transaction Management</p>
          <div class="form-group">
            <input v-model="username" type="username" class="form-control" id="id_email" placeholder="Username" name="username">
          </div>
          <div class="form-group">
            <input v-model="password" type="password" class="form-control" id="id_password" placeholder="Password" name="password">
          </div>
          <el-button  type="submit" class="btn btn-primary" @click="login">Đăng nhập</el-button>
    </div></el-col>
  </el-row>
</section>
</template>

<script>
import { LOGIN_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      username: 'admin',
      password: 'admin',
      loading: false
    }
  },
  methods: {
    async login () {
      if (this.loading) return

      this.loading = true

      const data = {
        username: this.username,
        password: this.password
      }

      const response = await this.$services.do_request('post', LOGIN_URL, data)
      this.loading = false

      if (response.data.data) {
        const token = response.data.data.tokenState.jwt
        this.$store.commit('Common/tokenLoaded', token)
        const username = response.data.data.username
        this.$store.commit('Common/username', username)
        const navigation = response.data.data.listRoleNavigation
        this.$store.commit('Common/navigation', navigation)

        // set default day to search
        // let search = getDays()
        // this.$store.commit('Common/search_product_loaded', search)
        // this.$store.commit('Common/search_bank_loaded', search)
        // this.$store.commit('Common/search_customer_loaded', search)
        this.$router.push('/')
      } else if (response.data.code === 401) {
        this.$message.error('Tài khoản không đúng')
      } else {
        this.$message.error('Lỗi hệ thống! Đăng nhập thất bại')
      }
    }
  },
  created () {
    this.$store.commit('Common/tokenLoaded', null)
    this.$store.commit('Common/restore')
  }
}
</script>

<style scoped>
@import '../../../static/login/vendor/bootstrap.css';
@import '../../../static/login/1.css';
</style>
