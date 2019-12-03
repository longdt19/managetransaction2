<template>
  <section>
    <el-row :gutter="50">
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="">Từ ngày</span>
      <el-date-picker
        type="date"
        placeholder="Từ ngày"
        value-format="dd-MM-yyyy"
        format="dd-MM-yyyy"
        v-model="date1"
      >
      </el-date-picker>
    </div></el-col>

    <el-col :span="8"><div class="grid-content bg-purple-light">
      <span class="">Đến ngày</span>
      <el-date-picker
        type="date"
        placeholder="Đến ngày"
        value-format="dd-MM-yyyy"
        format="dd-MM-yyyy"
        v-model="date2"
      >
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
export default {
  data () {
    return {
      date1: null,
      date2: null
    }
  },
  methods: {
  }
}
</script>
