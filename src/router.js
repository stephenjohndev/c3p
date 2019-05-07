import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Events from './views/Events.vue';
import Feed from './views/Feed.vue';
import FeedAdd from './views/FeedAdd.vue';

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
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
      redirect: '/admin/feed',
      children: [
        {
          path: 'feed',
          name: 'admin-feed',
          component: () => import(/* webpackChunkName: "about" */ './views/admin/AdminFeed.vue'),
        },  
      ]
    }
  ]
});
