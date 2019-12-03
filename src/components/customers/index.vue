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
    <table-component :data-table="data_table" :loading="loading" @done_request="done_request"/>
  </div>

</section>
</template>
<script>
import {CUSTOMER_TABLE_URL, CUSTOMER_GROUPS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
import CreateComponent from './create_or_update'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      customer_items: [
        {label: 'Tên khách hàng', value: '', key: 'name', type: 'text'},
        {label: 'User', value: '', key: 'azAccount', type: 'text'},
        {label: 'Số điện thoại', value: '', key: 'phone', type: 'text'},
        {label: 'Người quản lý', value: '', key: 'manager', type: 'text'},
        {label: 'Nợ trước', value: '', key: 'debtBefore', type: 'text'},
        {label: 'Địa chỉ', value: '', key: 'address', type: 'text'},
        {label: 'Tỉnh', value: '', key: 'province', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'note', type: 'text'}
      ],
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      customer_groups_list: []
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

      const response = await this.$services.do_request('get', CUSTOMER_TABLE_URL, params)
      this.loading = false
      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
        this.load_customer_groups_list()
      }
    },
    async load_customer_groups_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': 0,
        'size': 100,
        'sort': this.sorted_by
      }
      let url = CUSTOMER_GROUPS_URL + '/search'
      const response = await this.$services.do_request('get', url, params)
      this.loading = false

      if (response.status === 200) {
        this.loading = false
        let selections = []
        response.data.content.forEach(item => {
          selections.push(
            {'id': item.id, 'name': item.name}
          )
        })
        this.customer_items.push(
          {
            label: 'Nhóm',
            value: '',
            key: 'groupId',
            type: 'selection',
            selections: selections
          }
        )
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
