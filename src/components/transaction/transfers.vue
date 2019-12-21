<template>
<section>
  <el-button type="warning"
    @click="open()">Chuyển tiền</el-button>

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

        <el-form-item label="Mã chuyển tiền" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="Số tiền" :label-width="formLabelWidth" prop="money">
          <!-- <el-input v-model="form.money"></el-input> -->
          <vue-numeric separator="," v-model="form.money" value="0" class="vue-numeric-input"></vue-numeric>
        </el-form-item>

        <el-form-item label="Phí ngân hàng" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.bankFee"></el-input> -->
          <vue-numeric separator="," v-model="form.bankFee" value="0" class="vue-numeric-input"></vue-numeric>
        </el-form-item>

        <el-form-item label="Nội dung" :label-width="formLabelWidth">
          <el-input v-model="form.content"></el-input>
        </el-form-item>

      </el-form>
    </div></el-col>

    <el-col :span="12"><div>

      <el-form :model="form" :rules="rules" ref="form2">

        <el-form-item label="Người giao dịch" :label-width="'150px'" prop="traders">
          <el-input v-model="form.traders"></el-input>
        </el-form-item>

        <el-form-item label="Ngân hàng chuyển" :label-width="'150px'" prop="fromBankAccountId">
          <el-select v-model="form.fromBankAccountId" placeholder="Vui lòng chọn"
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

        <el-form-item label="Ngân hàng nhận" :label-width="'150px'" prop="toBankAccountId">
          <el-select v-model="form.toBankAccountId" placeholder="Vui lòng chọn"
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
  INTERNAL_TRANSACTION_URL
} from '@/constants/endpoints'
import {TRANSFER_RULES} from '@/constants/rules_input'
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
        money: 0,
        bankFee: 0,
        content: null,
        fromBankAccountId: null,
        toBankAccountId: null,
        traders: null
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
      old_state: {},
      rules: TRANSFER_RULES
    }
  },
  methods: {
    getDays,
    open () {
      this.form.time = this.getDays().to_date
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

      const payload = this.form
      const response = await this.$services.do_request(method, INTERNAL_TRANSACTION_URL, payload)
      this.loading = false

      if (response.status === 200 || response.status === 202) {
        this.$message.success('Thành công')
        this.$emit('done_request')
        this.dialogFormVisible = false
      } else {
        this.$message.error('Thất bại')
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
    }
  },
  created () {
  }
}
</script>

<style lang="css">
</style>
