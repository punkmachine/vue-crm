/* eslint-disable */

import {
	getAuth,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

export default {
	actions: {
		async login({ dispatch, commit }, { email, password }) {
			const auth = getAuth();

			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
				})
				.catch((error) => {
					const errorCode = error.code;
					commit('setError', errorCode);
					throw error;
				});
		},

		async register({ dispatch, commit }, { email, password, name }) {
			const auth = getAuth();

			await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					const { uid } = user;

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

		async exit() {
			const auth = getAuth();

			await signOut(auth)
				.then(() => {
					console.log('Успешно!');
				})
				.catch((error) => {
					console.log('error exit >>>', error);
				});
		},
	},
};
