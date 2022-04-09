import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		error: null,
	},
	getters: {
		error: (state) => state.error,
	},
	mutations: {
		setError(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		},
	},
	actions: {
		async fetchCurrency() {
			const key = process.env.VUE_APP_FIXER_API_KEY;
			const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,KZT`);
			return await res.json();
		},
	},
	modules: {
		auth, user
	},
});
