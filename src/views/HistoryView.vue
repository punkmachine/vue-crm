<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas></canvas>
		</div>

		<app-loader v-if="loading" />

		<p class="center" v-else-if="!(categories.length > 0)">
			Записей пока нет.
			<router-link to="/record">Создать запись</router-link>
		</p>

		<section v-else>
			<HistoryTable :records="records" />
		</section>
	</div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";

export default {
	name: "HistoryView",
	data() {
		return {
			loading: true,
			categories: [],
		};
	},
	components: {
		HistoryTable,
	},
	computed: {
		records() {
			let recordsArray = [];

			this.categories.forEach((category) => {
				recordsArray = [
					...recordsArray,
					...category.records.map((record) => {
						return {
							...record,
							categoryName: category.title,
							categoryId: category.id,
							typeClass:
								record.type === "income" ? "green" : "red",
							typeText:
								record.type === "income" ? "Доход" : "Расход",
							dateSecond: Date.parse(new Date(record.date)),
						};
					}),
				];
			});

			recordsArray = recordsArray.sort(
				(a, b) => b.dateSecond - a.dateSecond
			);

			return recordsArray;
		},
	},
	async mounted() {
		await this.$store.dispatch("fetchAllCategories");
		const newCategories = this.$store.getters.getCategoriesArray;

		this.categories = newCategories
			.filter((item) => item.records)
			.map((item) => {
				const newRecords = Object.keys(item.records).map((key) => ({
					...item.records[key],
					id: key,
				}));

				return (item = {
					...item,
					records: [...newRecords],
				});
			});

		this.loading = false;
	},
};
</script>