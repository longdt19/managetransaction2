<template>
<section v-if="navigation">
  <div style="text-align: right" :style="navigation.includes('CREATE') ? '' : 'display: none'">

    <div class="" style="display: inline-flex">
      <div class="" style="margin-right: 10px">
        <transfer-component
          @done_request="done_request"
        />
      </div>
      <div class="">
        <create-component
            @done_request="done_request"
            button-title="Tạo mới"
            button-type='primary'/>
      </div>
    </div>

  </div>

  <div style="justify-content: center; display: flex;">
    <h3 style="margin-right: 20px">Tổng gửi: <el-tag>{{ Number(totalSend).toLocaleString() }}</el-tag></h3>
    <h3>Tổng nhận: <el-tag type="success">{{ Number(totalReceive).toLocaleString() }}</el-tag></h3>
  </div>
  <search-component @done_request="done_request"/>

  <div style="margin-top: 30px">
    <div style="margin-bottom: -56px">
      <select-perpage-component />
    </div>
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
import {TRANSACTION_URL, TRANSACTION_STATISTIC} from '@/constants/endpoints'
import CreateComponent from './create_or_update'
import TableComponent from './table'
import SearchComponent from './search'
import TransferComponent from './transfers'

export default {
  components: {
    SearchComponent,
    TableComponent,
    CreateComponent,
    SelectPerpageComponent,
    PaginationComponent,
    TransferComponent
  },
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
      ],
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      navigation: [],
      totalReceive: 0,
      totalSend: 0
    }
  },
  methods: {
    async get_statistic () {
      const params = this.common_data.transaction_statistic
      const response = await this.$services.do_request('get', TRANSACTION_STATISTIC, params)
      if (response.status === 200) {
        this.totalReceive = response.data.totalReceive
        this.totalSend = response.data.totalSend
      }
    },
    async load_list () {
      if (this.loading) return
      this.loading = true

      let params = {
        'sort': this.sorted_by,
        'page': this.common_data.pagination.current_page,
        'size': this.common_data.pagination.size
      }
      if (this.common_data.rsql) {
        params['filter'] = this.common_data.rsql
      }

      const response = await this.$services.do_request('get', TRANSACTION_URL + '?sort=time,desc', params)
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
      this.get_statistic()
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
    this.navigation = this.common_data.navigation.TRANSACTION
    if (!this.navigation) {
      this.$message.error('Bạn không có quyền hạn cho chức năng này')
      return
    }
    this.$store.commit('Common/rsql', null)
    this.$store.commit('Common/transaction_statistic', null)
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
