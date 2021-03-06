import Vue from 'vue';

import { Vuelidate } from 'vuelidate';
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import 'materialize-css/dist/js/materialize.min.js';

import App from './App.vue';

import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

import Loader from '@/components/app/Loader.vue';

import { dateFilter } from '@/filters/date.filter';
import { currencyFilter } from '@/filters/currency.filter';
import { localizeFilter } from '@/filters/localize.filter';

import tooltipDirective from '@/directives/tooltip.directive';

import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';

Vue.config.productionTip = false;

Vue.component('app-loader', Loader);
Vue.component('app-paginate', Paginate);

Vue.directive('tooltip', tooltipDirective);

Vue.use(Vuelidate);
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

Vue.use(messagePlugin);
Vue.use(titlePlugin);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let appVue;

auth.onAuthStateChanged(() => {
	if (!appVue) {
		appVue = new Vue({
			router,
			store,
			render: (h) => h(App),
		}).$mount('#app');
	}
});
