<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<app-loader v-if="loading" />
			<div v-else class="row">
				<CategoryCreate @created="addNewCategory" />
				<CategoryUpdate
					v-if="categories.length > 0"
					@updated="updateCategories"
					:categories="categories"
					:key="categories.length + updateCount"
				/>
				<p v-else class="center">Категории еще не созданы.</p>
			</div>
		</section>
	</div>
</template>

<script>
import CategoryUpdate from "@/components/CategoryUpdate.vue";
import CategoryCreate from "@/components/CategoryCreate.vue";

export default {
	name: "CategoriesView",
	data() {
		return {
			categories: [],
			loading: true,
			updateCount: 0,
		};
	},
	components: {
		CategoryCreate,
		CategoryUpdate,
	},
	methods: {
		addNewCategory(category) {
			this.categories.push(category);
			console.log(this.categories);
		},
		updateCategories(categoryData) {
			const index = this.categories.findIndex(
				(category) => category.id === categoryData.id
			);

			this.categories[index] = {
				...categoryData,
			};

			this.updateCount++;
		},
	},
	async mounted() {
		const newCategories = await this.$store.dispatch("fetchAllCategories", {
			uid: this.$store.getters.getUid,
		});
		this.loading = false;

		for (let key in newCategories) {
			this.categories.push(newCategories[key]);
		}
	},
};
</script>