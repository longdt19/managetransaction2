<template>
  <section>
    <el-row :gutter="50">
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="">Từ ngày</span>
      <el-date-picker
        type="date"
        placeholder="Từ ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="from_date"
      >
      </el-date-picker>
    </div></el-col>

    <el-col :span="8"><div class="grid-content bg-purple-light">
      <span class="">Đến ngày</span>
      <el-date-picker
        type="date"
        placeholder="Đến ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="to_date"
      >
      </el-date-picker>
    </div></el-col>

    <el-col :span="8"><div class="grid-content bg-purple">
      <span>Tìm kiếm</span>
      <br/>
      <el-button icon="el-icon-search" @click="search()"></el-button>
    </div></el-col>
  </el-row>
  </section>
</template>

<script>
import getDays from '@/utils/day'
export default {
  data () {
    return {
      from_date: null,
      to_date: null
    }
  },
  methods: {
    search () {
      const search = {
        from_date: this.from_date,
        to_date: this.to_date
      }
      this.$store.commit('Common/search', search)
      this.$emit('done_request')
    }
  },
  created () {
    let day = getDays()
    this.from_date = day.from_date
    this.to_date = day.to_date
  }
}
</script>
