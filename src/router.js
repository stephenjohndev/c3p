import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Store from './store';
import Admin from './views/Admin.vue';

import AdminFeed from './views/admin/AdminFeed.vue';
import AdminEvents from './views/admin/AdminEvents.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/feed',
      children: [
        {
          path: 'feed',
          name: 'admin-feed',
          component: AdminFeed
        },
        {
          path: 'feed/:id',
          component: AdminFeed
        },
        {
          path: 'events',
          name: 'admin-events',
          component: AdminEvents
        }
      ]
    },
    {
      path: '*',
      name: 'Home',
      component: Home
    }
  ]
});
