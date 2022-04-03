/* eslint-disable */

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
	actions: {
		async login({ dispatch, commit }, { email, password }) {
			const auth = getAuth();

			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
				})
				.catch((error) => {
					throw error;
					// const errorCode = error.code;
					// const errorMessage = error.message;
				});
		},
	},
};
