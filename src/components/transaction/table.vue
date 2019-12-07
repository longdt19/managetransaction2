<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50">
      </el-table-column>

      <el-table-column label="Ngày" width="90" header-align="center">
        <template slot-scope="scope">
          {{ date_from_timestamp(scope.row.time)}}
        </template>
      </el-table-column>

      <el-table-column label="Người giao dịch" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.traders}}
        </template>
      </el-table-column>

      <el-table-column label="Tên" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.azAccount }}
        </template>
      </el-table-column>

      <el-table-column label="Nội dung" width="150" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.content}}
        </template>
      </el-table-column>

      <el-table-column label="Mã giao dịch" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Ngân hàng" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.bankName }}
        </template>
      </el-table-column>

      <el-table-column label="Loại" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="get_transaction_type(scope.row.type).tooltip" placement="left">
            <el-tag :type="get_transaction_type(scope.row.type).type">{{ get_transaction_type(scope.row.type).key }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Có" width="110" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.type === 'NHAN_TIEN' ? Number(scope.row.money).toLocaleString() : '' }}
        </template>
      </el-table-column>

      <el-table-column label="Nợ" width="110" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.type === 'CHUYEN_TIEN' ? Number(scope.row.money).toLocaleString() : '' }}
        </template>
      </el-table-column>

      <el-table-column label="Phí" width="110" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.bankFee).toLocaleString() }}
        </template>
      </el-table-column>

      <el-table-column label="Lịch sử" width="110" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.changeBalance).toLocaleString() }}
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>

      <el-table-column label="Duyệt" width="70" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="get_accept_type(scope.row.status).tooltip" placement="left">
            <el-button :type="get_accept_type(scope.row.status).type" icon="el-icon-check" circle size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                :scope="scope.row"
                button-size="mini"
                button-icon="el-icon-edit"
                @done_request="done_request"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <delete-component
                :api-url="apiUrl.replace('/search', '')"
                :scope="scope.row"
                @done_request="done_request"
              />
            </el-col>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
  </section>
</template>

<script>
import {
  TRANSACTION_TYPE_LIST,
  ACCEPT_TYPE_LIST
} from '@/constants'
import date_from_timestamp from '@/utils/date_from_timestamp'
import {TRANSACTION_URL} from '@/constants/endpoints'
import DeleteComponent from '@/components/common/delete'
import UpdateComponent from './create_or_update'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      apiUrl: TRANSACTION_URL
    }
  },
  methods: {
    date_from_timestamp,
    done_request () {
      this.$emit('done_request')
    },
    get_transaction_type (value) {
      return this.get_types(TRANSACTION_TYPE_LIST, value)
    },
    get_accept_type (value) {
      return this.get_types(ACCEPT_TYPE_LIST, value)
    },
    get_types (constant, value) {
      let type = null
      constant.forEach(element => {
        if (element.value === value) {
          type = element
        }
      })
      return type
    }
  }
}
</script>
<style scoped>
.el-button--mini.is-circle {
  padding: 4px
}
</style>
