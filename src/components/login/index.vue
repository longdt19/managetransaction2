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
import { LOGIN_URL, ROLE_FIND_FIELD_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      username: 'admin',
      password: 'admin',
      loading: false,
      userRole: null
    }
  },
  methods: {
    async login () {
      if (this.loading) return

      this.loading = true
      var formData = new FormData()
      formData.append('userName', this.username)
      formData.append('password', this.password)

      const response = await this.$services.do_request('post', LOGIN_URL, formData)
      this.loading = false

      if (response.status === 200) {
        const token = response.data.accessToken
        this.$store.commit('Common/tokenLoaded', token)
        const userInfo = response.data.jwtTokenUser
        this.$store.commit('Common/user_info', userInfo)

        // get role
        this.userRole = userInfo.userRole
        this.get_role()
      } else if (response.data.code === 401) {
        this.$message.error('Tài khoản không đúng')
      } else {
        this.$message.error('Lỗi hệ thống! Đăng nhập thất bại')
      }
    },
    async get_role () {
      this.loading = true

      const params = {
        field: 'name',
        value: this.userRole
      }
      const response = await this.$services.do_request('get', ROLE_FIND_FIELD_URL, params)
      this.loading = false
      if (response.status === 200) {
        let data = response.data
        this.$store.commit('Common/role', data)

        if (data.features) {
          let result = {}
          data.features.forEach(item => {
            result[item.screenId] = []
          })
          data.features.forEach(item => {
            result[item.screenId].push(item.action)
          })
          this.$store.commit('Common/navigation', result)
        }

        this.$router.push('/')
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
