import Vue from 'vue';
import { Vuelidate } from 'vuelidate';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'materialize-css/dist/js/materialize.min.js';

import App from './App.vue';

import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';

import Loader from '@/components/app/Loader.vue';

import { dateFilter } from '@/filters/date.filter';
import { currencyFilter } from '@/filters/currency.filter';

import tooltipDirective from '@/directives/tooltip.directive';

import messagePlugin from '@/utils/message.plugin';

Vue.config.productionTip = false;

Vue.component('app-loader', Loader);

Vue.directive('tooltip', tooltipDirective);

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

const firebaseConfig = {
	apiKey: 'AIzaSyDvoMlJHjtRYdexfsI2uAvSrJBfybPHLT4',
	authDomain: 'vue-crm-19f50.firebaseapp.com',
	projectId: 'vue-crm-19f50',
	storageBucket: 'vue-crm-19f50.appspot.com',
	messagingSenderId: '962104872676',
	appId: '1:962104872676:web:aa251bcf56d15ffa5b66f1',
	measurementId: 'G-KG26GENTTC',
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
