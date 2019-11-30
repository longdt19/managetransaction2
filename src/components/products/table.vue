<template>
    <el-table :data="data_table" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Mã sản phẩm" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>

      <el-table-column label="Tên sản phẩm" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Mô tả" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="Tồn" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.inventory }}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn đầu kỳ    **********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Nhập" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodImport }}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodExport }}
          </template>
        </el-table-column>

        <el-table-column label="Tồn" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.previousPeriodInventory }}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn trong kỳ    ********************************
      ********************************************************************** -->
      <el-table-column label="Tồn trong kỳ" header-align="center">
        <el-table-column label="Nhập" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodImport }}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="100" header-align="center">
          <template slot-scope="scope">
              {{ scope.row.currentPeriodExport }}
          </template>
        </el-table-column>

        <el-table-column label="Tồn" width="100" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.currentPeriodInventory }}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->
      <el-table-column label="Tổng tồn" width="100" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.inventory }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="Còn/Hết" width="100" header-align="center">
        <template slot-scope="scope">
          {{ % set total = (scope.previousPeriodImport + scope.currentPeriodImport + ) - }}
          {{ scope.currentPeriodInventory }}
        </template>
      </el-table-column> -->

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
    </el-table>
  </template>

<script>
import {PRODUCTS_URL} from '@/constants/endpoints'

export default {
  data () {
    return {
      loading: false,
      pagination: {
        page: 0,
        size: 10
      },
      sorted_by: 'createdAt,desc',
      data_table: []
    }
  },
  methods: {
    async load_list () {
      if (this.loading) return
      this.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }

      const response = await this.$services.do_request('get', PRODUCTS_URL, params)

      if (response.status === 200) {
        this.loading = false

        this.data_table = response.data.content
      }
    }
  },
  created () {
    this.load_list()
  }
}
</script>
