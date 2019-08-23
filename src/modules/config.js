import { db } from '../firebase';
import { Toast } from 'buefy/dist/components/toast';

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
      commit('setIsSlightLoaderShown', true);
      db.collection('config').doc('config')
        .onSnapshot(doc => {
          commit('setAbout', doc.data().about);
          commit('setIsSlightLoaderShown', false);
        });
    },
    saveAbout ({ commit }, payload) {
      commit('setIsSlightLoaderShown', true);
      db.collection('config').doc('config').set({
        about: payload
      }).then(()=>{
        commit('setIsSlightLoaderShown', false);
        Toast.open('Updated')
      })
    },
  }
}
;
