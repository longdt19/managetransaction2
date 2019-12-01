<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
        <create-component
          style="text-align: right;"
          dialog-title="Tạo mới tài khoản ngân hàng"
          :api-url="apiUrl"
          :items-create="bank_items"
          method-request="post"
          @done_request="done_request"
          button-title="Tạo mới"
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component :data-table="data_table" :loading="loading"/>
  </div>

</section>
</template>
<script>
import CreateComponent from '@/components/common/create_or_update'
import {BANK_ACCOUNTS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
/* eslint-disable */
export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      bank_items: [
        {label: 'Tên ngân hàng', value: '', key: 'bankName', type: 'text'},
        {label: 'Tên chủ khoản', value: '', key: 'userName', type: 'text'},
        {label: 'Số tài khoản', value: '', key: 'accountNumber', type: 'text'},
        {label: 'Chi nhánh', value: '', key: 'branch', type: 'text'},
        {label: 'Số dư đầu', value: '', key: 'balances', type: 'text'},
        {
          label: 'test select tion',
          value: '',
          key: 'selection',
          type: 'selection',
          selections: [{id: 'id', name: 'name'}]
        }
      ],
      apiUrl: BANK_ACCOUNTS_URL,
      loading: false,
      data_table: [
        {
          "id": "418d24ae-53fe-4088-820b-3ed8ce0d772d",
          "createdAt": 1574782637129,
          "createdBy": "SYSTEM",
          "updatedAt": 1574792088336,
          "updatedBy": "SYSTEM",
          "userName": "Trần Thanh Long",
          "bankName": "Viecombank",
          "accountNumber": "1222222222",
          "branch": "Vietcombank Hà Nội",
          "balances": 1100000,
          "currentBalances": null,
          "previousPeriodFee": 0,
          "previousPeriodSend": 0,
          "previousPeriodReceive": 0,
          "currentPeriodFee": 0,
          "currentPeriodSend": 0,
          "currentPeriodReceive": 0,
          "finalBalances": 1100000
        }
      ],
      pagination: {
        page: 0,
        size: 10
      },
      sorted_by: 'createdAt,desc'
    }
  },
  methods: {
    // async load_list () {
    //   if (this.loading) return
    //   this.loading = true

    //   const params = {
    //     'page': this.pagination.page,
    //     'size': this.pagination.size,
    //     'sort': this.sorted_by
    //   }

    //   const response = await this.$services.do_request('get', BANK_ACCOUNTS_URL, params)

    //   if (response.status === 200) {
    //     this.loading = false

    //     this.data_table = response.data.content
    //   }
    // },
    done_request () {
      console.log('done request')
      // this.load_list()
    }
  },
  created () {
    // this.load_list()
  }
}
</script>
