<template>
<section>
  <el-button :type="buttonType" :size="buttonSize"
    @click="open()" :icon="buttonIcon">{{buttonTitle}}</el-button>

<el-dialog title="Shipping address" :visible.sync="dialogFormVisible" style="text-align: left">
  <el-row :gutter="20">
    <el-col :span="12"><div>
      <el-form :model="form">
        <el-form-item label="Thời gian" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            default-time="12:00:00"
            :defaul-value="Date()"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Mã giao dịch" :label-width="formLabelWidth">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="Nội dung" :label-width="formLabelWidth">
          <el-input v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="Số tiền" :label-width="formLabelWidth">
          <el-input v-model="form.money"></el-input>
        </el-form-item>

        <el-form-item label="Phí ngân hàng" :label-width="formLabelWidth">
          <el-input v-model="form.bankFee"></el-input>
        </el-form-item>

        <el-form-item label="Loại" :label-width="formLabelWidth">
          <el-input v-model="form.type"></el-input>
        </el-form-item>

      </el-form>
    </div></el-col>

    <el-col :span="12"><div>
      <el-form :model="form">

        <el-form-item label="Ngân hàng" :label-width="formLabelWidth">
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

        <el-form-item label="Khách hàng" :label-width="formLabelWidth">
          <el-select v-model="form.customerId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_customer_list()"
            :loading="customers.loading"
          >
            <el-option
              v-for="b in customers.list"
              :key="b.id"
              :label="b.name"
              :value="b.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Đơn hàng" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div></el-col>
  </el-row>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
  </span>
</el-dialog>
</section>
</template>

<script>
import {
  BANK_ACCOUNTS_URL,
  CUSTOMER_URL
} from '@/constants/endpoints'

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
        bankFee: null,
        code: null,
        content: null,
        customerId: null,
        money: null,
        orderId: null,
        time: null,
        type: 'CHUYEN_TIEN'
      },
      formLabelWidth: '120px',
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 10
      },
      sorted_by: 'createdAt,desc',
      bank_accounts: {
        loading: false,
        list: []
      },
      customers: {
        loading: false,
        list: []
      }
    }
  },
  methods: {
    open () {
      this.dialogFormVisible = true
    },
    async get_customer_list () {
      if (this.customers.loading) return
      if (this.customers.list.length) return
      this.customers.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', CUSTOMER_URL, params)

      if (response.status === 200) {
        this.customers.loading = false

        this.customers.list = response.data.content
      }
    },
    async get_bank_account_list () {
      if (this.bank_accounts.loading) return
      if (this.bank_accounts.list.length) return
      this.bank_accounts.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', BANK_ACCOUNTS_URL, params)

      if (response.status === 200) {
        this.bank_accounts.loading = false

        this.bank_accounts.list = response.data.content
      }
    }
  }
}
</script>

<style lang="css">
</style>
