<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên ngân hàng" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.bankName }}
        </template>
      </el-table-column>

      <el-table-column label="Tên chủ tài khoản" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <el-table-column label="Số tài khoản" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.accountNumber }}
        </template>
      </el-table-column>

      <el-table-column label="Chi nhánh" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.branch }}
        </template>
      </el-table-column>

      <el-table-column label="Số dư đầu" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.balances }}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn đầu kỳ    **********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Chuyển đến" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodReceive }}
          </template>
        </el-table-column>

        <el-table-column label="Chuyển đi" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodSend }}
          </template>
        </el-table-column>

        <el-table-column label="Phí" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodFee }}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn trong kỳ    ********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Chuyển đến" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodReceive }}
          </template>
        </el-table-column>

        <el-table-column label="Chuyển đi" width="100" header-align="center">
          <template slot-scope="scope">
              {{ scope.row.currentPeriodSend }}
          </template>
        </el-table-column>

        <el-table-column label="Phí" width="100" header-align="center">
          <template slot-scope="scope">
              {{ scope.row.currentPeriodFee }}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->
      <el-table-column label="Số dư cuối" width="100" header-align="center">
        <template slot-scope="scope">
            {{ scope.row.finalBalances }}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                dialog-title="Cập nhật tài khoản ngân hàng"
                :api-url="apiUrl"
                :items-create="bank_items"
                method-request="put"
                @done_request="done_request"
                button-size="mini"
                button-type=""
                button-icon="el-icon-edit"
                :scope="scope.row"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <delete-component
                :api-url="apiUrl"
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
import UpdateComponent from '@/components/common/create_or_update'
import DeleteComponent from '@/components/common/delete'
import {BANK_ACCOUNTS_URL} from '@/constants/endpoints'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      apiUrl: BANK_ACCOUNTS_URL,
      bank_items: [
        {label: 'Tên ngân hàng', value: '', key: 'bankName', type: 'text'},
        {label: 'Tên chủ khoản', value: '', key: 'userName', type: 'text'},
        {label: 'Số tài khoản', value: '', key: 'accountNumber', type: 'text'},
        {label: 'Chi nhánh', value: '', key: 'branch', type: 'text'},
        {label: 'Số dư đầu', value: '', key: 'balances', type: 'text'}
      ]
    }
  },
  methods: {
    done_request () {
      this.$emit('done_request')
    }
  }
}
</script>
