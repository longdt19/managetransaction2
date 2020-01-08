/* eslint-disable */
const dayjs = require('dayjs')

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
  user_info: {},
  navigation: {
    transaction: {},
    order: {},
    customer: {},
    customer_group: {},
    bank_account: {},
    user: {},
    role: {}
  },
  role: {}
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
      let to_date = value.to_date
      if (to_date) {
        to_date = new Date(dayjs(to_date).endOf('day')).getTime()
      }
      value.to_date = to_date
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
      let params = ''
      if (value) {
        if (value.date.from_date) {
          params = params + `time>=${value.date.from_date};`
        }
        if (value.date.to_date) {
          let to_date = value.date.to_date
          let end_of_day = dayjs(to_date).endOf('day')
          end_of_day = new Date(end_of_day).getTime()

          params = params + `time<=${end_of_day};`
        }

        // load with constant
        for (const i in value.constant) {
          if (value.constant[i].value) {
            params = params + `${value.constant[i].key}=='${value.constant[i].value}';`
          }
        }

        // load with form
        for (const i in value.form) {
          if (value.form[i].value) {
            params = params + `${value.form[i].key}=='*${value.form[i].value}*';`
          }
        }

        params = params.replace(/;$/, '')
      }

      if (state.rsql !== params) {
        state.pagination.current_page = 0
      }
      state.rsql = params
    },
    navigation: (state, value) => {
      state.navigation = value
    },
    role: (state, value) => {
      state.role = value
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
    rsql: state => state.rsql,
    navigation: state => state.navigation,
    role: state => state.role
  }
}
