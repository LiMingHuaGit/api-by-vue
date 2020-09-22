import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/module/Home'
import ApiList from '@/module/ApiList'
import JobList from '@/module/JobList'
import Log from '@/module/Log'
import JobTable from '@/module/JobTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/apiList',
      name: 'apiList',
      component: ApiList
    },
    {
      path: '/jobList',
      name: 'jobList',
      component: JobList
    },
    {
      path: '/log',
      name: 'log',
      component: Log
    },
    {
      path: '/jobTable',
      name: 'jobTable',
      component: JobTable
    }
  ]
})
