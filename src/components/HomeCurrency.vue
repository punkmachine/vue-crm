<template>
	<div class="col s12 m6 l8">
		<div class="card orange darken-3 bill-card">
			<div class="card-content white-text">
				<div class="card-header">
					<span class="card-title">
						Курс валют по отношению к тенге
					</span>
				</div>
				<table>
					<thead>
						<tr>
							<th>Валюта</th>
							<th>Курс</th>
							<th>Дата</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="currency in currencies" :key="currency">
							<td>{{ currency }}</td>
							<td>
								{{
									(rates[currency] ^ 0) === rates[currency]
										? rates[currency]
										: rates[currency].toFixed(5)
								}}
							</td>
							<td>{{ date | date("date") }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "home-currency",
	data() {
		return {
			currencies: ["KZT", "RUB", "EUR", "USD"],
		};
	},
	props: {
		rates: { type: Object },
		date: { type: Date },
	},
};
</script>