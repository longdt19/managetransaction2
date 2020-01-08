<template>
  <section>
    <div style="margin-bottom: 20px">
      <el-button
        @click="acception.selected = true" v-if="acception.selected === false"
        :disabled="!this.common_data.navigation.TRANSACTION.includes('CONFIRM')"
      >Tiến hành duyệt đơn</el-button>
      <el-button type="danger" @click="acception.selected = false" v-if="acception.selected === true" icon="el-icon-circle-close">Hoàn tác</el-button>
      <el-button type="success"
        icon="el-icon-check"
        v-if="acception.selected === true"
        @click="accept_transaction"
        :loading="acception.loading"
      >
      Phê duyệt ({{acception.count}})
      </el-button>
    </div>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" v-if="acception.selected === true">
      </el-table-column>

      <el-table-column type="index" label="STT" width="50">
      </el-table-column>

      <el-table-column label="Ngày" width="100" header-align="center">
        <template slot-scope="scope">
          {{ date_from_timestamp(scope.row.time)}}
        </template>
      </el-table-column>

      <el-table-column label="Người giao dịch" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.traders}}
        </template>
      </el-table-column>

      <el-table-column label="Tên khách hàng" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.azAccount }}
        </template>
      </el-table-column>

      <el-table-column label="Nội dung" width="200" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.content}}
        </template>
      </el-table-column>

      <el-table-column label="Mã giao dịch" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Ngân hàng" width="150" header-align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="`Số dư trước: ${Number(scope.row.beforeBalance).toLocaleString()} - Số dư sau: ${Number(scope.row.afterBalance).toLocaleString()}`" placement="top-start">
            <el-button>{{ scope.row.bankName }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Loại" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="get_transaction_type(scope.row.type).tooltip" placement="right">
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

      <el-table-column label="Trạng thái" width="70" header-align="center" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="get_accept_type(scope.row.status).tooltip" placement="left">
            <el-button :type="get_accept_type(scope.row.status).type" circle size="mini">
              {{ get_accept_type(scope.row.status).display }}
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center"
              v-if="scope.row.allowUpdate && scope.row.status === 'MOI_TAO'"
            >
              <update-component
                v-if="navigation.includes('UPDATE') && !scope.row.isInternal"
                :scope="scope.row"
                button-size="mini"
                button-icon="el-icon-edit"
                @done_request="done_request"
              />
            </el-col>
            <el-col :span="12" style="text-align: center" v-if="navigation.includes('DELETE')">
              <delete-component
                v-if="navigation.includes('DELETE')"
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
import {TRANSACTION_URL, ACCEPTION_URL} from '@/constants/endpoints'
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
      apiUrl: TRANSACTION_URL,
      acception: {
        selected: false,
        count: 0,
        list: [],
        loading: false
      },
      non_acception: [],
      navigation: []
    }
  },
  methods: {
    async accept_transaction () {
      if (this.acception.loading) return
      this.acception.loading = true

      let transation_ids = []
      this.acception.list.forEach(item => {
        transation_ids.push(item.id)
      })
      const payload = {
        'ids': transation_ids
      }
      const response = await this.$services.do_request('post', ACCEPTION_URL, payload)
      if (response.status === 200) {
        this.acception.loading = false
        this.acception.selected = false
        this.acception.list = []
        let message = 'Duyệt thành công.'
        if (this.non_acception.length) {
          message = message + ` Có ${this.non_acception.length} giao dịch không được duyệt do chưa gán đơn hàng`
        }
        this.$message.success(message)
        this.$emit('done_request')
      }
    },
    handleSelectionChange (val) {
      if (val.length) {
        let last = val[val.length - 1]
        if (!last.orderId) {
          this.non_acception.push(val.pop(val.indexOf(last), 1))
        }
        this.acception.count = val.length
        this.acception.list = val
      }
    },
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
  },
  created () {
    this.navigation = this.common_data.navigation.TRANSACTION
  }
}
</script>
<style scoped>
.el-button--mini.is-circle {
  padding: 4px
}
</style>
