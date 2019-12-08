<template>
  <section>
    <el-row :gutter="50">
    <el-col :span="3"><div class="grid-content bg-purple">
      <span class="">Từ ngày</span>
      <el-date-picker
        type="date"
        placeholder="Từ ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="date.from_date"
      >
      </el-date-picker>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple-light">
      <span class="">Đến ngày</span>
      <el-date-picker
        type="date"
        placeholder="Đến ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="date.to_date"
      >
      </el-date-picker>
    </div></el-col>
  </el-row>

  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Người giao dịch</span>
      <el-input v-model="form.traders.value" clearable/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Tên khách hàng</span>
      <el-input v-model="form.azAccount.value" clearable/>
    </div></el-col>

    <el-col :span="4"><div class="grid-content bg-purple">
      <span>Nội dung</span>
      <el-input v-model="form.content.value" clearable/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Mã giao dịch</span>
      <el-input v-model="form.code.value" clearable/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Ngân hàng</span>
      <el-input v-model="form.bankName.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Phê duyệt</span>
      <el-select v-model="status">
        <el-option
          v-for="item in accept_types"
          :key="item.tooltip"
          :label="item.tooltip"
          :value="item.value">
        </el-option>
      </el-select>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Tìm kiếm</span>
      <br/>
      <el-button icon="el-icon-search" @click="search()"></el-button>
    </div></el-col>
  </el-row>
  </section>
</template>

<script>
import getDays from '@/utils/day'
import {ACCEPT_TYPE_LIST} from '@/constants'

export default {
  data () {
    return {
      date: {
        from_date: null,
        to_date: null
      },
      form: {
        traders: {key: 'traders', value: null},
        azAccount: {key: 'customer.azAccount', value: null},
        content: {key: 'content', value: null},
        code: {key: 'code', value: null},
        bankName: {key: 'bankAccount.bankName', value: null},
        status: {key: 'status', value: null}
      },
      status: null,
      accept_types: ACCEPT_TYPE_LIST
    }
  },
  methods: {
    search () {
      let params = ''
      for (const i in this.form) {
        if (this.form[i].value) {
          params = params + `${this.form[i].key}=='*${this.form[i].value}*';`
        }
      }
      if (this.date.from_date) {
        params = params + `time>=${this.date.from_date};`
      }
      if (this.date.to_date) {
        params = params + `time<=${this.date.to_date};`
      }
      if (this.status) {
        params = params + `status==${this.status};`
      }
      params = params.replace(/;$/, '')
      console.log('params', params)
      this.$store.commit('Common/rsql', params)
      this.$emit('done_request')
    }
  },
  watch: {
    ...['date.from_date', 'date.to_date', 'form.traders.value', 'form.azAccount.value',
      'form.content.value', 'form.code.value', 'form.bankName.value', 'status.value'
    ].reduce((watchers, key) => ({
      ...watchers,
      [key] (newVal, oldVal) {
        if (!newVal) this.search()
      }
    }), {})
  },
  created () {
    let day = getDays()
    this.from_date = day.from_date
    this.to_date = day.to_date
  }
}
</script>
