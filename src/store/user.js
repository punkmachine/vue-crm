import { getDatabase, ref, onValue } from "firebase/database";

export default {
	state: {
		user: {},
	},
	getters: {
		getUser: (state) => state.user,
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
		fetchInfoUser({ commit }, { uid }) {
			try {
				const database = getDatabase();
				const dataRef = ref(database, `/users/${uid}`);
				onValue(dataRef, (snapshot) => {
					const data = snapshot.val();
					commit('setUser', data);
				});
			} catch (error) {
				console.log(error);
			}

		}
	},
}