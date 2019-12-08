<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên" header-align="center" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Chú thích" header-align="center" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                dialog-title="Cập nhật"
                :api-url="apiUrl"
                :items-create="role_items"
                method-request="put"
                @done_request="done_request"
                button-size="mini"
                button-type=""
                button-icon="el-icon-edit"
                :scope="scope.row"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <!-- <delete-component
                :api-url="apiUrl"
                :scope="scope.row"
                @done_request="done_request"
              /> -->
            </el-col>
          </el-row>
        </template>
      </el-table-column>

    </el-table>

  </section>
</template>

<script>
import UpdateComponent from '@/components/common/create_or_update'
import DeleteComponent from '@/components/common/delete'
import {ROLE_URL} from '@/constants/endpoints'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      apiUrl: ROLE_URL.replace('/search', ''),
      role_items: [
        {label: 'Tên nhóm quyền', value: '', key: 'name', type: 'text'},
        {label: 'Chú thích', value: '', key: 'description', type: 'text'}
      ]
    }
  },
  methods: {
    done_request () {
      this.$emit('done_request')
    }
  }
}
</script>
