<template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50">
      </el-table-column>

      <el-table-column label="Ngày" width="100">
      </el-table-column>

      <el-table-column label="Người giao dịch" width="80">
        <template slot-scope="scope">
          {{ scope.row.createdBy}}
        </template>
      </el-table-column>

      <el-table-column label="Tên" >
        <template slot-scope="scope">
          {{ scope.row.customer ? scope.row.customer.name : ''}}
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

      <el-table-column label="Ngân hàng" width="150">
        <template slot-scope="scope">
          {{ scope.row.bankAccount ? scope.row.bankAccount.bankName : ''}}
        </template>
      </el-table-column>

      <el-table-column label="Có" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

      <el-table-column label="Nợ" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

      <el-table-column label="Phí" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

      <el-table-column label="Lịch sử" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

      <el-table-column label="Phê duyệt" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column>

    </el-table>
  </template>

<script>
import {DataTable} from './data_example'
export default {
  data () {
    return {
      tableData: DataTable
    }
  }
}
</script>
