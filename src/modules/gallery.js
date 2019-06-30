import { db, firebaseui, storageRef } from '../firebase';
import { firestore } from 'firebase';

export default {
  state: {
    gallery: []
  },
  mutations: {
    setGallery (state, data) {
      state.gallery = data;
    },
    injectPhotos (state, data) {
      state.gallery.find(album => album.id === data.id).photos = data.photos;
    }
  },
  actions: {
    // Load
    loadGallery ({ commit }) {
      db.collection('gallery')
        .onSnapshot(snapshot => {
          var gallery = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;

            docObject.photos = [];
            // Return the new data object
            doc.ref
              .collection('photos')
              .onSnapshot(snapshot => {
                var photos = snapshot.docs.map(doc => {
                  // Get document data object
                  var docObject = doc.data();
                  // Add id key to data object
                  docObject.id = doc.id;
                  // Return the new data object
                  return docObject;
                });

                // for each doc, assign photos
                commit('injectPhotos', {
                  id: doc.id,
                  photos: photos
                });
              });
            return docObject;
          });

          commit('setGallery', gallery);
        });
    },

    pushToAlbum ({ commit }, payload) {
      var albumId = payload.id;
      var photoUrl = payload.url;
      db.collection('gallery')
        .doc(albumId)
        .collection('photos')
        .add({
          url: photoUrl
        });
    }
  }
};
