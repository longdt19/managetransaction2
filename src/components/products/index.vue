<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component @done_request="done_request"/>
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;" :style="navigation.includes('CREATE') ? '' : 'display: none'">
        <create-component
          style="text-align: right;"
          dialog-title="Tạo mới sản phẩm"
          :api-url="apiUrl"
          :items-create="product_items"
          method-request="post"
          @done_request="done_request"
          button-title="Tạo mới"
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <select-perpage-component />
    <table-component :data-table="data_table" :loading="loading" @done_request="done_request"/>
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
import {PRODUCTS_URL, PRODUCTS_TABLE_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'

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
      product_items: [
        {label: 'Mã sản phẩm', value: '', key: 'code', type: 'text'},
        {label: 'Tên sản phẩm', value: '', key: 'name', type: 'text'},
        {label: 'Mô tả', value: '', key: 'description', type: 'text'},
        {label: 'Tồn', value: '', key: 'inventory', type: 'text'}
      ],
      apiUrl: PRODUCTS_URL,
      loading: false,
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      data_table: [],
      navigation: []
    }
  },
  methods: {
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

      const response = await this.$services.do_request('get', PRODUCTS_TABLE_URL, params)

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
    this.navigation = this.common_data.navigation.PRODUCT
    if (!this.navigation) {
      this.$message.error('Bạn không có quyền hạn cho chức năng này')
      return
    }
    this.load_list()
  }
}
</script>
