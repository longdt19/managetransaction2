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
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component />
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
        {label: 'Nhóm', value: '', key: 'groupId', type: 'text'},
        {label: 'Nợ trước', value: '', key: 'debtBefore', type: 'text'},
        {label: 'Địa chỉ', value: '', key: 'address', type: 'text'},
        {label: 'Tỉnh', value: '', key: 'province', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'note', type: 'text'}

      ],
      apiUrl: CUSTOMER_URL
    }
  }
}
</script>
