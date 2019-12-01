<template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50">
      </el-table-column>

      <!-- <el-table-column label="Ngày" width="100">
      </el-table-column> -->

      <el-table-column label="Mã giao dịch" width="80">
        <template slot-scope="scope">
          {{ scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Thông tin khách hàng" >
        <el-table-column label="User" width="80">
          <template slot-scope="scope">
            {{ scope.row.customer.azAccount}}
          </template>
        </el-table-column>

        <el-table-column label="Chi tiết" width="80">
          <template slot-scope="scope">
            {{ scope.row.customer.phone}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Tên sản phẩm" width="150">
        <template slot-scope="scope">
          {{ scope.row.product.name}}
        </template>
      </el-table-column>

      <el-table-column label="Tên sản phẩm" width="150">
        <template slot-scope="scope">
          {{ scope.row.type}}
        </template>
      </el-table-column>

      <el-table-column label="Nhập" width="100">
        <template slot-scope="scope">
          {{ scope.row.cost}}
        </template>
      </el-table-column>

      <el-table-column label="%" width="50">
        <template slot-scope="scope">
          {{ scope.row.extracts}}
        </template>
      </el-table-column>

      <el-table-column label="Tổng" width="100">
        <template slot-scope="scope">
          {{ scope.row.total}}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Thanh toán    **********************************
      ********************************************************************** -->
      <el-table-column label="Thanh toán" >
        <el-table-column label="Có" width="100">
          <template slot-scope="scope">
            {{ scope.row.paid}}
          </template>
        </el-table-column>

        <el-table-column label="Tổng nợ" width="100">
          <template slot-scope="scope">
            {{ scope.row.owed}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Hình thức" width="120">
        <template slot-scope="scope">
          Bank Name
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" width="150">
        <template slot-scope="scope">
          {{ scope.row.note}}
        </template>
      </el-table-column>

      <!-- <el-table-column label="Phê duyệt" width="120">
        <template slot-scope="scope">
          70.000.000
        </template>
      </el-table-column> -->

    </el-table>
  </template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  }
}
</script>
