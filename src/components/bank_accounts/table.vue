<template>
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

      <!-- <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
            {{ scope.row.currentPeriodFee }}
        </template>
      </el-table-column> -->
    </el-table>
  </template>

<script>
export default {
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
    }
  }
}
</script>
