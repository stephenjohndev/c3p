import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Style
import './assets/style.sass';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faHome, faBullhorn, faCalendarAlt, faImages, faAngleLeft, faEllipsisV, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus, faHome, faAngleLeft, faBullhorn, faCalendarAlt, faImages, faEllipsisV, faStar);

Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App); }
}).$mount('#app');
