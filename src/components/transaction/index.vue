<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
      <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
      <create-component
        style="text-align: right;"
        dialog-title="Tạo giao dịch"
        :items-create="transaction_items"
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
import TableComponent from './table'
import SearchComponent from './search'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      transaction_items: [
        {label: 'Ngày', value: '', key: 'name', type: 'text'},
        {label: 'Mã giao dịch', value: '', key: 'description', type: 'text'},
        {label: 'User', value: '', key: 'name', type: 'text'},
        {label: '', value: '', key: 'description', type: 'text'},
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'},
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'},
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'}
      ]
    }
  }
}
</script>
