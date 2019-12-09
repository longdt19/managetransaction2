<template>
  <section>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%" border>
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
            {{ scope.row.manager}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Nhóm" width="120" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.groupName}}
        </template>
      </el-table-column>

      <el-table-column label="Nợ trước" width="100" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.debtBefore).toLocaleString() }}
        </template>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn đầu kỳ    **********************************
      ********************************************************************** -->
      <el-table-column label="Tồn đầu kỳ" header-align="center">
        <el-table-column label="Nhập" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.previousPeriodImport).toLocaleString() }}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.previousPeriodExport).toLocaleString() }}
          </template>
        </el-table-column>

        <el-table-column label="Thanh toán" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.previousPeriodPaid).toLocaleString() }}
          </template>
        </el-table-column>

        <el-table-column label="Tổng" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.previousPeriodTotal).toLocaleString()}}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      **********************   Tồn trong kỳ    ********************************
      ********************************************************************** -->
      <el-table-column label="Tồn trong kỳ" header-align="center">
        <el-table-column label="Nhập" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.currentPeriodImport).toLocaleString()}}
          </template>
        </el-table-column>

        <el-table-column label="Xuất" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.currentPeriodExport).toLocaleString()}}
          </template>
        </el-table-column>

        <el-table-column label="Thanh toán" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.currentPeriodPaid).toLocaleString()}}
          </template>
        </el-table-column>

        <el-table-column label="Tổng" width="80" header-align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.currentPeriodTotal).toLocaleString()}}
          </template>
        </el-table-column>
      </el-table-column>

      <!-- ********************************************************************
      *************************************************************************
      ********************************************************************** -->
      <el-table-column label="Tổng" width="100" header-align="center">
        <template slot-scope="scope">
          {{ Number(scope.row.total).toLocaleString() }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="Nợ" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.}}
        </template>
      </el-table-column> -->

      <el-table-column label="Địa chỉ" header-align="center">
        <el-table-column label="Xã" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.wardName}}
          </template>
        </el-table-column>

        <el-table-column label="Huyện" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.districtName}}
          </template>
        </el-table-column>

        <el-table-column label="Tỉnh" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.provinceName}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Ghi chú" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.note}}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" width="120px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" style="text-align: center">
              <update-component
                v-if="navigation.includes('UPDATE')"
                :scope="scope.row"
                button-size="mini"
                button-icon="el-icon-edit"
                @done_request="done_request"
              />
            </el-col>
            <el-col :span="12" style="text-align: center">
              <delete-component
                v-if="navigation.includes('DELETE')"
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
import DeleteComponent from '@/components/common/delete'
import {CUSTOMER_URL, CUSTOMER_GROUPS_URL} from '@/constants/endpoints'
import UpdateComponent from './create_or_update'

export default {
  components: {UpdateComponent, DeleteComponent},
  props: {
    dataTable: {type: Array},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      customer_items: [
        {label: 'Tên khách hàng', value: '', key: 'name', type: 'text'},
        {label: 'User', value: '', key: 'azAccount', type: 'text'},
        {label: 'Số điện thoại', value: '', key: 'phone', type: 'text'},
        {label: 'Người quản lý', value: '', key: 'manager', type: 'text'},
        {label: 'Nợ trước', value: '', key: 'debtBefore', type: 'text'},
        {label: 'Địa chỉ', value: '', key: 'address', type: 'text'},
        {label: 'Tỉnh', value: '', key: 'province', type: 'text'},
        {label: 'Ghi chú', value: '', key: 'note', type: 'text'}
      ],
      apiUrl: CUSTOMER_URL,
      navigation: []
    }
  },
  methods: {
    async load_customer_groups_list () {
      const params = {
        'page': 0,
        'size': 100,
        'sort': this.sorted_by
      }
      let url = CUSTOMER_GROUPS_URL + '/search'
      const response = await this.$services.do_request('get', url, params)

      if (response.status === 200) {
        let selections = []
        response.data.content.forEach(item => {
          selections.push(
            {'id': item.id, 'name': item.name}
          )
        })
        this.customer_items.push(
          {
            label: 'Nhóm',
            value: '',
            key: 'groupId',
            type: 'selection',
            selections: selections
          }
        )
      }
    },
    done_request () {
      this.$emit('done_request')
    }
  },
  created () {
    this.navigation = this.common_data.navigation.CUSTOMER
    this.load_customer_groups_list()
  }
}
</script>
