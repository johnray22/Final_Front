/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/usermng',
  component: Layout,
  redirect: '/usermng/wxuser',
  name: '用户管理',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'wxuser',
      component: () => import('@/views/usermng/wxuser'),
      name: 'wxuser',
      meta: { title: '小程序用户管理' }
    },
    {
      path: 'webuser',
      component: () => import('@/views/usermng/webuser'),
      name: 'webuser',
      meta: { title: '后台用户管理' }
    }
  ]
}
export default tableRouter
