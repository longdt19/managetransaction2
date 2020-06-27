<template>
<section>
  <div style="text-align: right;">
    <create-component
      @done_request="done_request"
      button-title="Tạo mới"
      button-type='primary'
    />
  </div>

  <el-row :gutter="10">
    <el-col :span="6">
      <h3 style="margin-right: 20px">Tổng:</h3>
      <el-tag>{{ Number(total).toLocaleString() }}</el-tag>
    </el-col>
    <el-col :span="6">
      <h3 style="margin-right: 20px">Nhập:</h3>
      <el-tag type="success">{{ Number(totalCost).toLocaleString() }}</el-tag>
    </el-col>
    <el-col :span="6">
      <h3 style="margin-right: 20px">Có:</h3>
      <el-tag type="warning">{{ Number(totalPaidExport).toLocaleString() }}</el-tag>
    </el-col>
    <el-col :span="6">
      <h3 style="margin-right: 20px">Nợ:</h3>
      <el-tag type="danger">{{ Number(totalPaidImport).toLocaleString() }}</el-tag>
    </el-col>
  </el-row>

  <search-component @done_request="done_request"/>

  <div style="margin-top: 30px">
    <select-perpage-component />
    <table-component :data-table="data_table" :loading="loading" @done_request="done_request"/>
    <div class="" style="text-align: right; margin-top: 30px">
      <pagination-component />
    </div>
  </div>

</section>
</template>
<script>
import SelectPerpageComponent from '@/components/common/select_perpage'
import PaginationComponent from '@/components/common/pagination'

import {ORDERS_URL, ORDER_STATISTIC} from '@/constants/endpoints'
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
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      navigation: [],
      totalPaidExport: null,
      totalPaidImport: null,
      totalCost: null,
      total: null
    }
  },
  methods: {
    async get_statistic () {
      const params = this.common_data.order_statistic
      const response = await this.$services.do_request('get', ORDER_STATISTIC + '?sort=time,desc', params)
      if (response.status === 200) {
        this.totalPaidExport = response.data.totalPaidExport
        this.totalPaidImport = response.data.totalPaidImport
        this.totalCost = response.data.totalCost
        this.total = response.data.total
      }
    },
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'sort': this.sorted_by,
        'page': this.common_data.pagination.current_page,
        'size': this.common_data.pagination.size
      }
      if (this.common_data.rsql) {
        params['filter'] = this.common_data.rsql
      }

      const response = await this.$services.do_request('get', ORDERS_URL + '?sort=time,desc', params)
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
      this.get_statistic()
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
    this.navigation = this.common_data.navigation.ORDER
    if (!this.navigation) {
      this.$message.error('Bạn không có quyền hạn cho chức năng này')
      return
    }
    this.$store.commit('Common/rsql', null)
    const pagination = {
      size: 10,
      element_total: 0,
      current_page: 0
    }
    this.$store.commit('Common/pagination', pagination)
    this.load_list()
    this.get_statistic()
  }
}
</script>
