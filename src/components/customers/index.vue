<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component @done_request="done_request"/>
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
        <create-component
          @done_request="done_request"
          button-title="Tạo mới"
          button-type='primary'/>
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <select-perpage-component />
    <table-component
      @done_request="done_request"
      :data-table="data_table"
      :loading="loading"
    />
    <div class="" style="text-align: right; margin-top: 30px">
      <pagination-component />
    </div>
  </div>

</section>
</template>
<script>
import {CUSTOMER_TABLE_URL} from '@/constants/endpoints'
import SelectPerpageComponent from '@/components/common/select_perpage'
import PaginationComponent from '@/components/common/pagination'

import SearchComponent from './search'
import TableComponent from './table'
import CreateComponent from './create_or_update'

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
      loading: false,
      data_table: [],
      sorted_by: 'createdAt,desc',
      customer_groups_list: []
    }
  },
  methods: {
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.common_data.pagination.current_page,
        'size': this.common_data.pagination.size,
        'sort': this.sorted_by,
        'fromTime': this.common_data.search.from_date,
        'toTime': this.common_data.search.to_date
      }

      const response = await this.$services.do_request('get', CUSTOMER_TABLE_URL, params)
      this.loading = false
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
  }
}
</script>
