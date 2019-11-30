<template>
  <section>
    <el-row :gutter="50">
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="">Từ ngày</span>
      <el-date-picker
        type="datetime"
        placeholder="Từ ngày">
      </el-date-picker>
    </div></el-col>

    <el-col :span="8"><div class="grid-content bg-purple-light">
      <span class="">Đến ngày</span>
      <el-date-picker
        type="datetime"
        placeholder="Đến ngày">
      </el-date-picker>
    </div></el-col>

    <el-col :span="8"><div class="grid-content bg-purple">
      <span>Tìm kiếm</span>
      <br/>
      <el-button icon="el-icon-search"></el-button>
    </div></el-col>
  </el-row>
  </section>
</template>

<script>
// import {PRODUCTS_URL} from '@/constants/endpoints'
export default {
  methods: {
    async load_list () {
    }
  }
}
</script>
