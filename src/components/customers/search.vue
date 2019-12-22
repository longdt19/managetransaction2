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
        v-model="from_date"
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
        v-model="to_date"
      >
      </el-date-picker>
    </div></el-col>

  </el-row>

  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Tên khách hàng</span>
      <el-input v-model="form.name.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>User</span>
      <el-input v-model="form.azAccount.value" clearable/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Số điện thoại</span>
      <el-input v-model="form.phone.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Người quản lý</span>
      <el-input v-model="form.manager.value" clearable/>
    </div></el-col>

    <el-col :span="4"><div class="grid-content bg-purple">
      <span>Nhóm</span>
      <el-input v-model="form.groupName.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Tỉnh</span>
      <el-input v-model="form.provinceName.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Huyện</span>
      <el-input v-model="form.districtName.value" clearable/>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple">
      <span>Xã</span>
      <el-input v-model="form.wardName.value" clearable/>
    </div></el-col>

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
        name: {key: 'name', value: null},
        azAccount: {key: 'azAccount', value: null},
        phone: {key: 'phone', value: null},
        manager: {key: 'manager', value: null},
        groupName: {key: 'groupName', value: null},
        wardName: {key: 'wardName', value: null},
        districtName: {key: 'districtName', value: null},
        provinceName: {key: 'provinceName', value: null}
      }
    }
  },
  methods: {
    search () {
      const payload = {
        ...{'date': this.date},
        ...{'constant': this.constant},
        ...{'form': this.form}
      }
      this.$store.commit('Common/rsql', payload)
      this.$emit('done_request')
    }
  },
  watch: {
    ...['date.from_date', 'date.to_date', 'form.name.value', 'form.azAccount.value',
      'form.phone.value', 'form.manager.value', 'form.groupName.value', 'form.wardName.value',
      'form.districtName.value', 'form.provinceName.value'
    ].reduce((watchers, key) => ({
      ...watchers,
      [key] (newVal, oldVal) {
        if (!newVal) this.search()
      }
    }), {})
  },
  created () {
    let day = getDays()
    this.from_date = day.from_date
    this.to_date = day.to_date
  }
}
</script>
