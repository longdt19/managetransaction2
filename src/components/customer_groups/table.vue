<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên nhóm" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
              v-if="navigation.includes('UPDATE')"
                dialog-title="Cập nhật tài khoản ngân hàng"
                :api-url="apiUrl"
                :items-create="customer_items"
                method-request="put"
                @done_request="done_request"
                button-size="mini"
                button-type=""
                button-icon="el-icon-edit"
                :scope="scope.row"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <delete-component
                v-if="navigation.includes('DELETE')"
                :api-url="apiUrl"
                :scope="scope.row"
                @done_request="done_request"
              />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="" style="text-align: right; margin-top: 30px">
      <el-pagination
        :page-size="10"
        :pager-count="11"
        layout="prev, pager, next"
        :total="6">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import {CUSTOMER_GROUPS_URL} from '@/constants/endpoints'
import UpdateComponent from '@/components/common/create_or_update'
import DeleteComponent from '@/components/common/delete'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      customer_items: [
        {label: 'Tên nhóm', value: '', key: 'name', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'description', type: 'text'}
      ],
      apiUrl: CUSTOMER_GROUPS_URL,
      navigation: []
    }
  },
  methods: {
    done_request () {
      this.navigation = this.common_data.navigation.CUSTOMER_GROUP
      this.$emit('done_request')
    }
  }
}
</script>
