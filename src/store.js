import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import feed from './modules/feed';
import events from './modules/events';
import gallery from './modules/gallery';
import auth from './modules/auth';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feed,
    events,
    gallery,
    auth,
    users
  },
  state: {
    preventLeave: false,
    isSlightLoaderShown: false
  },
  getters: {
    preventLeave (state) {
      return state.preventLeave;
    }
  },
  mutations: {
    setIsSlightLoaderShown (state, value) {
      state.isSlightLoaderShown = value;
    },
    setPreventLeave (state, value) {
      if (value) {
        window.onbeforeunload = function () {
          return '';
        };
      } else {
        window.onbeforeunload = null;
      }
      state.preventLeave = value;
    }
  }
});
