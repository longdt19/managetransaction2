<template>
    <el-table :data="dataTable" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Thông tin khách hàng" width="120" header-align="center">
        <el-table-column label="Tên khách hàng" width="120" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column label="User" width="120" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.azAccount}}
          </template>
        </el-table-column>

        <el-table-column label="Số điện thoại" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.phone}}
          </template>
        </el-table-column>

        <el-table-column label="Người quản lý" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.manage}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Nhóm" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.groupName}}
        </template>
      </el-table-column>

      <el-table-column label="Nợ trước" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.debtBefore}}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn đầu kỳ    **********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Nhập" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodImport}}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodExport}}
          </template>
        </el-table-column>

        <el-table-column label="Thanh toán" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodPaid}}
          </template>
        </el-table-column>

        <el-table-column label="Tổng" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodTotal}}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn trong kỳ    ********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Nhập" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodImport}}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodExport}}
          </template>
        </el-table-column>

        <el-table-column label="Thanh toán" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodPaid}}
          </template>
        </el-table-column>

        <el-table-column label="Tổng" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodTotal}}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->
      <el-table-column label="Tổng" width="100" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.total}}
        </template>
      </el-table-column>

      <!-- <el-table-column label="Nợ" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.}}
        </template>
      </el-table-column> -->

      <el-table-column label="Địa chỉ" header-align="center">
        <el-table-column label="Thôn-xã" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodTotal}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.currentPeriodTotal}}
        </template>
      </el-table-column>
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
