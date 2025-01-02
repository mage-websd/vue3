import { type RouteRecordRaw } from 'vue-router';
import { Auth } from './middleware/auth';
import { MENU_KEY } from './menu';
import __ from '@/helpers/lang';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    menuActiveKey?: string;
  }
}

const router: Array<RouteRecordRaw> = [
  {
    // for user auth + guest, with layout auth
    path: '/',
    redirect: { name: 'home' },
    component: () => import('@/views/layouts/Auth.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/logic/home/Home.vue'),
        meta: {
          title: 'Home',
        },
      },
    ],
  },
  {
    // for route guest
    path: '/',
    component: () => import('@/views/layouts/Guest.vue'),
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/pages/404.vue'),
        meta: {
          title: '404 Not Found',
        },
      },
      {
        path: '/500',
        name: '500',
        component: () => import('@/views/pages/500.vue'),
        meta: {
          title: '500 Internal Server Error',
        },
      },
    ],
  },
  {
    // for route auth
    path: '/',
    component: () => import('@/views/layouts/Auth.vue'),
    beforeEnter: Auth,
    children: [
      {
        path: '/form/list',
        name: 'form.list',
        component: () => import('@/views/logic/form/List.vue'),
        meta: {
          title: __('form.form_list'),
          menuActiveKey: MENU_KEY.menu1,
        },
      },
      {
        path: '/form/create',
        name: 'form.create',
        component: () => import('@/views/logic/form/Create.vue'),
        meta: {
          title: __('form.form_create'),
          menuActiveKey: MENU_KEY.menu1,
        },
      },
      {
        path: '/form/create/confirm',
        name: 'form.create.confirm',
        component: () => import('@/views/logic/form/CreateConfirm.vue'),
        meta: {
          title: __('form.form_create_confirm'),
          menuActiveKey: MENU_KEY.menu1,
        },
      },
    ],
  },
  // for all not found route
  {
    path: '/:notFound(.*)*',
    name: '404any',
    component: () => import('@/views/layouts/Guest.vue'),
    children: [
      {
        path: '/:notFound(.*)*',
        component: () => import('@/views/pages/404.vue'),
        meta: {
          title: '404 Not Found',
        },
      },
    ],
  },
];

export default router;
