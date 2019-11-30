<template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên ngân hàng" width="120" header-align="center">
      </el-table-column>

      <el-table-column label="Tên chủ tài khoản" width="120" header-align="center">
      </el-table-column>

      <el-table-column label="Số tài khoản" header-align="center">
      </el-table-column>

      <el-table-column label="Chi nhánh" header-align="center">
      </el-table-column>

      <el-table-column label="Số dư đầu" header-align="center">
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn đầu kỳ    **********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Có" width="100" header-align="center">
          <template slot-scope="scope">
            70.000.000
          </template>
        </el-table-column>

        <el-table-column label="Nợ" width="100" header-align="center">
            <template slot-scope="scope">
              1000
          </template>
        </el-table-column>

        <el-table-column label="Phí" width="100" header-align="center">
          63.000.000
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn trong kỳ    ********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Có" width="100" header-align="center">
          <template slot-scope="scope">
            70.000.000
          </template>
        </el-table-column>

        <el-table-column label="Nợ" width="100" header-align="center">
            <template slot-scope="scope">
              1000
          </template>
        </el-table-column>

        <el-table-column label="Phí" width="100" header-align="center">
          63.000.000
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->
      <el-table-column label="Số dư cuối" width="100" header-align="center">
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
      </el-table-column>
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
