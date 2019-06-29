import { db, firebaseui, storageRef } from '../firebase';
import { firestore } from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

export default {
  state: {
    highlights: [],
    latest: [],
    feed: [],
    isPreloaderShown: true
  },
  mutations: {
    setHighlights (state, data) {
      state.highlights = data;
    },
    setLatest (state, data) {
      state.latest = data;
    },
    setFeed (state, data) {
      state.feed = data;
    },
    hidePreloader (state) {
      state.isPreloaderShown = false;
    }

  },
  getters: {
    mergedFeed (state) {
      return state.highlights.concat(state.latest.concat(state.feed));
    }
  },
  actions: {
    // Load
    loadHighlights ({ commit }) {
      db.collection('feed')
        .where('isHighlight', '==', true)
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
          var highlights = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setHighlights', highlights);
          commit('hidePreloader');
        });
    },
    loadLatest ({ commit }) {
      db.collection('feed')
        .where('isHighlight', '==', false)
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => {
          var latest = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setLatest', latest);
        });
    },
    loadFeed ({ commit }) {
      commit('setIsSlightLoaderShown', true);
      db.collection('feed')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          commit('setIsSlightLoaderShown', false);
          var feed = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setFeed', feed);
        });
    },
    loadNextFeed ({ commit }) {

    },
    // Add
    addFeed ({ commit, dispatch }, feed) {
      return new Promise((resolve, reject) => {
        if (typeof feed.cover === 'object') {
          var file = feed.cover;
          var randomInt = (Math.floor(Math.random() * 1000000));
          var filename = randomInt + '_' + feed.cover.name;
          var fileRef = storageRef.child('images/' + filename);
          commit('setIsSlightLoaderShown', true);
          fileRef.put(file).then(function (snapshot) {
            fileRef.getDownloadURL().then(
              fileURL => {
                dispatch('addPost', {
                  title: feed.title,
                  body: feed.body,
                  cover: fileURL
                }).then(() => {
                  resolve();
                }).catch(error => {
                  commit('setIsSlightLoaderShown', false);
                  reject(error);
                });
              }
            ).catch(error => {
              commit('setIsSlightLoaderShown', false);
              window.alert(error);
            });
          });
        } else {
          dispatch('addPost', {
            title: feed.title,
            body: feed.body,
            cover: feed.cover
          });
        }
      });
    },

    // Add
    addPost ({ commit }, post) {
      return new Promise((resolve, reject) => {
        db.collection('feed')
          .add({
            title: post.title,
            body: post.body,
            cover: post.cover,
            isHighlight: false,
            timestamp: new firestore.Timestamp.now()
          })
          .then(() => {
            resolve();
            commit('setIsSlightLoaderShown', false);

            Toast.open('Published');
          })
          .catch(error => {
            commit('setIsSlightLoaderShown', false);
            window.alert(error);
            reject(error);
          });
      });
    },

    // Update
    updateFeed ({ commit, dispatch }, feed) {
      if (typeof feed.cover === 'object') {
        commit('setIsSlightLoaderShown', true);
        var file = feed.cover;
        var randomInt = (Math.floor(Math.random() * 1000000));
        var filename = randomInt + '_' + feed.cover.name;
        var fileRef = storageRef.child('images/' + filename);

        fileRef.put(file).then(function (snapshot) {
          fileRef.getDownloadURL().then(
            fileURL => {
              dispatch('updatePost', {
                id: feed.id,
                title: feed.title,
                body: feed.body,
                cover: fileURL
              });
            }
          ).catch(error => {
            commit('setIsSlightLoaderShown', false);
            window.alert(error);
          });
        });
      } else {
        dispatch('updatePost', {
          id: feed.id,
          title: feed.title,
          body: feed.body,
          cover: feed.cover
        });
      }
    },
    updatePost ({ commit }, post) {
      db.collection('feed')
        .doc(post.id)
        .update({
          title: post.title,
          body: post.body,
          cover: post.cover
        })
        .then(() => {
          console.log('success');
          Toast.open('Updated');
          commit('setIsSlightLoaderShown', false);
        })
        .catch(error => {
          commit('setIsSlightLoaderShown', false);
          console.log('error: ' + error);
        });
    },
    setHighlight ({ commit }, id) {
      db.collection('feed')
        .doc(id)
        .update({
          isHighlight: true
        });
    },
    unsetHighlight ({ commit }, id) {
      db.collection('feed')
        .doc(id)
        .update({
          isHighlight: false
        });
    },
    deletePost ({ commit }, id) {
      db.collection('feed')
        .doc(id)
        .delete()
        .then(() => {
          Toast.open('Deleted');
        });
    }

  }
};
