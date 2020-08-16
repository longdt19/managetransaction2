<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component @done_request="done_request"/>
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;" :style="navigation.includes('CREATE') ? '' : 'display: none'">
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
    <select-perpage-component />
    <table-component
      :data-table="data_table" :loading="loading" @done_request="done_request"
      :bankItems="bank_items"/>
    <div class="" style="text-align: right; margin-top: 30px">
      <pagination-component />
    </div>
  </div>

</section>
</template>
<script>
import SelectPerpageComponent from '@/components/common/select_perpage'
import PaginationComponent from '@/components/common/pagination'

import CreateComponent from '@/components/common/create_or_update'
import {BANK_ACCOUNTS_URL, BANK_ACCOUNTS_TABLE_URL, USERS_TABLE_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
/* eslint-disable */
export default {
  components: {
    SearchComponent,
    TableComponent,
    CreateComponent,
    SelectPerpageComponent,
    PaginationComponent
  },
  data () {
    return {
      bank_items: [
        {label: 'Tên ngân hàng', value: '', key: 'bankName', type: 'text'},
        {label: 'Tên chủ khoản', value: '', key: 'userName', type: 'text'},
        {label: 'Số tài khoản', value: '', key: 'accountNumber', type: 'text'},
        {label: 'Chi nhánh', value: '', key: 'branch', type: 'text'},
        {label: 'Số dư đầu', value: '', key: 'balances', type: 'text'}
      ],
      apiUrl: BANK_ACCOUNTS_URL,
      loading: false,
      data_table: [],
      sorted_by: 'createdAt,desc',
      navigation: []
    }
  },
  methods: {
    async load_users () {
      const params = {
        'page': 0,
        'size': 1000,
        'sort': this.sorted_by
      }
      const response = await this.$services.do_request('get', USERS_TABLE_URL, params)
      if (response.status === 200) {
        let bank_data = {label: 'Admin', value: '', key: 'admin', type: 'selection', selections: []}
        response.data.content.forEach(item => {
          bank_data.selections.push({
            id: item.userName,
            name: item.userName,
            type: item.userName
          })
        })
        this.bank_items.push(bank_data)
      }
    },
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.common_data.pagination.current_page,
        'size': this.common_data.pagination.size,
        'sort': this.sorted_by,
        'fromTime': this.common_data.search.from_date,
        'toTime': this.common_data.search.to_date
      }

      const response = await this.$services.do_request('get', BANK_ACCOUNTS_TABLE_URL, params)
      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
        this.pagination = {
          current_page: response.data.pageable.pageNumber,
          size: response.data.pageable.pageSize,
          element_total: response.data.totalElements
        }
        this.$store.commit('Common/pagination', this.pagination)
      }
    },
    done_request () {
      this.load_list()
    }
  },
  watch: {
    'common_data.pagination.size' (val) {
      this.load_list()
    },
    'common_data.pagination.current_page' (val) {
      this.load_list()
    }
  },
  created () {
    this.navigation = this.common_data.navigation.BANK_ACCOUNT
    if (!this.navigation) {
      this.$message.error('Bạn không có quyền hạn cho chức năng này')
      return
    }
    const pagination = {
      size: 10,
      element_total: 0,
      current_page: 0
    }
    this.$store.commit('Common/pagination', pagination)
    this.load_list()
    this.load_users()
  }
}
</script>
