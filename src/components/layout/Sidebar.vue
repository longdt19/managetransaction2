<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >

      <el-menu-item index="transaction" @click.native="go_to('transaction')">
        <el-tooltip class="item" effect="dark" content="Thống kê chung" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Chi tiết giao dịch</span>
      </el-menu-item>

      <el-menu-item index="orders" @click.native="go_to('orders')">
        <el-tooltip class="item" effect="dark" content="Thống kê chung" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Đơn hàng</span>
      </el-menu-item>

      <el-menu-item index="products" @click.native="go_to('products')">
        <el-tooltip class="item" effect="dark" content="Sản phẩm" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Sản phẩm</span>
      </el-menu-item>

      <el-menu-item index="bank_accounts" @click.native="go_to('bank_accounts')">
        <el-tooltip class="item" effect="dark" content="Sản phẩm" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Ngân hàng</span>
      </el-menu-item>

      <el-menu-item index="customers" @click.native="go_to('customers')">
        <el-tooltip class="item" effect="dark" content="Sản phẩm" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Khách hàng</span>
      </el-menu-item>

      <el-menu-item index="customer_groups" @click.native="go_to('customer_groups')">
        <el-tooltip class="item" effect="dark" content="Sản phẩm" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 25px; margin-right: 10px" />
        </el-tooltip>
        <span>Nhóm khách hàng</span>
      </el-menu-item>

    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: { },
  data () {
    return {
      defaultActive: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    go_to (path) {
      this.$router.push('/' + path)
    }
  },
  created () {
    this.defaultActive = this.$route.name
  }
}
</script>
<style media="screen">
  #app .hideSidebar .el-submenu > .el-submenu__title {
    text-align: right;
  }
</style>
<style scoped="">
</style>
