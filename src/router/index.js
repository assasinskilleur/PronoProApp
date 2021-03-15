import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/TabsPage'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        component: () => import('../pages/not-connected/Home')
      },
      {
        path: 'pronostics/:id',
        component: () => import('../pages/not-connected/Pronos')
      },
      {
        path: 'pronostics/:typeid/details/:id',
        component: () => import('../pages/connected/DetailProno')
      },
      {
        path: 'login',
        component: () => import('../pages/Login')
      },
      {
        path: 'account',
        component: () => import('../pages/connected/Account')
      },
      {
        path: 'admin/compet',
        component: () => import('../pages/connected/admin/Compet')
      },
      {
        path: 'admin/compet/add',
        component: () => import('../pages/connected/admin/AddCompet')
      },
      {
        path: 'admin/type',
        component: () => import('../pages/connected/admin/Type')
      },
      {
        path: 'admin/type/add',
        component: () => import('../pages/connected/admin/AddType')
      },
      {
        path: 'admin/prono',
        component: () => import('../pages/connected/admin/Pronostics')
      },
      {
        path: 'admin/prono/add',
        component: () => import('../pages/connected/admin/AddProno')
      },
      {
        path: 'admin/prono/edit/:id',
        component: () => import('../pages/connected/admin/EditProno')
      },
      {
        path: 'admin/prono/details/:id',
        component: () => import('../pages/connected/admin/DetailPronostics')
      },
      {
        path: 'admin/image',
        component: () => import('../pages/connected/admin/AddImage')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
