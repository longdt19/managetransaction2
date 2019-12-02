<template>
<section>
<el-button :type="buttonType" :size="buttonSize"
  @click="open()" :icon="buttonIcon">{{buttonTitle}}</el-button>

<el-dialog title="Tạo mới khách hàng" :visible.sync="dialogFormVisible" style="text-align:left">

  <el-row :gutter="20">
    <el-col :span="12"><div>
      <el-form>
        <el-form-item label="Tài khoản" :label-width="formLabelWidth">
          <el-input v-model="form.azAccount"></el-input>
        </el-form-item>

        <el-form-item label="Tên" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
          <el-input v-model="phone"></el-input>
        </el-form-item> -->

        <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="Người quản lý" :label-width="formLabelWidth">
          <el-input v-model="form.manager"></el-input>
        </el-form-item>

        <el-form-item label="Ghi chú" :label-width="formLabelWidth">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
    </div></el-col>

    <el-col :span="12"><div>
      <el-form>
        <el-form-item label="Nợ trước" :label-width="formLabelWidth">
          <el-input v-model="form.debtBefore"></el-input>
        </el-form-item>

        <el-form-item label="Nhóm" :label-width="formLabelWidth">
          <el-select v-model="form.groupId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_customer_groups_list()"
            :loading="customer_groups.loading"
          >
            <el-option
              v-for="group in customer_groups.list"
              :key="group.id"
              :label="group.name"
              :value="group.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Tỉnh" :label-width="formLabelWidth">
          <el-select v-model="form.provinceId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_province_list()"
            :loading="province.loading"
            @change="change_province()"
          >
            <el-option
              v-for="p in province.list"
              :key="p.id"
              :label="p.name"
              :value="p.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Huyện/Quận" :label-width="formLabelWidth" v-if="form.provinceId">
          <el-select v-model="form.districtId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_district_list()"
            :loading="district.loading"
            @change="change_district()"
          >
            <el-option
              v-for="d in district.list"
              :key="d.id"
              :label="d.name"
              :value="d.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Xã/Phường" :label-width="formLabelWidth" v-if="form.districtId">
          <el-select v-model="form.wardId" placeholder="Vui lòng chọn"
            filterable
            @focus="get_ward_list()"
            :loading="ward.loading"
          >
            <el-option
              v-for="w in ward.list"
              :key="w.id"
              :label="w.fullName"
              :value="w.id"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div></el-col>
  </el-row>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="create()" :loading="loading">Xác nhận</el-button>
    <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
  </span>
</el-dialog>
</section>
</template>

<script>
import {
  CUSTOMER_GROUPS_URL,
  LOCAL_PROVINCE_URL,
  LOCAL_DISTRICT_URL,
  LOCAL_WARD_URL,
  CUSTOMER_URL
} from '@/constants/endpoints'

export default {
  props: {
    scope: {type: Object},
    buttonSize: {type: String},
    buttonIcon: {type: String},
    buttonTitle: {type: String},
    buttonType: {type: String}
  },
  data () {
    return {
      form: {
        address: null,
        azAccount: null,
        debtBefore: null,
        groupId: null,
        manager: null,
        name: null,
        note: null,
        phone: null,
        provinceId: null,
        districtId: null,
        wardId: null
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      customer_groups: {
        loading: false,
        list: []
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
      },
      pagination: {
        page: 0,
        size: 100
      },
      sorted_by: 'createdAt,desc',
      loading: false
    }
  },
  methods: {
    open () {
      if (this.scope) {
        this.form = this.scope
        this.form.groupId = this.scope.groupName
        this.form.provinceId = this.scope.provinceName
        this.form.districtId = this.scope.districtName
        this.form.wardId = this.scope.wardName
      }
      this.dialogFormVisible = true
    },
    async create () {
      if (this.loading) return
      this.loading = true

      const payload = this.form
      let url = CUSTOMER_URL
      let method = 'post'
      if (this.scope) {
        method = 'put'
        url = url + '/' + this.scope.id
      }
      const response = await this.$services.do_request(method, url, payload)
      this.loading = false

      if (response.status === 200) {
        this.$message.success('Tạo mới thành công')
      }
      if (response.status === 202) {
        this.$message.success('Cập nhật thành công')
      }

      this.loading = false
      this.$emit('done_request')
      this.dialogFormVisible = false
    },
    change_province () {
      this.form.districtId = null
      this.district.list = []
      this.form.wardId = null
      this.ward.list = []
    },
    change_district () {
      this.form.wardId = null
      this.ward.list = []
    },
    async get_customer_groups_list () {
      if (this.customer_groups.list.length) return
      if (this.customer_groups.loading) return
      this.customer_groups.loading = true

      const params = {
        'page': this.pagination.page,
        'size': this.pagination.size,
        'sort': this.sorted_by
      }
      let url = CUSTOMER_GROUPS_URL + '/search'
      const response = await this.$services.do_request('get', url, params)
      this.customer_groups.loading = false

      if (response.status === 200) {
        this.customer_groups.list = response.data.content
      }
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

      let url = LOCAL_DISTRICT_URL + '?provinceId=' + this.form.provinceId
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

      let url = LOCAL_WARD_URL + '?districtId=' + this.form.districtId
      const response = await this.$services.do_request('get', url)

      this.ward.loading = false

      if (response.status === 200) {
        this.ward.list = response.data
      }
    }
  },
  created () {
    // this.get_province_list()
  }
}
</script>

<style lang="css">
</style>
