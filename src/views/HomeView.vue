<template>
	<div>
		<div class="page-title">
			<h3>{{ "Bill" | localize }}</h3>

			<button
				@click="refreshClick"
				class="btn waves-effect waves-light btn-small"
			>
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<app-loader v-if="loading" />
		<div v-else class="row">
			<HomeBill :rates="currency.rates" />
			<HomeCurrency
				:rates="currency.rates"
				:date="new Date(currency.date)"
			/>
		</div>
	</div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";

export default {
	name: "HomeView",
	data() {
		return {
			loading: true,
			currency: null,
		};
	},
	async mounted() {
		await this.getData();
	},
	methods: {
		async getData() {
			this.currency = await this.$store.dispatch("fetchCurrency");
			this.loading = false;

			await this.calcBaseCurrency();
		},
		async calcBaseCurrency() {
			if (Object.keys(this.currency.rates).length > 0) {
				const { rates } = await this.currency;

				const newRates = {
					EUR: 1 / rates.KZT,
					KZT: 1,
					RUB: (1 / rates.KZT) * rates.RUB,
					USD: (1 / rates.KZT) * rates.USD,
				};

				this.currency = {
					rates: {
						...newRates,
					},
					base: "KZT",
					date: this.currency.date,
				};
			}
		},
		async refreshClick() {
			this.loading = true;
			await this.getData();
		},
	},
	components: { HomeBill, HomeCurrency },
};
</script>
