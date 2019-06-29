import { db, firebaseui, storageRef } from '../firebase';
import { firestore } from 'firebase';
import { Toast } from 'buefy/dist/components/toast';

export default {
  state: {
    upcomingEvents: [],
    events: []
  },
  getters: {
    mergedEvents (state) {
      return state.upcomingEvents.concat(state.events);
    }
  },
  mutations: {
    setUpcomingEvents (state, data) {
      state.upcomingEvents = data;
    },

    setEvents (state, data) {
      state.events = data;
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
    },
    prepareAddEvent ({ commit, dispatch }, event) {
      return new Promise((resolve, reject) => {
        if (typeof event.cover === 'object') {
          commit('setIsSlightLoaderShown', true);
          var file = event.cover;
          var randomInt = (Math.floor(Math.random() * 1000000));
          var filename = randomInt + '_' + event.cover.name;
          var fileRef = storageRef.child('images/' + filename);

          fileRef.put(file).then(function (snapshot) {
            fileRef.getDownloadURL().then(
              fileURL => {
                dispatch('addEvent', {
                  id: event.id,
                  title: event.title,
                  cover: fileURL,
                  description: event.description,
                  venue: event.venue,
                  start: firestore.Timestamp.fromDate(new Date(event.start)),
                  end: firestore.Timestamp.fromDate(new Date(event.start)),
                  registrationLink: event.registrationLink,
                  feedbackLink: event.feedbackLink,
                  registrationAllowed: event.registrationAllowed,
                  feedbackAllowed: event.feedbackAllowed
                }).then(() => {
                  resolve();
                }).catch(error => {
                  commit('setIsSlightLoaderShown', false);
                  reject(error);
                });
              }
            )
              .catch(error => {
                commit('setIsSlightLoaderShown', false);
                window.alert(error);
              });
          });
        } else {
          dispatch('addEvent', {
            id: event.id,
            title: event.title,
            cover: event.cover,
            description: event.description,
            venue: event.venue,
            start: firestore.Timestamp.fromDate(new Date(event.start)),
            end: firestore.Timestamp.fromDate(new Date(event.start)),
            registrationLink: event.registrationLink,
            feedbackLink: event.feedbackLink,
            registrationAllowed: event.registrationAllowed,
            feedbackAllowed: event.feedbackAllowed
          });
        }
      });
    },
    addEvent ({ commit }, event) {
      console.log({
        title: event.title,
        cover: event.cover,
        description: event.description,
        venue: event.venue,
        start: event.start,
        end: event.end,
        registrationLink: event.registrationLink,
        feedbackLink: event.feedbackLink,
        registrationAllowed: event.registrationAllowed,
        feedbackAllowed: event.feedbackAllowed
      });

      return new Promise((resolve, reject) => {
        db.collection('events')
          .add({
            title: event.title,
            cover: event.cover,
            description: event.description,
            venue: event.venue,
            start: event.start,
            end: event.end,
            registrationLink: event.registrationLink,
            feedbackLink: event.feedbackLink,
            registrationAllowed: event.registrationAllowed,
            feedbackAllowed: event.feedbackAllowed
          })
          .then(() => {
            commit('setIsSlightLoaderShown', false);
            Toast.open('Published');
            resolve();
          })
          .catch(error => {
            commit('setIsSlightLoaderShown', false);
            window.alert(error);
            reject(error);
          });
      });
    },
    prepareUpdateEvent ({ commit, dispatch }, event) {
      if (typeof event.cover === 'object') {
        commit('setIsSlightLoaderShown', true);
        var file = event.cover;
        var randomInt = (Math.floor(Math.random() * 1000000));
        var filename = randomInt + '_' + event.cover.name;
        var fileRef = storageRef.child('images/' + filename);

        fileRef.put(file).then(function (snapshot) {
          fileRef.getDownloadURL().then(
            fileURL => {
              dispatch('updateEvent', {
                id: event.id,
                title: event.title,
                cover: fileURL,
                description: event.description,
                venue: event.venue,
                start: firestore.Timestamp.fromDate(new Date(event.start)),
                end: firestore.Timestamp.fromDate(new Date(event.start)),
                registrationLink: event.registrationLink,
                feedbackLink: event.feedbackLink,
                registrationAllowed: event.registrationAllowed,
                feedbackAllowed: event.feedbackAllowed

              });
            }
          ).catch(error => {
            commit('setIsSlightLoaderShown', false);
            window.alert(error);
          });
        });
      } else {
        dispatch('updateEvent', {
          id: event.id,
          title: event.title,
          cover: event.cover,
          description: event.description,
          venue: event.venue,
          start: firestore.Timestamp.fromDate(new Date(event.start)),
          end: firestore.Timestamp.fromDate(new Date(event.start)),
          registrationLink: event.registrationLink,
          feedbackLink: event.feedbackLink,
          registrationAllowed: event.registrationAllowed,
          feedbackAllowed: event.feedbackAllowed
        });
      }
    },
    updateEvent ({ commit }, event) {
      db.collection('events')
        .doc(event.id)
        .update({
          title: event.title,
          cover: event.cover,
          description: event.description,
          venue: event.venue,
          start: event.start,
          end: event.end,
          registrationLink: event.registrationLink,
          feedbackLink: event.feedbackLink,
          registrationAllowed: event.registrationAllowed,
          feedbackAllowed: event.feedbackAllowed
        })
        .then(() => {
          commit('setIsSlightLoaderShown', false);
          Toast.open('Updated');
        })
        .catch(error => {
          commit('setIsSlightLoaderShown', false);
          window.alert('error: ' + error);
        });
    },
    deleteEvent ({ commit }, id) {
      db.collection('events')
        .doc(id)
        .delete()
        .then(() => {
          Toast.open('Deleted');
        });
    },
    loadEvents ({ commit }) {
      commit('setIsSlightLoaderShown', true);
      db.collection('events')
        .orderBy('start', 'desc')
        .onSnapshot(snapshot => {
          commit('setIsSlightLoaderShown', false);
          var events = snapshot.docs.map(doc => {
            // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setEvents', events);
        });
    }
  }
};
