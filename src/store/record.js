import uniqid from 'uniqid';
import { getDatabase, ref, set } from "firebase/database";

export default {
	actions: {
		async createRecord({ commit }, record) {
			try {
				const { uid, categoryId, description, sum, type, date } = record;
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
		}
	},
}