<template>
	<div>
		<app-loader v-if="loading" />
		<div v-else class="app-main-layout">
			<Navbar @click="isOpen = !isOpen" />
			<Sidebar :isOpen="isOpen" />

			<main class="app-content" :class="{ full: !isOpen }">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn">
				<router-link to="/record" class="btn-floating btn-large blue">
					<i
						class="large material-icons"
						v-tooltip="'Добавить запись'"
					>
						add
					</i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import messages from "@/constants/messages";

export default {
	name: "main-layout",
	data() {
		return {
			isOpen: true,
			loading: true,
		};
	},
	async mounted() {
		if (!this.$store.getters.getUid) {
			await this.$store.dispatch("checkAuth");
		}

		await this.$store.dispatch("fetchInfoUser");

		this.loading = false;
	},
	components: {
		Navbar,
		Sidebar,
	},
	computed: {
		error() {
			return this.$store.getters.error;
		},
	},
	watch: {
		error(fbError) {
			this.$error(messages[fbError] ?? "Что-то пошло не так");
		},
	},
};
</script>
