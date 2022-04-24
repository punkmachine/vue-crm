<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas ref="canvas"></canvas>
		</div>

		<app-loader v-if="loading" />

		<p class="center" v-else-if="!(categories.length > 0)">
			Записей пока нет.
			<router-link to="/record">Создать запись</router-link>
		</p>

		<section v-else>
			<HistoryTable :records="showItems" />

			<app-paginate
				v-model="page"
				:page-count="pageCount"
				:click-handler="paginationClick"
				:prev-text="'Пред.'"
				:next-text="'След.'"
				:container-class="'pagination'"
				:page-class="'waves-effect'"
			/>
		</section>
	</div>
</template>

<script>
/* eslint-disable */

import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable.vue";
import { Pie } from "vue-chartjs";

export default {
	name: "HistoryView",
	extends: Pie,
	mixins: [paginationMixin],
	data() {
		return {
			loading: true,
			categories: [],
			records: [],
		};
	},
	components: {
		HistoryTable,
	},
	methods: {
		mappingCategories(categories) {
			return categories
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
		},
		mappingRecords(categories) {
			let recordsArray = [];

			categories.forEach((category) => {
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
		this.categories = this.mappingCategories(
			this.$store.getters.getCategoriesArray
		);
		this.records = this.mappingRecords(this.categories);
		this.setupPagination(this.records);

		const dataChart = [
			...this.categories
				.filter((item) => item.records)
				.map((item) => {
					const spent = item.records.reduce(
						(prevValue, currentValue) => {
							return currentValue.type === "outcome"
								? (prevValue += currentValue.sum)
								: (prevValue = prevValue - currentValue.sum);
						},
						0
					);

					return spent;
				}),
		];

		this.renderChart({
			labels: [
				...this.categories
					.filter((item) => item.records)
					.map((item) => item.title),
			],
			datasets: [
				{
					label: "Расходы по категориям",
					data: dataChart,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		});

		this.loading = false;
	},
};
</script>