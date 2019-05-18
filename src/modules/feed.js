import { db, firebaseui, storageRef } from '../firebase';
import { firestore } from 'firebase';

export default {
  state: {
    highlights: [],
    latest: [],
    feed: []
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
    appendFeed (state, data) {

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
      db.collection('feed')
        .orderBy('timestamp', 'desc')
        .limit(4)
        .onSnapshot(snapshot => {
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
                  reject(error);
                });
              }
            );
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
          })
          .catch(error => {
            window.alert(error);
            reject(error);
          });
      });
    },

    // Update
    updateFeed ({ commit, dispatch }, feed) {
      if (typeof feed.cover === 'object') {
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
          );
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
        })
        .catch(error => {
          console.log('error: ' + error);
        });
    }

  }
};
