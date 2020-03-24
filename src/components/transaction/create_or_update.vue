<template>
<section>
  <el-button :type="buttonType" :size="buttonSize"
    @click="open()" :icon="buttonIcon">{{buttonTitle}}</el-button>

<el-dialog :title="this.scope ? 'Chỉnh sửa' : 'Tạo mới'" :visible.sync="dialogFormVisible" style="text-align: left">
  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="12"><div>
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

        <el-form-item label="Mã giao dịch" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="Nội dung" :label-width="formLabelWidth">
          <el-input v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="Số tiền" :label-width="formLabelWidth" prop="money">
          <!-- <el-input v-model="form.money"></el-input> -->
          <vue-numeric separator="," v-model="form.money" value="0" class="vue-numeric-input"></vue-numeric>
        </el-form-item>

        <el-form-item label="Phí ngân hàng" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.bankFee"></el-input> -->
          <vue-numeric separator="," v-model="form.bankFee" value="0" class="vue-numeric-input"></vue-numeric>
        </el-form-item>

        <el-form-item label="Loại" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio label="CHUYEN_TIEN">Chuyển tiền</el-radio>
            <el-radio label="NHAN_TIEN">Nhận tiền</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
    </div></el-col>

    <el-col :span="12"><div>
      <el-form :model="form" :rules="rules" ref="form2">

        <el-form-item label="Người giao dịch" :label-width="formLabelWidth" prop="traders">
          <el-input v-model="form.traders"></el-input>
        </el-form-item>

        <el-form-item label="Ghi chú" :label-width="formLabelWidth">
          <el-input v-model="form.note"></el-input>
        </el-form-item>

        <el-form-item label="Ngân hàng" :label-width="formLabelWidth" prop="bankAccountId">
          <el-select v-model="form.bankAccountId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_bank_account_list()"
            :loading="bank_accounts.loading"
          >
            <el-option
              v-for="b in bank_accounts.list"
              :key="b.id"
              :label="b.bankName"
              :value="b.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Khách hàng" :label-width="formLabelWidth" prop="customerId">
          <el-select v-model="form.customerId" placeholder="Vui lòng chọn"
            filterable
            remote
            :remote-method="get_customer_list"
            :loading="customers.loading"
            @change="form.orderId = null"
            reserve-keyword
          >
            <el-option
              v-for="b in customers.list"
              :key="b.id"
              :label="b.azAccount"
              :value="b.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Đơn hàng" :label-width="formLabelWidth" prop="orderId" v-if="form.customerId">
          <el-select v-model="form.orderId" placeholder="Vui lòng chọn"
            filterable
            remote
            :remote-method="get_order_list_search"
            :loading="order.loading"
          >
            <el-option
              v-for="o in order.list"
              :key="o.id"
              :label="o.code"
              :value="o.id"
            >
              <span style="float: left">{{ o.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ date_from_timestamp(o.createdAt) }}</span>
            </el-option>
          </el-select>
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
import {
  BANK_ACCOUNTS_URL,
  CUSTOMER_TABLE_URL,
  TRANSACTION_URL,
  ORDERS_URL
} from '@/constants/endpoints'
import {TRANSACTION_TYPE_LIST} from '@/constants'
import {TRANSACTION_RULES} from '@/constants/rules_input'
import getDays from '@/utils/day'
import date_from_timestamp from '@/utils/date_from_timestamp'

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
        bankAccountId: null,
        bankFee: 0,
        code: null,
        content: null,
        customerId: null,
        money: 0,
        orderId: null,
        time: null,
        type: 'CHUYEN_TIEN',
        traders: null,
        note: null
      },
      formLabelWidth: '120px',
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      bank_accounts: {
        loading: false,
        list: []
      },
      customers: {
        loading: false,
        list: []
      },
      order: {
        loading: false,
        list: []
      },
      transaction_type_list: TRANSACTION_TYPE_LIST,
      old_state: {},
      rules: TRANSACTION_RULES
    }
  },
  watch: {
    'form.customerId' (value) {
      this.get_order_list_complete()
    }
  },
  methods: {
    date_from_timestamp,
    getDays,
    open () {
      this.form.time = this.getDays().to_date
      if (this.scope) {
        this.form = Object.assign({}, this.scope)
        this.form.bankAccountId = this.scope.bankName
        this.form.customerId = this.scope.azAccount
        this.form.orderId = this.scope.orderCode
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
      let method = 'post'
      let url = TRANSACTION_URL.replace('/search', '')

      if (this.scope) {
        method = 'put'
        url = url + '/' + this.scope.id

        this.form.bankAccountId = this.form.bankAccountId === this.old_state.bankAccountId ? this.scope.bankAccountId : this.form.bankAccountId
        this.form.customerId = this.form.customerId === this.old_state.customerId ? this.scope.customerId : this.form.customerId
        this.form.orderId = this.form.orderId === this.old_state.orderId ? this.scope.orderId : this.form.orderId
      }

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
      if (this.customers.loading) return
      this.customers.loading = true
      let params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }
      if (query) {
        params['filter'] = `azAccount=='*${query}*'`
      }

      const response = await this.$services.do_request('get', CUSTOMER_TABLE_URL, params)

      if (response.status === 200) {
        this.customers.loading = false
        query = ''
        this.customers.list = response.data.content
      }
    },
    async get_bank_account_list () {
      if (this.bank_accounts.loading) return
      this.bank_accounts.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', BANK_ACCOUNTS_URL, params)

      if (response.status === 200) {
        this.bank_accounts.loading = false

        this.bank_accounts.list = response.data
      }
    },
    async get_order_list_complete () {
      if (this.order.loading) return
      this.order.loading = true

      let params = {
        'filter': `customer.id=='${this.form.customerId}'`,
        'sort': this.sorted_by,
        'size': 1000,
        'page': 0
      }

      const response = await this.$services.do_request('get', ORDERS_URL, params)
      if (response.status === 200) {
        this.order.loading = false
        this.order.list = response.data.content
      }
    },
    async get_order_list_search (query) {
      if (this.order.loading) return
      this.order.loading = true

      let params = {
        'customerId': this.form.customerId,
        'filter': `code=='*${query}*'`
      }

      const response = await this.$services.do_request('get', ORDERS_URL, params)
      if (response.status === 200) {
        this.order.loading = false
        this.order.list = response.data.content
      }
    }
  },
  created () {
  }
}
</script>

<style lang="css">
</style>
