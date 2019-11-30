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
import {CUSTOMER_GROUPS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      customer_items: [
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'}
      ],
      apiUrl: CUSTOMER_GROUPS_URL
    }
  }
}
</script>
