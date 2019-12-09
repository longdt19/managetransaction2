<template>
  <section>
    <!-- <div style="margin-bottom: 20px">
      <el-button type="success" icon="el-icon-plus" circle size="mini"></el-button>
      <el-button type="warning" icon="el-icon-setting" circle size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
    </div> -->
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên user" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <el-table-column label="Nhóm quyền" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.userRole }}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <!-- <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                v-if="navigation.includes('UPDATE')"
                dialog-title="Cập nhật tài khoản"
                :api-url="apiUrl"
                :items-create="userItems"
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
          </el-row> -->
        </template>
      </el-table-column>

    </el-table>

  </section>
</template>

<script>
import UpdateComponent from '@/components/common/create_or_update'
import DeleteComponent from '@/components/common/delete'
import {USERS_URL} from '@/constants/endpoints'
// import UpdateRolesComponent from './roles'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false},
    userItems: {types: Array}
  },
  data () {
    return {
      apiUrl: USERS_URL,
      navigation: []
    }
  },
  methods: {
    done_request () {
      this.$emit('done_request')
    }
  },
  created () {
    this.navigation = this.common_data.navigation.USER
  }
}
</script>
<style scoped>
.el-button {
  border-radius: 50% !important
}

</style>
