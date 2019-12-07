<template>
  <section>
    <el-button
      :type="buttonType"
      :size="buttonSize"
      @click="openDialogFormVisible()"
      :icon="buttonIcon"
      >{{buttonTitle}}</el-button>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" style="text-align: left;">
      <el-row :gutter="30">
        <el-col :span="12"><div class="grid-content bg-purple">
            <el-form>

              <div v-for="(item, index) in get_part_items(1)" v-bind:key="index">
                <!-- Input type is selection -->
                <el-form-item :label="item.label" v-if="item.type === 'selection'">
                  <el-select v-model="item.value" placeholder="Vui lòng chọn" style="width: 100%">
                    <el-option
                      v-for="select in item.selections"
                      :key="select.id"
                      :label="select.name"
                      :value="select.id"
                      :name="select.type" />
                  </el-select>
                </el-form-item>

                <!-- Input type is text -->
                <el-form-item :label="item.label" v-if="item.type === 'text'">
                  <el-input v-model="item.value"></el-input>
                </el-form-item>
              </div>

            </el-form>
        </div></el-col>

        <el-col :span="12"><div>
            <el-form>

              <div v-for="(item, index) in get_part_items(2)" v-bind:key="index">
                <!-- Input type is selection -->
                <el-form-item :label="item.label" v-if="item.type === 'selection'">
                  <el-select v-model="item.value" placeholder="Vui lòng chọn" style="width: 100%">
                    <el-option
                      v-for="select in item.selections"
                      :key="select.id"
                      :label="select.name"
                      :value="select.id" />
                  </el-select>
                </el-form-item>

                <!-- Input type is text -->
                <el-form-item :label="item.label" v-if="item.type === 'text'">
                  <el-input v-model="item.value"></el-input>
                </el-form-item>
              </div>

            </el-form>
        </div></el-col>

      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="do_request('form1', 'form2')" :loading="loading">Xác nhận</el-button>
        <el-button @click="dialogFormVisible = false" type="danger">Hủy bỏ</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import InputHandler from './input'

export default {
  components: {InputHandler},
  props: {
    dialogTitle: {type: String},
    itemsCreate: {type: Array},
    apiUrl: {type: String},
    methodRequest: {type: String},
    buttonType: {type: String, default: 'primary'},
    buttonSize: {type: String, default: 'medium'},
    buttonTitle: {type: String, default: ''},
    buttonIcon: {type: String, default: ''},
    scope: {type: Object}
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
    prepare_payload_update () {
      this.itemsCreate.forEach(item => {
        item.value = this.scope[item.key]
      })
    },
    openDialogFormVisible () {
      if (this.methodRequest === 'put') {
        this.prepare_payload_update()
      }
      this.dialogFormVisible = true
    },
    async do_request () {
      if (this.loading) return
      this.loading = true

      let payload = {}
      this.itemsCreate.forEach(item => {
        payload[item.key] = item.value
      })

      let url = this.apiUrl
      if (this.methodRequest === 'put') {
        url = url + '/' + this.scope.id
      }

      const response = await this.$services.do_request(this.methodRequest, url, payload)
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
    }
  }
}
</script>
