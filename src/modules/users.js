import { db } from '../firebase';

export default {
  state: {
    users: [{
      email: ''
    }]
  },
  mutations: {
    setUsers (state, payload) {
      state.users = payload;
    }
  },
  actions: {
    loadUsers ({ commit }) {
      commit('setIsSlightLoaderShown', true);
      db.collection('users')
        .onSnapshot(snapshot => {
          var users = snapshot.docs.map(doc => {
          // Get document data object
            var docObject = doc.data();
            // Add id key to data object
            docObject.id = doc.id;
            // Return the new data object
            return docObject;
          });
          commit('setUsers', users);
          commit('setIsSlightLoaderShown', false);
        });
    },
    addUser ({ commit }, payload) {
      db.collection('users')
        .add({
          email: payload
        });
    },
    removeUser ({ commit }, payload) {
      db.collection('users')
        .doc(payload)
        .delete();
    }
  }
}
;
