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
      <!-- <el-input v-model="form.provinceName.value" clearable/> -->
      <el-select v-model="constant.provinceName.value" placeholder="Vui lòng chọn"
        filterable
        @focus="get_province_list()"
        :loading="province.loading"
        @change="change_province()"
        clearable
      >
        <el-option
          v-for="p in province.list"
          :key="p.id"
          :label="p.name"
          :value="p.id"
        ></el-option>
      </el-select>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple" v-if="constant.provinceName.value">
      <span>Huyện/Quận</span>
      <el-select v-model="constant.districtName.value" placeholder="Vui lòng chọn"
        filterable
        @focus="get_district_list()"
        :loading="district.loading"
        @change="change_district()"
        clearable
      >
        <el-option
          v-for="d in district.list"
          :key="d.id"
          :label="d.name"
          :value="d.id"
        ></el-option>
      </el-select>
    </div></el-col>

    <el-col :span="2"><div class="grid-content bg-purple" v-if="constant.districtName.value">
      <span>Xã/Phường</span>
      <el-select v-model="constant.wardName.value" placeholder="Vui lòng chọn"
        filterable
        @focus="get_ward_list()"
        :loading="ward.loading"
        clearable
      >
        <el-option
          v-for="w in ward.list"
          :key="w.id"
          :label="w.fullName"
          :value="w.id"
        ></el-option>
      </el-select>
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
import {
  LOCAL_PROVINCE_URL,
  LOCAL_DISTRICT_URL,
  LOCAL_WARD_URL} from '@/constants/endpoints'
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
        groupName: {key: 'group.name', value: null}
      },
      constant: {
        wardName: {key: 'ward.id', value: null},
        districtName: {key: 'district.id', value: null},
        provinceName: {key: 'province.id', value: null}
      },
      province: {
        loading: false,
        list: []
      },
      district: {
        loading: false,
        list: []
      },
      ward: {
        loading: false,
        list: []
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
    },
    async get_province_list () {
      if (this.province.list.length) return
      if (this.province.loading) return
      this.province.loading = true

      const response = await this.$services.do_request('get', LOCAL_PROVINCE_URL)

      this.province.loading = false

      if (response.status === 200) {
        this.province.list = response.data
      }
    },
    async get_district_list () {
      if (this.district.list.length) return
      if (this.district.loading) return
      this.district.loading = true
      let provinceId = this.constant.provinceName.value
      let url = LOCAL_DISTRICT_URL + '?provinceId=' + provinceId
      const response = await this.$services.do_request('get', url)

      this.district.loading = false

      if (response.status === 200) {
        this.district.list = response.data
      }
    },
    async get_ward_list () {
      if (this.ward.list.length) return
      if (this.ward.loading) return
      this.ward.loading = true

      let districtId = this.constant.districtName.value

      let url = LOCAL_WARD_URL + '?districtId=' + districtId
      const response = await this.$services.do_request('get', url)

      this.ward.loading = false

      if (response.status === 200) {
        this.ward.list = response.data
      }
    },
    change_province () {
      this.constant.districtName.value = null
      this.district.list = []
      this.constant.wardName.value = null
      this.ward.list = []
    },
    change_district () {
      this.constant.wardName.value = null
      this.ward.list = []
    }
  },
  watch: {
    ...['date.from_date', 'date.to_date', 'form.name.value', 'form.azAccount.value',
      'form.phone.value', 'form.manager.value', 'form.groupName.value', 'constant.wardName.value',
      'constant.districtName.value', 'constant.provinceName.value'
    ].reduce((watchers, key) => ({
      ...watchers,
      [key] (newVal, oldVal) {
        if (!newVal) this.search()
      }
    }), {})
  },
  created () {
    this.$store.commit('Common/rsql', null)
    let day = getDays()
    this.from_date = day.from_date
    this.to_date = day.to_date
  }
}
</script>
