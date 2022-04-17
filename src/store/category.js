import { getDatabase, ref, set, child, get, update } from "firebase/database";
import uniqid from 'uniqid';

export default {
	state: {
		categories: {},
	},
	getters: {
		getCategoriesArray(state) {
			let newCategories = [];

			for (let key in state.categories) {
				newCategories.push(state.categories[key]);
			}

			return newCategories;
		}
	},
	mutations: {
		setCategories(state, categories) {
			state.categories = { ...categories };
		}
	},
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
		},

		async fetchAllCategories({ commit }, { uid }) {
			try {
				const db = getDatabase();
				const dbRef = ref(db);
				const categories = await get(child(dbRef, `users/${uid}/categories/`))
					.then((snapshot) => {
						if (snapshot.exists()) {
							return snapshot.val();
						}
					}).catch((error) => {
						console.error(error);
					});

				commit('setCategories', categories);
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		},

		async categoryUpdate({ commit }, { uid, title, limit, id }) {
			try {
				const db = getDatabase();
				const dbRef = ref(db);

				let updates = {};
				updates[`/users/${uid}/categories/${id}`] = {
					id, limit, title
				};

				await update(dbRef, updates);
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		}
	},
}