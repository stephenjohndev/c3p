import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Style
import './assets/style.sass';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faHome, faBullhorn, faCalendarAlt, faImages, faAngleLeft, faEllipsisV, faStar, faBars, faSignOutAlt, faEdit, faTrash, faSearch, faPhone, faAngleRight, faAngleDown, faSave, faTimes, faUserShield, faUserCog, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Firebase UI Style
import 'firebaseui/dist/firebaseui.css';

// Quill
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// Vue carousel
import VueCarousel from 'vue-carousel';

// Vue Clazyload
import VueClazyLoad from 'vue-clazy-load';

// Line Clamp
import lineClamp from 'vue-line-clamp';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.use(VueClazyLoad);

// Odometer
Vue.use(VueCarousel);
library.add(faPlus, faHome, faAngleLeft, faAngleRight, faBullhorn, faCalendarAlt, faImages, faEllipsisV, faStar, faBars, faSignOutAlt, faEdit, faTrash, faSearch, faPhone, faAngleDown, faSave, faTimes, faFacebook, faUserCog, faUsers, faCog);
Vue.component('fa', FontAwesomeIcon);
Vue.use(lineClamp);

Vue.use(VueQuillEditor /* { default global options } */);

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App); }
}).$mount('#app');
