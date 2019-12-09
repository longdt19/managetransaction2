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
                v-if="navigation.includes('UPDATE')"
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
              <roles-component
                v-if="navigation.includes('UPDATE')"
                :scope="scope.row"/>
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
import {ROLE_TABLE_URL} from '@/constants/endpoints'
import RolesComponent from './roles'
export default {
  components: {UpdateComponent, DeleteComponent, RolesComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      apiUrl: ROLE_TABLE_URL.replace('/search', ''),
      role_items: [
        {label: 'Tên nhóm quyền', value: '', key: 'name', type: 'text'},
        {label: 'Chú thích', value: '', key: 'description', type: 'text'}
      ],
      navigation: []
    }
  },
  methods: {
    done_request () {
      this.$emit('done_request')
    }
  },
  created () {
    this.navigation = this.common_data.navigation.ROLE
  }
}
</script>
