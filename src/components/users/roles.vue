<template>
<section>
  <el-button icon="el-icon-setting" type="warning" plain size=mini
    @click="dialogTableVisible = true"
  />

  <el-dialog title="Bảng phân quyền chức năng" :visible.sync="dialogTableVisible" width="850px">
    <el-table :data="dataTable" v-loading="loading">
      <el-table-column label="Tên" header-align="center" align="center">
        <template slot-scope="scope">
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xem" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền sửa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền thêm" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xóa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Cho phép" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini">Cập nhật</el-button>
          </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">Hủy bỏ</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false
    }
  }
}
</script>
