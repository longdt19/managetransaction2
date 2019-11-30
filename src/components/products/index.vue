<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
        <create-component
          style="text-align: right;"
          dialog-title="Tạo mới sản phẩm"
          :api-url="apiUrl"
          :items-create="product_items"
          method-request="post"
          @done_request="done_request"
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component ref="table_component"/>
  </div>

</section>
</template>
<script>
import CreateComponent from '@/components/common/create_or_update'
import {PRODUCTS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      product_items: [
        {label: 'Mã sản phẩm', value: '', key: 'code', type: 'text'},
        {label: 'Tên sản phẩm', value: '', key: 'description', type: 'text'},
        {label: 'Mô tả', value: '', key: 'inventory', type: 'text'},
        {label: 'Tồn', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'name', type: 'text'}
      ],
      apiUrl: PRODUCTS_URL,
      loading: false,
      pagination: {
        page: 0,
        size: 10
      },
      sorted_by: 'createdAt,desc',
      data_table: []
    }
  },
  methods: {
    done_request () {
      this.$refs.table_component.load_list()
    }
  },
  created () {
  }
}
</script>
