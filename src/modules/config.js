import { db } from '../firebase';

export default {
  state: {
    about: ""
  },
  mutations: {
    setAbout (state, payload) {
      state.about = payload;
    }
  },
  actions: {
    loadAbout ({ commit }) {
      db.collection('config').doc('config')
        .onSnapshot(doc => {
          
          commit('setAbout', doc.data().about);
        });
    },
  }
}
;
