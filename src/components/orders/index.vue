<template>
<section>
  <el-row :gutter="50">
    <el-col :span="12"><div class="grid-content bg-purple">
        <search-component />
    </div></el-col>

    <el-col :span="12"><div style="text-align: right;">
      <create-component
        @done_request="done_request"
        button-title="Tạo mới"
        button-type='primary'
      />
    </div></el-col>

  </el-row>

  <div style="margin-top: 30px">
    <table-component :data-table="data_table" :loading="loading" @done_request="done_request"/>
  </div>

</section>
</template>
<script>
import {ORDERS_URL} from '@/constants/endpoints'
import SearchComponent from './search'
import TableComponent from './table'
import CreateComponent from './create_or_update'

export default {
  components: {SearchComponent, TableComponent, CreateComponent},
  data () {
    return {
      loading: false,
      data_table: [],
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc'
    }
  },
  methods: {
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', ORDERS_URL, params)
      this.loading = false

      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
      }
    },
    done_request () {
      this.load_list()
    }
  },
  created () {
    this.load_list()
  }
}
</script>
