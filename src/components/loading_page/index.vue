<template>
<section>
  <template v-if="common_data.constant_loaded">
    <router-view/>
  </template>
  <template v-else-if="common_data.constant_loaded === null">
     <h1>loading</h1>
  </template>
  <template v-else>
    <e500 />
  </template>
</section>
</template>

<script>
import { BANK_LIST_URL } from '@/constants/endpoints'

import E500 from '@/components/errors/e500'

export default {
  components: {E500},
  data () {
    return {
    }
  },
  async created () {
    console.log('loading page')
    // const response = await this.$services.do_request('get', BANK_LIST_URL)
    // this.$store.commit('Common/tokenLoaded', true)
  }
}
</script>

<style lang="css">
</style>
