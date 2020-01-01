<template>
<section>
  <el-button :type="buttonType" :size="buttonSize"
    @click="open()" :icon="buttonIcon">{{buttonTitle}}</el-button>

<el-dialog :title="this.scope ? 'Chỉnh sửa' : 'Tạo mới'" :visible.sync="dialogFormVisible" style="text-align: left">
  <el-row :gutter="30">
    <el-col :span="12"><div class="grid-content bg-purple">
        <el-form :model="form" :rules="rules" ref="form1">

          <el-form-item label="Thời gian" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.time"
              type="datetime"
              :default-time="form.time"
              value-format="timestamp"
              format="dd-MM-yyyy HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Mã giao dịch" :label-width="formLabelWidth">
            <el-input v-model="form.code"></el-input>
          </el-form-item>

          <el-form-item label="Khách hàng" :label-width="formLabelWidth" prop="customerId">
            <el-select v-model="form.customerId" placeholder="Vui lòng chọn"
              filterable
              remote
              :remote-method="get_customer_list"
              :loading="customer.loading"
            >
              <el-option
                v-for="c in customer.list"
                :key="c.id"
                :label="c.azAccount"
                :value="c.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Loại" :label-width="formLabelWidth">
            <el-radio-group v-model="form.type">
              <el-radio
                v-for="(type, index) in order_type_list"
                v-bind:key="index"
                :label="type.value"/>
            </el-radio-group>

          </el-form-item>

          <el-form-item label="Ghi chú" :label-width="formLabelWidth">
            <el-input v-model="form.note"></el-input>
          </el-form-item>

        </el-form>
    </div></el-col>

    <el-col :span="12"><div>
        <el-form :model="form" :rules="rules" ref="form2">
          <el-form-item label="Sản phẩm" :label-width="formLabelWidth" prop="productId">
            <el-select v-model="form.productId" placeholder="Vui lòng chọn"
              filterable
              @focus="get_product_list()"
              :loading="product.loading"
            >
              <el-option
                v-for="c in product.list"
                :key="c.id"
                :label="c.name"
                :value="c.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Nhập" :label-width="formLabelWidth">
            <vue-numeric separator="," v-model="form.cost" :value="form.cost" class="vue-numeric-input"></vue-numeric>
          </el-form-item>

          <el-form-item label="Chiết khấu (%)" :label-width="formLabelWidth">
            <vue-numeric separator="," v-model="form.extracts" :value="form.extracts" class="vue-numeric-input"></vue-numeric>
          </el-form-item>

          <el-form-item label="Giảm giá" :label-width="formLabelWidth">
            <vue-numeric separator="," v-model="form.promotion" :value="form.promotion" class="vue-numeric-input"></vue-numeric>
          </el-form-item>

          <el-form-item label="Tổng" :label-width="formLabelWidth">
            <vue-numeric separator="," :disabled="true" :value="(form.cost)*(100-form.extracts)/100 - form.promotion" class="vue-numeric-input"></vue-numeric>
          </el-form-item>

        </el-form>
    </div></el-col>

  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="create('form1', 'form2')" :loading="loading">Xác nhận</el-button>
    <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
  </span>
</el-dialog>
</section>
</template>

<script>
import {ORDER_TYPE_LIST} from '@/constants'
import {CUSTOMER_TABLE_URL, PRODUCTS_URL, ORDERS_URL} from '@/constants/endpoints'
import {ORDER_RULES} from '@/constants/rules_input'

import getDays from '@/utils/day'

export default {
  props: {
    scope: {type: Object},
    buttonSize: {type: String},
    buttonIcon: {type: String},
    buttonTitle: {type: String},
    buttonType: {type: String}
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        time: null,
        code: null,
        customerId: null,
        discount: 0,
        extracts: 0,
        total: 0,
        note: null,
        productId: null,
        type: 'XUAT',
        promotion: 0
      },
      formLabelWidth: '120px',
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      customer: {
        loading: false,
        list: []
      },
      order_type_list: ORDER_TYPE_LIST,
      product: {
        loading: false,
        list: []
      },
      loading: false,
      old_state: {},
      rules: ORDER_RULES
    }
  },
  methods: {
    getDays,
    open () {
      this.form.time = this.getDays().to_date
      if (this.scope) {
        this.form = Object.assign({}, this.scope)
        this.form.productId = this.scope.productName
        this.form.customerId = this.scope.azAccount
        this.old_state = Object.assign({}, this.form)
      }
      this.dialogFormVisible = true
    },
    async create (form1, form2) {
      let validation = true
      this.$refs[form1].validate((valid) => {
        if (!valid) {
          validation = false
        }
      })
      this.$refs[form2].validate((valid) => {
        if (!valid) {
          validation = false
        }
      })
      if (!validation) return

      if (this.loading) return
      this.loading = true

      let url = ORDERS_URL.replace('/search', '')
      let method = 'post'
      if (this.scope) {
        method = 'put'
        url = url + '/' + this.scope.id

        this.form.customerId = this.form.customerId === this.old_state.customerId ? this.scope.customerId : this.form.customerId
        this.form.productId = this.form.productId === this.old_state.productId ? this.scope.productId : this.form.productId
      }
      this.form.total = (this.form.cost) * (100 - this.form.extracts) / 100 - this.form.promotion
      const payload = this.form
      const response = await this.$services.do_request(method, url, payload)
      this.loading = false

      if (response.status === 200 || response.status === 202) {
        this.$message.success('Thành công')
        this.$emit('done_request')
        this.dialogFormVisible = false
      } else {
        this.$message.error('Thất bại')
      }
    },
    async get_customer_list (query) {
      if (query === '') return []
      if (this.customer.loading) return
      this.customer.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }
      if (query) {
        params['filter'] = `azAccount=='*${query}*'`
      }

      const response = await this.$services.do_request('get', CUSTOMER_TABLE_URL, params)
      this.customer.loading = false

      if (response.status === 200) {
        this.customer.list = response.data.content
      }
    },
    async get_product_list () {
      if (this.product.list.length) return
      if (this.product.loading) return
      this.product.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', PRODUCTS_URL, params)
      this.product.loading = false

      if (response.status === 200) {
        this.product.list = response.data
      }
    }
  }
}
</script>

<style lang="css">
</style>
