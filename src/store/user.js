import { getDatabase, ref, onValue, update } from "firebase/database";

export default {
	state: {
		user: {},
	},
	getters: {
		getUser: (state) => ({
			...state.user
		}),
	},
	mutations: {
		setUser(state, user) {
			state.user = { ...user };
		},
		clearUser(state) {
			state.user = {};
		}
	},
	actions: {
		fetchInfoUser({ commit, getters }) {
			try {
				const uid = getters.getUid;
				const database = getDatabase();
				const dataRef = ref(database, `/users/${uid}`);
				onValue(dataRef, (snapshot) => {
					const data = snapshot.val();
					commit('setUser', data);
				});
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		},
		async updateUser({ commit, getters }, newData) {
			try {
				const uid = getters.getUid;
				const dataUser = {
					...getters.getUser,
					...newData,
				};

				const db = getDatabase();
				const dbRef = ref(db);

				let updates = {};
				updates[`/users/${uid}`] = {
					...dataUser
				};

				await update(dbRef, updates);
				commit('setUser', dataUser);
			} catch (error) {
				commit('setError', error);
				throw error;
			}
		}
	},
}