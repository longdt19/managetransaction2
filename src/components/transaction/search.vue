<template>
  <section>
    <el-row :gutter="50">
    <el-col :span="3"><div class="grid-content bg-purple">
      <span class="">Từ ngày</span>
      <el-date-picker
        type="date"
        placeholder="Từ ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="date.from_date"
      >
      </el-date-picker>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple-light">
      <span class="">Đến ngày</span>
      <el-date-picker
        type="date"
        placeholder="Đến ngày"
        value-format="timestamp"
        format="dd-MM-yyyy"
        v-model="date.to_date"
      >
      </el-date-picker>
    </div></el-col>
  </el-row>

  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Người giao dịch</span>
      <el-input v-model="form.traders"/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Tên khách hàng</span>
      <el-input v-model="form.azAccount"/>
    </div></el-col>

    <el-col :span="4"><div class="grid-content bg-purple">
      <span>Nội dung</span>
      <el-input v-model="form.content"/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Mã giao dịch</span>
      <el-input v-model="form.code"/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Ngân hàng</span>
      <el-input v-model="form.bankName"/>
    </div></el-col>

    <!-- <el-col :span="2"><div class="grid-content bg-purple">
      <span>Phê duyệt</span>
      <el-input />
    </div></el-col> -->

    <el-col :span="2"><div class="grid-content bg-purple">
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
      date: {
        from_date: null,
        to_date: null
      },
      form: {
        traders: null,
        azAccount: null,
        content: null,
        code: null,
        bankName: null
      }
    }
  },
  methods: {
    search () {
      let params = ''
      for (const i in this.form) {
        if (this.form[i]) {
          params = params + `${i}=='*${this.form[i]}*';`
        }
      }
      if (this.date.from_date) {
        params = params + `time>=${this.date.from_date};`
      }
      if (this.date.to_date) {
        params = params + `time<=${this.date.to_date};`
      }
      params = params.replace(/;$/, '')

      this.$store.commit('Common/rsql', params)
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
