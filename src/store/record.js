import uniqid from 'uniqid';
import { getDatabase, ref, set, child, get } from "firebase/database";

/* eslint-disable */

export default {
	actions: {
		async createRecord({ commit, getters }, record) {
			try {
				const uid = getters.getUid;
				const { categoryId, description, sum, type, date } = record;
				const database = getDatabase();
				const id = uniqid();

				await set(ref(database, `/users/${uid}/categories/${categoryId}/records/${id}`), {
					sum,
					description,
					id,
					date,
					type
				});
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		},
		async fetchRecord({ commit, getters }, { id, categoryId }) {
			try {
				const uid = getters.getUid;
				const db = getDatabase();
				const dbRef = ref(db);
				const record = await get(child(dbRef, `users/${uid}/categories/${categoryId}/records/${id}`))
					.then((snapshot) => {
						if (snapshot.exists()) {
							return snapshot.val();
						}
					}).catch((error) => {
						console.error(error);
					});

				return record;
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		}
	},
}