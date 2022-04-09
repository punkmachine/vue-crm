import { getDatabase, ref, set } from "firebase/database";
import uniqid from 'uniqid';

export default {
	actions: {
		async createCategory({ commit }, { title, limit, uid }) {
			try {
				const database = getDatabase();
				const id = uniqid();
				await set(ref(database, `/users/${uid}/categories/${id}`), {
					limit,
					title,
					id
				});

				return {
					title, limit, id,
				}
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		}
	},
}