<template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên nhóm" header-align="center">
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
