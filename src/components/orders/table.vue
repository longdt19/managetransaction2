<template>
<section>
  <div style="text-align: right">
    <span>Hiển thị</span>
    <el-select v-model="pagination.per_page" placeholder="Select"  style="margin-left: 5px; width: 80px">
    <el-option
      v-for="item in pagination.options"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
  </div>
  <el-table :data="tableData" style="width: 100%; margin-top: 30px" border>
    <el-table-column label="STT" width="50">
    </el-table-column>
    <el-table-column label="Ngày" width="100">
    </el-table-column>

    <el-table-column label="Người giao dịch" width="80">
    </el-table-column>

    <el-table-column label="Tên" >
    </el-table-column>

    <el-table-column label="Nội dung" width="150">
      <template slot-scope="scope">
        nap tien az
      </template>
    </el-table-column>

    <el-table-column label="261893" >
    </el-table-column>

    <el-table-column label="Ngân hàng" >
    </el-table-column>

    <el-table-column label="Có" >
    </el-table-column>

    <el-table-column label="Nợ" width="120">
      <template slot-scope="scope">
        70.000.000
      </template>
    </el-table-column>
    <el-table-column label="Phí" width="120">
      <template slot-scope="scope">
        700.000.000
      </template>
    </el-table-column>
    <el-table-column label="LS thay đổi" width="150">
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

  <pagination-component :per-page="pagination.per_page"/>
</section>
</template>

<script>
import PaginationComponent from '@/components/common/pagination'
export default {
  components: {PaginationComponent},
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
      }],
      pagination: {
        per_page: 10,
        options: [10, 20, 30, 50]
      }
    }
  },
  watch: {
    'pagination.per_page' (val) {
      console.log(val)
    }
  }
}
</script>
