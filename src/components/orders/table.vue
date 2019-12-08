<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50"  header-align="center">
      </el-table-column>

      <el-table-column label="Ngày" width="120"  header-align="center">
        <template slot-scope="scope">
          {{ date_from_timestamp(scope.row.time)}}
        </template>
      </el-table-column>

      <el-table-column label="Mã giao dịch" width="150" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="User" width="180" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.azAccount}}
        </template>
      </el-table-column>

      <el-table-column label="Tên sản phẩm" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.productName}}
        </template>
      </el-table-column>

      <el-table-column label="Loại" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tag :type="get_order_type(scope.row.type).type">{{ get_order_type(scope.row.type).key}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Nhập" width="120" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.cost).toLocaleString()}}
        </template>
      </el-table-column>

      <el-table-column label="%" width="80" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.extracts}}
        </template>
      </el-table-column>

      <el-table-column label="Tổng" width="120" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.total).toLocaleString()}}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Thanh toán    **********************************
      ********************************************************************** -->
      <el-table-column label="Thanh toán" header-align="center">
        <el-table-column label="Có" width="120" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.owed).toLocaleString()}}
          </template>
        </el-table-column>

        <el-table-column label="Nợ" width="120" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.owed).toLocaleString()}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Hình thức" width="120" header-align="center">
        <template slot-scope="scope" v-if="scope.row.transactions.length">
          {{ scope.row.transactions[0]['bankName'] }}
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.note}}
        </template>
      </el-table-column>

      <el-table-column label="Thao Tác" width="120">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                @done_request="done_request"
                :scope="scope.row"
                button-size="mini"
                button-icon="el-icon-edit"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <!-- <delete-component
                :api-url="apiUrl.replace('/search', '')"
                :scope="scope.row"
                @done_request="done_request"
              /> -->
            </el-col>
          </el-row>
        </template>
      </el-table-column>

    </el-table>

  </section>
</template>

<script>
import date_from_timestamp from '@/utils/date_from_timestamp'
import {ORDER_TYPE_LIST} from '@/constants'
import DeleteComponent from '@/components/common/delete'
import {ORDERS_URL} from '@/constants/endpoints'
import UpdateComponent from './create_or_update'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      apiUrl: ORDERS_URL
    }
  },
  methods: {
    date_from_timestamp,
    done_request () {
      this.$emit('done_request')
    },
    get_order_type (value) {
      let type = null
      ORDER_TYPE_LIST.forEach(item => {
        if (item.value === value) {
          type = item
        }
      })
      return type
    }
  }
}
</script>
