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
      <span>Mã giao dịch</span>
      <el-input v-model="form.code.value" clearable/>
    </div></el-col>

    <el-col :span="3"><div class="grid-content bg-purple">
      <span>Tên khách hàng</span>
      <el-input v-model="form.azAccount.value" clearable/>
    </div></el-col>

    <el-col :span="4"><div class="grid-content bg-purple">
      <span>Tên sản phẩm</span>
      <el-input v-model="form.productName.value" clearable/>
    </div></el-col>

    <!-- <el-col :span="3"><div class="grid-content bg-purple">
      <span>Ngân hàng</span>
      <el-input clearable/>
    </div></el-col> -->

     <el-col :span="2"><div class="grid-content bg-purple">
      <span>Loại</span>
      <el-select v-model="constant.type.value" clearable>
        <el-option
          v-for="item in order_type_list"
          :key="item.key"
          :label="item.key"
          :value="item.value">
        </el-option>
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
import getDays from '@/utils/day'
import {ORDER_TYPE_LIST} from '@/constants'

export default {
  data () {
    return {
      date: {
        from_date: null,
        to_date: null
      },
      form: {
        code: {key: 'code', value: null},
        azAccount: {key: 'customer.azAccount', value: null},
        productName: {key: 'product.name', value: null},
        bankName: {key: 'bankAccount.bankName', value: null}
      },
      constant: {
        type: {key: 'type', value: null}
      },
      order_type_list: ORDER_TYPE_LIST
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
    ...['date.from_date', 'date.to_date', 'form.code.value', 'form.azAccount.value',
      'form.productName.value', 'form.bankName.value', 'constant.type.value'
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
