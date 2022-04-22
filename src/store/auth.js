import {
	getAuth,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

export default {
	state: {
		uid: null,
	},
	getters: {
		getUid: (state) => state.uid,
	},
	mutations: {
		setUid(state, uid) {
			state.uid = uid;
		},
		clearUid(state) {
			state.uid = null;
		}
	},
	actions: {
		async login({ commit }, { email, password }) {
			const auth = getAuth();

			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					const { uid } = user;
					commit('setUid', uid);
				})
				.catch((error) => {
					const errorCode = error.code;
					commit('setError', errorCode);
					throw error;
				});
		},

		async register({ commit }, { email, password, name }) {
			const auth = getAuth();

			await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					const { uid } = user;

					commit('setUid', uid);

					return uid;
				})
				.then(async (uid) => {
					const database = getDatabase();
					await set(ref(database, `/users/${uid}`), {
						money: 10000,
						name,
					});
				})
				.catch((error) => {
					commit('setError', error);
					throw error;
				});
		},

		async exit({ commit }) {
			const auth = getAuth();

			await signOut(auth)
				.then(() => {
					commit('clearUser');
					commit('clearUid');
				})
				.catch((error) => {
					console.log('error exit >>>', error);
				});
		},

		checkAuth({ commit }) {
			const auth = getAuth();
			const user = auth.currentUser;
			const { uid } = user;
			commit('setUid', uid);
		}
	},
};
