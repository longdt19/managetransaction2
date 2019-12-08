/* eslint-disable */

const INIT_STATE = {
  token: null,
  user_info: {},
  customer_groups_list: [],
  province_list: [],
  district_list: [],
  ward_list: [],
  search: {
    from_date: null,
    to_date: null
  },
  pagination: {
    size: 10,
    element_total: 0,
    current_page: 0
  },
  rsql: null,
  user_info: {}
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
    user_info: (state, value) => {
      state.user_info = value
    },
    search: (state, value) => {
      state.search = value
    },
    pagination: (state, value) => {
      state.pagination = value
    },
    pagination_size: (state, value) => {
      state.pagination.size = value
    },
    pagination_current_page: (state, value) => {
      state.pagination.current_page = value
    },
    rsql: (state, value) => {
      state.rsql = value
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
    search: state => state.search,
    user_info: state => state.user_info,
    customer_groups_list: state => state.customer_groups_list,
    province_list: state => state.province_list,
    district_list: state => state.district_list,
    ward_list: state => state.ward_list,
    pagination: state => state.pagination,
    pagination_size: state => state.pagination,
    pagination_current_page: state => state.pagination,
    rsql: state => state.rsql
  }
}
