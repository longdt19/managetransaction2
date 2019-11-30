<template>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Tên nhóm" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="Tên nhóm" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
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
