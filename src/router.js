import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

// Routes
import Home from './views/Home.vue';
import Feed from './views/Feed.vue';
import Admin from './views/Admin.vue';
import AdminFeed from './views/admin/AdminFeed.vue';
import AdminEvents from './views/admin/AdminEvents.vue';

Vue.use(Router);

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
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
    }
    // {
    //   path: '*',
    //   name: 'Home',
    //   component: Home
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (Store.state.hasPendingActivity) {
    var response = window.confirm('Leave? Changes you made may not be saved.');
    if (response) {
      Store.commit('setHasPendingActivity', false);
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

export default router;
