<template>
	<div class="col s12 m6 l4">
		<div class="card light-blue bill-card">
			<div class="card-content white-text">
				<span class="card-title">Счет в валюте</span>

				<p
					v-for="currency in currencies"
					:key="currency"
					class="currency-line"
				>
					<span>
						{{ getCurrency(currency) | currency(currency) }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "home-bill",
	props: {
		rates: { type: Object },
	},
	data() {
		return {
			currencies: ["KZT", "RUB", "EUR", "USD"],
		};
	},
	computed: {
		money() {
			return this.$store.getters.getUser.money ?? 0;
		},
	},
	methods: {
		getCurrency(currency) {
			return Math.floor(this.money * this.rates[currency]);
		},
	},
};
</script>