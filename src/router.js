import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';

// Routes
import Home from './views/Home.vue';
import Feed from './views/Feed.vue';
import Feedpost from './views/Feedpost.vue';
import Events from './views/Events.vue';
import Event from './views/Event.vue';
import Gallery from './views/Gallery.vue';
import Album from './views/Album.vue';
import Admin from './views/Admin.vue';
import AdminFeed from './views/admin/AdminFeed.vue';
import AdminEvents from './views/admin/AdminEvents.vue';
import AdminGallery from './views/admin/AdminGallery.vue';

import PageNotFound from './views/PageNotFound.vue';

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
      path: '/feed/:id',
      name: 'Feedpost',
      component: Feedpost
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/events/:id',
      name: 'Event',
      component: Event
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/gallery/:id',
      name: 'Album',
      component: Album
    },
    {
      path: '/admin',
      name: 'Admin',
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
        },
        {
          path: 'events/:id',
          component: AdminEvents
        },
        {
          path: 'gallery',
          name: 'admin-gallery',
          component: AdminGallery
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: PageNotFound
        },
        {
          path: 'editors',
          name: 'admin-editors',
          component: PageNotFound
        }
      ]
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (Store.state.preventLeave) {
    var response = window.confirm('Leave? Changes you made may not be saved.');
    if (response) {
      Store.commit('setPreventLeave', false);
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

export default router;
