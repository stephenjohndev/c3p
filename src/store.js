import Vue from 'vue';
import Vuex from 'vuex';
import { db, firebaseui, storageRef } from './firebase';
import * as firebase from 'firebase/app';

// Import modules
import feed from './modules/feed';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feed
  },
  state: {
    hasPendingActivity: false
  },
  getters: {
    hasPendingActivity (state) {
      return state.hasPendingActivity;
    }
  },
  mutations: {
    setHasPendingActivity (state, value) {
      if (value) {
        window.onbeforeunload = function () {
          return '';
        };
      } else {
        window.onbeforeunload = null;
      }
      state.hasPendingActivity = value;
    }
  }
});

// export default new Vuex.Store({
//   state: {
//     announcements: null,
//     feed: [],
//     user: null,
//     isAuthorized: false
//   },
//   getters: {

//   },
//   mutations: {
//     setFeed (state, data) {
//       state.feed = data;
//     },
//     setUser (state, data) {
//       state.user = data;
//     },
//     setAuthorized (state, data) {
//       state.isAuthorized = data;
//     }
//   },
//   actions: {
//     initUser ({ commit, dispatch }) {
//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           commit('setUser', user);
//           dispatch('checkAuthorization', user);
//         }
//       });
//     },
//     checkAuthorization ({ commit }, user) {
//       db.collection('users').doc(user.uid).get()
//         .then(doc => {
//           commit('setAuthorized', doc.data().isAuthorized);
//         });
//     },
//     initFBUI () {
//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       ui.start('#firebaseui-auth-container', {
//         signInSuccessUrl: 'http://localhost:8080',
//         signInOptions: [
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID
//         ]
//         // Other config options...
//       });
//     },
//     getFeed ({ commit }) {
//       var feedRef = db.collection('feed');
//       var feeds = [];
//       feedRef.get()
//         .then(snapshot => {
//           snapshot.forEach(doc => {
//             var data = doc.data();
//             data.id = doc.id;
//             feeds.push(data);
//           });
//           commit('setFeed', feeds);
//         })
//         .catch(err => {
//           console.log('Error getting documents', err);
//         });
//     }
//   }
// });

// export default new Vuex.Store({
//   state: {
//     announcements: null,
//     feed: null,
//     user: null,
//     isAuthorized: false
//   },
//   getters: {
//     isAuthenticated (state) {
//       return !!state.user;
//     }
//   },
//   mutations: {
//     setFeed (state, data) {
//       state.feed = data;
//     },
//     setUser (state, data) {
//       state.user = data;
//     },
//     setAuthorized (state, data) {
//       state.isAuthorized = data;
//     }
//   },
//   actions: {
//     initUser ({ commit, dispatch }) {
//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           commit('setUser', user);
//           dispatch('checkAuthorization', user);
//         }
//       });
//     },
//     checkAuthorization ({ commit }, user) {
//       db.collection('users').doc(user.uid).get()
//         .then(doc => {
//           commit('setAuthorized', doc.data().isAuthorized);
//         });
//     },
//     signIn () {
//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       ui.start('#firebaseui-auth-container', {
//         signInSuccessUrl: 'http://localhost:8080',
//         signInOptions: [
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID
//         ]
//         // Other config options...
//       });
//     },
//     getFeed ({ commit }) {
//       var feedRef = db.collection('feed');
//       var feeds = [];
//       feedRef.get()
//         .then(snapshot => {
//           snapshot.forEach(doc => {
//             feeds.push(doc.data());
//           });
//           commit('setFeed', feeds);
//         })
//         .catch(err => {
//           console.log('Error getting documents', err);
//         });
//     },
//     postFeed ({ dispatch }, data) {
//       // Upload photo
//       var file = data.cover;
//       var randomInt = (Math.floor(Math.random() * 1000000));
//       var filename = randomInt + '_' + data.cover.name;
//       var fileRef = storageRef.child('images/' + filename);

//       fileRef.put(file).then(function (snapshot) {
//         fileRef.getDownloadURL().then(fileURL => {
//           db.collection('feed').add({
//             title: data.title,
//             body: data.body,
//             cover: fileURL
//           }).then(doc => {
//             dispatch('getFeed');
//           });
//         });
//         // Write data to database
//       });
//     }
//   }
// });
