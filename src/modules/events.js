import { db, firebaseui, storageRef } from '../firebase';
import { firestore } from 'firebase';

export default {
  state: {
    upcomingEvents: [],
    events: []
  },
  mutations: {
    setUpcomingEvents (state, data) {
      state.upcomingEvents = data;
    }

  },
  actions: {
    // Load
    loadUpcomingEvents ({ commit }) {
      db.collection('events')
        .where('start', '>', new firestore.Timestamp.now())
        .orderBy('start', 'desc')
        .get()
        .then(snapshot => {
          var upcomingEvents = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setUpcomingEvents', upcomingEvents);
        });
    }
  }
};
