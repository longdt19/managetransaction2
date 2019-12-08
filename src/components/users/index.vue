<template>
<section>
  <h2>User và phân quyền trong các mục</h2>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <!-- <search-component @done_request="done_request"/> -->
    </div></el-col>

    <el-col><div style="text-align: right;">
        <create-component
          style="text-align: right;"
          dialog-title="Tạo mới tài khoản"
          :api-url="apiUrl"
          :items-create="user_items"
          method-request="post"
          @done_request="done_request"
          button-title="Tạo mới"
        />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <select-perpage-component />
    <table-component :data-table="data_table" :loading="loading" @done_request="done_request" :user-items="user_items"/>
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
import {USERS_URL, USERS_TABLE_URL, ROLE_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
/* eslint-disable */
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
      user_items: [
        {label: 'Tên tài khoản', value: '', key: 'userName', type: 'text'},
        {label: 'Mật khẩu', value: '', key: 'password', type: 'text'},
        {label: 'Email', value: '', key: 'email', type: 'text'}
      ],
      apiUrl: USERS_URL,
      loading: false,
      data_table: [],
      sorted_by: 'createdAt,desc'
    }
  },
  methods: {
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.common_data.pagination.current_page,
        'size': this.common_data.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', USERS_TABLE_URL, params)

      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
        this.pagination = {
          current_page: response.data.pageable.pageNumber,
          size: response.data.pageable.pageSize,
          element_total: response.data.totalElements
        }
        this.$store.commit('Common/pagination', this.pagination)
      }
    },
    async load_roles_list () {
      const params = {
        'page': 0,
        'size': 100,
        'sort': 'createdAt,desc',
      }
      this.loading = true
      const response = await this.$services.do_request('get', ROLE_URL, params)
      if (response.status === 200) {
        this.loading = false

        // this.data_table = response.data.content
        let data = {
          label: 'Nhóm quyền', value: '', key: 'userRole', type: 'selection',
          selections:[]
        }
        response.data.content.forEach(item => {
          data.selections.push({
            id: item.name,
            name: item.name,
            type: item.name
          })
        })
        this.user_items.push(data)
        this.loading = false
      }
    },
    done_request () {
      this.load_list()
    }
  },
  watch: {
    'common_data.pagination.size' (val) {
      this.load_list()
    },
    'common_data.pagination.current_page' (val) {
      this.load_list()
    }
  },
  created () {
    const pagination = {
      size: 10,
      element_total: 0,
      current_page: 0
    }
    this.$store.commit('Common/pagination', pagination)
    this.load_list()
    this.load_roles_list()
  }
}
</script>
