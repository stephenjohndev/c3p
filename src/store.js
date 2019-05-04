import Vue from 'vue';
import Vuex from 'vuex';
import { db, firebaseui } from './firebase';
import * as firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feed: null,
    user: null,
    isAuthorized: false
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user;
    }
  },
  mutations: {
    setFeed (state, data) {
      state.feed = data;
    },
    setUser (state, data) {
      state.user = data;
    },
    setAuthorized (state, data) {
      state.isAuthorized = data;
    }
  },
  actions: {
    initUser ({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('setUser', user);
          dispatch('checkAuthorization', user);
        }
      });
    },
    checkAuthorization ({ commit }, user) {
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          commit('setAuthorized', doc.data().isAuthorized);
        });
    },
    signIn () {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: 'http://localhost:8080',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
        // Other config options...
      });
    },
    getFeed ({ commit }) {
      var feedRef = db.collection('feed');
      var feeds = [];
      feedRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            feeds.push(doc.data());
          });
          commit('setFeed', feeds);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    },
    post ({ dispatch }, data) {
      db.collection('feed').add({
        title: 'Test Title',
        body: data
      }).then(doc => {
        dispatch('getFeed');
      });
    }
  }
});
