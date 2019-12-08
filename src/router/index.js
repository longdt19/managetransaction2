import Vue from 'vue'

// import App from '@/App'

import Router from 'vue-router'

// import LoadingPage from '@/components/loading_page'
import Login from '@/components/login'
import Layout from '@/components/layout'
import Transaction from '@/components/transaction'
import Customers from '@/components/customers'
import CustomerGroups from '@/components/customer_groups'
import Products from '@/components/products'
import BankAccounts from '@/components/bank_accounts'
import Orders from '@/components/orders'
import Users from '@/components/users'

import E500 from '@/components/errors/e500'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/e-500',
      name: 'E500',
      component: E500
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/transaction',
      children: [
        {
          path: 'transaction',
          name: 'transaction',
          component: Transaction
        },
        {
          path: 'products',
          name: 'products',
          component: Products
        },
        {
          path: 'bank_accounts',
          name: 'bank_accounts',
          component: BankAccounts
        },
        {
          path: 'customers',
          name: 'customers',
          component: Customers
        },
        {
          path: 'customer_groups',
          name: 'customer_groups',
          component: CustomerGroups
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders
        },
        {
          path: 'users',
          name: 'users',
          component: Users
        }
      ]
    }
  ]
})
