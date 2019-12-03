<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50">
      </el-table-column>

      <el-table-column label="Ngày" width="120">
        <template slot-scope="scope">
          {{ date_from_timestamp(scope.row.time)}}
        </template>
      </el-table-column>

      <el-table-column label="Người giao dịch" width="100">
        <template slot-scope="scope">
          {{ scope.row.traders}}
        </template>
      </el-table-column>

      <el-table-column label="Tên" width="120">
        <template slot-scope="scope">
          {{ scope.row.azAccount }}
        </template>
      </el-table-column>

      <el-table-column label="Nội dung" width="150">
        <template slot-scope="scope">
          {{ scope.row.content}}
        </template>
      </el-table-column>

      <el-table-column label="Mã giao dịch" width="120">
        <template slot-scope="scope">
          {{ scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Ngân hàng" width="120">
        <template slot-scope="scope">
          {{ scope.row.bankName }}
        </template>
      </el-table-column>

      <el-table-column label="Loại" width="120">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>

      <el-table-column label="Có" width="120">
        <template slot-scope="scope">
          {{ scope.row.type === 'NHAN_TIEN' ? scope.row.money : '' }}
        </template>
      </el-table-column>

      <el-table-column label="Nợ" width="120">
        <template slot-scope="scope">
          {{ scope.row.type === 'CHUYEN_TIEN' ? scope.row.money : '' }}
        </template>
      </el-table-column>

      <el-table-column label="Phí" width="120">
        <template slot-scope="scope">
          {{ scope.row.bankFee }}
        </template>
      </el-table-column>

      <el-table-column label="Lịch sử" width="120">
        <template slot-scope="scope">
          {{ scope.row.changeBalance }}
        </template>
      </el-table-column>

      <el-table-column label="Phê duyệt" width="120">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú">
        <template slot-scope="scope">
          {{ scope.row.note }}
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

    <div class="" style="text-align: right; margin-top: 30px">
      <el-pagination
        :page-size="10"
        :pager-count="11"
        layout="prev, pager, next"
        :total="6">
      </el-pagination>
    </div>
  </section>
</template>

<script>
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
    }
  }
}
</script>
