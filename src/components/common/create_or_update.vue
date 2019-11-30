<template>
  <section>
    <el-button
      type="primary"
      @click="dialogFormVisible = true"
      >Tạo mới</el-button>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" style="text-align: left;">
      <el-row :gutter="30">
        <el-col :span="12"><div class="grid-content bg-purple">
            <el-form>

              <div v-for="(item, index) in get_part_items(1)" v-bind:key="index">
                <el-form-item :label="item.label">
                  <el-input v-model="item.value"></el-input>
                </el-form-item>
              </div>

            </el-form>
        </div></el-col>

        <el-col :span="12"><div >
            <el-form>

              <div v-for="(item, index) in get_part_items(2)" v-bind:key="index">
                <el-form-item :label="item.label">
                  <el-input v-model="item.value"></el-input>
                </el-form-item>
              </div>

            </el-form>
        </div></el-col>

      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="do_request()" :loading="loading">Xác nhận</el-button>
        <el-button @click="dialogFormVisible = false" type="danger">Hủy bỏ</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    dialogTitle: {type: String},
    itemsCreate: {type: Array},
    apiUrl: {type: String},
    methodRequest: {type: String}
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      loading: false
    }
  },
  methods: {
    get_part_items (part) {
      if (part === 1) {
        return this.itemsCreate.slice(0, Math.ceil((this.itemsCreate.length) / 2))
      }
      return this.itemsCreate.slice(Math.ceil((this.itemsCreate.length) / 2))
    },
    async do_request () {
      if (this.loading) return

      let payload = {}
      this.itemsCreate.forEach(item => {
        payload[item.key] = item.value
      })

      const response = await this.$services.do_request(this.methodRequest, this.apiUrl, payload)
      if (response.status === 200) {
        this.loading = false
        this.$message.success('Success')
        this.$emit('done_request')
        this.dialogFormVisible = false
      }
    }
  }
}
</script>
