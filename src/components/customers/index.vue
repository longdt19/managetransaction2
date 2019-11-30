<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
        <create-component
          style="text-align: right;"
          dialog-title="Tạo mới khách hàng"
          :api-url="apiUrl"
          :items-create="customer_items"
          method-request="post"
          @done_request="done_request"
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component :data-table="data_table" :loading="loading" />
  </div>

</section>
</template>
<script>
import CreateComponent from '@/components/common/create_or_update'
import {CUSTOMER_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      customer_items: [
        {label: 'Tên khách hàng', value: '', key: 'name', type: 'text'},
        {label: 'User', value: '', key: 'azAccount', type: 'text'},
        {label: 'Số điện thoại', value: '', key: 'phone', type: 'text'},
        {label: 'Người quản lý', value: '', key: 'manager', type: 'text'},
        {label: 'ID Nhóm', value: '', key: 'groupId', type: 'text'},
        {label: 'Nợ trước', value: '', key: 'debtBefore', type: 'text'},
        {label: 'Địa chỉ', value: '', key: 'address', type: 'text'},
        {label: 'Tỉnh', value: '', key: 'province', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'note', type: 'text'}

      ],
      apiUrl: CUSTOMER_URL,
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 10
      },
      sorted_by: 'createdAt,desc'
    }
  },
  methods: {
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', CUSTOMER_URL, params)

      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
      }
    },
    done_request () {
      this.load_list()
    }
  },
  created () {
    this.load_list()
  }
}
</script>
