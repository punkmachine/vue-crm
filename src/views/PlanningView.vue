<template>
	<div>
		<div class="page-title">
			<h3>Планирование</h3>
			<h4>{{ moneyUser | currency }}</h4>
		</div>

		<app-loader v-if="loading" />

		<p class="center" v-else-if="!(categories.length > 0)">
			Категорий пока нет.
			<router-link to="/categories">Создать категорию</router-link>
		</p>

		<section v-else>
			<div v-for="category in categories" :key="category.id">
				<p>
					<strong>{{ category.title }}:</strong>
					{{ category.spent | currency }} из
					{{ category.limit | currency }}
				</p>
				<div class="progress" v-tooltip="category.tooltip">
					<div
						class="determinate"
						:class="category.progressColor"
						:style="{
							width: `${category.percent}%`,
						}"
					></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { currencyFilter } from "@/filters/currency.filter";

export default {
	name: "PlanningView",
	data() {
		return {
			loading: true,
			categories: [],
			moneyUser: 0,
		};
	},
	methods: {
		сountingMoneySpent(categories) {
			const newCategories = categories.map((item) => {
				let newItem = {};

				const newRecords = Object.keys(item.records ?? []).map(
					(record) => ({
						...item.records[record],
						id: record,
					})
				);

				const spent = newRecords.reduce((prevValue, currentValue) => {
					return currentValue.type === "outcome"
						? (prevValue += currentValue.sum)
						: (prevValue = prevValue - currentValue.sum);
				}, 0);

				const percent = (100 * spent) / item.limit;

				const progressColor =
					percent <= 50 ? "green" : percent <= 75 ? "yellow" : "red";

				const tooltip = `Осталось ${currencyFilter(
					item.limit - spent
				)}`;

				newItem = {
					...item,
					records: [...newRecords],
					spent,
					percent,
					progressColor,
					tooltip,
				};

				return (item = {
					...newItem,
				});
			});

			return newCategories;
		},
	},
	async mounted() {
		await this.$store.dispatch("fetchAllCategories");
		this.categories = [
			...this.сountingMoneySpent([
				...this.$store.getters.getCategoriesArray,
			]),
		];

		this.moneyUser = this.$store.getters.getUser.money;

		this.loading = false;
	},
};
</script>