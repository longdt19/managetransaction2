<template>
<section>
  <el-button icon="el-icon-setting" type="warning" plain size=mini
    @click="open()"
  />

  <el-dialog title="Bảng phân quyền chức năng" :visible.sync="dialogTableVisible" width="850px">
    <el-table :data="dataTable" v-loading="loading">
      <el-table-column label="Tên" header-align="center" align="center" width="150px">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xem" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.GET_LIST"
            v-model="scope.row.role.GET_LIST.value"
            :active-value="scope.row.role.GET_LIST.active_value">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền thêm" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.CREATE"
            v-model="scope.row.role.CREATE.value"
            :active-value="scope.row.role.CREATE.active_value">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền sửa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.UPDATE"
            v-model="scope.row.role.UPDATE.value"
            :active-value="scope.row.role.UPDATE.active_value">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xóa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.DELETE"
            v-model="scope.row.role.DELETE.value"
            :active-value="scope.row.role.DELETE.active_value">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Xét duyệt" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.CONFIRM && scope.row.name === 'TRANSACTION'"
            v-model="scope.row.role.CONFIRM.value"
            :active-value="scope.row.role.CONFIRM.active_value">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Xét duyệt 24h" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.role.UPDATE_AFTER_24H && scope.row.name === 'ORDER'"
            v-model="scope.row.role.UPDATE_AFTER_24H.value"
            :active-value="scope.row.role.UPDATE_AFTER_24H.active_value">
          </el-switch>
        </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="update()" type="primary" :loading="loading">Cập nhật</el-button>
      <el-button @click="dialogTableVisible = false">Hủy bỏ</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import {FEATURE_URL, ROLE_URL, ROLE_FIND_FIELD_URL} from '@/constants/endpoints'

export default {
  props: {
    scope: {type: Object}
  },
  data () {
    return {
      dialogTableVisible: false,
      loading: false,
      dataTable: [],
      featureIds: []
    }
  },
  methods: {
    async update () {
      this.loading = true
      let id_list = []
      this.dataTable.forEach(item => {
        for (const i in item.role) {
          let value = item.role[i].value
          if (value) id_list.push(value)
        }
      })
      console.log('this.scope', this.scope)
      const payload = {
        'featureIds': id_list,
        'name': this.scope.name
      }
      console.log('payload', payload)
      let url = ROLE_URL + '/' + this.scope.id
      const response = await this.$services.do_request('put', url, payload)
      this.loading = false
      if (response.status === 202) {
        let role = this.common_data.role
        role.featureIds = id_list
        this.$store.commit('Common/role', role)
        this.$message.success('Cập nhật quyền thành công')
        this.$emit('done_request')
        this.dialogTableVisible = false
      }
    },
    async gen_data_table () {
      console.log('gen data')
      this.loading = true
      const params = {
        'page': 0,
        'size': 100,
        'sort': 'createdAt,desc'
      }
      const response = await this.$services.do_request('get', FEATURE_URL, params)
      this.loading = false
      let result = response.data.content

      let data = []
      let content = {}
      result.forEach(item => {
        content[item.screenId] = {}
      })
      result.forEach(item => {
        content[item.screenId][item.action] = {
          value: this.featureIds.includes(item.id) ? item.id : null,
          active_value: item.id
        }
      })
      for (const i in content) {
        data.push({
          name: i,
          role: content[i]
        })
      }
      this.dataTable = data
    },
    async get_role () {
      console.log('get data')
      this.loading = true
      console.log('scope', this.scope)
      const params = {
        field: 'name',
        value: this.scope.name
      }
      const response = await this.$services.do_request('get', ROLE_FIND_FIELD_URL, params)
      this.loading = false
      if (response.status === 200) {
        this.featureIds = response.data.featureIds
        this.gen_data_table()
      }
    },
    open () {
      this.get_role()
      this.dialogTableVisible = true
    }
  },
  created () {
    // this.get_list()
  }
}
</script>
