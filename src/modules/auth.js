import { db, firebaseui } from '../firebase';
import firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { Toast } from 'buefy/dist/components/toast';

var ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
  state: {
    user: null,
    isAuthorized: null
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
    setAuthorized (state, data) {
      state.isAuthorized = data;
    }
  },
  actions: {
    initializeUI ({ commit }) {
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/admin',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
        // Other config options...
      });

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          Toast.open('Signed in as <b>' + user.email + '</b>');
          commit('setUser', user);

          db.collection('users')
            .where('email', '==', user.email)
            .get()

            .then((result) => {
              console.log(result.docs);
              if (result.docs.length > 0) {
                commit('setAuthorized', true);
              } else {
                commit('setAuthorized', false);
              }
            })
            .catch(err => {
              window.alert('error: ' + err);
            })

          ;

          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
    },
    signOut ({ commit }) {
      commit('setAuthorized', false);
      commit('setUser', null);
      firebase.auth().signOut()
        .then(() => {
          Toast.open('Signed out successfuly');
        })
        .catch(err => {
          window.alert(err);
        });
    } }
};
