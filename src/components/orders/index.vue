<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
      <create-component
        @done_request="done_request"
        button-title="Tạo mới"
        button-type='primary'/>
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component :data-table="data_table" :loading="loading"/>
  </div>

</section>
</template>
<script>
import {ORDERS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
import CreateComponent from './create_or_update'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      customer_items: [
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'User', value: '', key: 'description', type: 'text'},
        {label: 'Sản phẩm', value: '', key: 'description', type: 'text'},
        {label: 'Loại', value: '', key: 'description', type: 'text'},
        {label: 'Nhập', value: '', key: 'description', type: 'text'},
        {label: 'Chiết khấu', value: '', key: 'description', type: 'text'},
        {label: 'Tổng', value: '', key: 'description', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'}
      ],
      apiUrl: ORDERS_URL,
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

      const response = await this.$services.do_request('get', ORDERS_URL, params)
      this.loading = false

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
