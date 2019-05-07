import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Style
import './assets/style.sass';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faHome, faBullhorn, faCalendarAlt, faImages, faAngleLeft, faEllipsisV, faStar, faBars, faSignOutAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Firebase UI Style
import 'firebaseui/dist/firebaseui.css';

// Quill
import VueQuillEditor from 'vue-quill-editor';

// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

library.add(faPlus, faHome, faAngleLeft, faBullhorn, faCalendarAlt, faImages, faEllipsisV, faStar, faBars, faSignOutAlt, faEdit, faTrash);

Vue.component('fa', FontAwesomeIcon);

Vue.use(VueQuillEditor /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App); }
}).$mount('#app');
