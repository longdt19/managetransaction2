/* eslint-disable */

const INIT_STATE = {
  token: null,
  customer_groups_list: [],
  province_list: [],
  district_list: [],
  ward_list: []
}

export default {
  namespaced: true,
  state: {
    ...INIT_STATE
  },
  mutations: {
    tokenLoaded: (state, value) => {
      state.token = value
    },
    restore: (state) => {
      const s = INIT_STATE
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    customer_groups_list_loaded: (state, value) => {
      state.customer_groups_list = value
    },
    province_list_loaded: (state, value) => {
      state.province_list = value
    },
    district_list_loaded: (state, value) => {
      state.district_list = value
    },
    ward_list_loaded: (state, value) => {
      state.ward_list = value
    }
  },
  actions: {},
  getters: {
    common_data: state => state,
    token: state => state.token,
    customer_groups_list: state => state.customer_groups_list,
    province_list: state => state.province_list,
    district_list: state => state.district_list,
    ward_list: state => state.ward_list
  }
}
