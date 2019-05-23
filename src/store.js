import Vue from 'vue';
import Vuex from 'vuex';
import { db, firebaseui, storageRef } from './firebase';
import * as firebase from 'firebase/app';

// Import modules
import feed from './modules/feed';
import events from './modules/events';
import gallery from './modules/gallery';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feed,
    events,
    gallery
  },
  state: {
    preventLeave: false
  },
  getters: {
    preventLeave (state) {
      return state.preventLeave;
    }
  },
  mutations: {
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
