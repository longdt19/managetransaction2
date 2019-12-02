<template>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
      <el-table-column type="index" label="STT" width="50" header-align="center">
      </el-table-column>

      <el-table-column label="Mã sản phẩm" width="150" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>

      <el-table-column label="Tên sản phẩm" width="150" header-align="center">
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
      <el-table-column label="Tổng tồn" width="150" header-align="center">
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

      <!-- <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column> -->

      <el-table-column label="Thao tác" header-align="center" width="150px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                dialog-title="Cập nhật tài khoản ngân hàng"
                :api-url="apiUrl"
                :items-create="product_items"
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
  </template>

<script>
import {PRODUCTS_URL} from '@/constants/endpoints'
import UpdateComponent from '@/components/common/create_or_update'
import DeleteComponent from '@/components/common/delete'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      product_items: [
        {label: 'Mã sản phẩm', value: '', key: 'code', type: 'text'},
        {label: 'Tên sản phẩm', value: '', key: 'description', type: 'text'},
        {label: 'Mô tả', value: '', key: 'inventory', type: 'text'},
        {label: 'Tồn', value: '', key: 'name', type: 'text'}
      ],
      apiUrl: PRODUCTS_URL
    }
  },
  methods: {
    done_request () {
      this.$emit('done_request')
    }
  },
  created () {
    // this.load_list()
  }
}
</script>
