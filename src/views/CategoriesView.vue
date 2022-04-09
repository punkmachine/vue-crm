<template>
	<div>
		<div class="page-title">
			<h3>Категории</h3>
		</div>
		<section>
			<div class="row">
				<CategoryCreate @created="addNewCategory" />
				<CategoryUpdate />
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
	},
};
</script>