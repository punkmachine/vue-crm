<template>
	<div>
		<div>
			<div class="breadcrumb-wrap">
				<router-link to="/history" class="breadcrumb">
					{{ "Menu_History" | localize }}
				</router-link>
				<a @click.prevent class="breadcrumb">
					{{
						record.type === "income"
							? "Income"
							: "Outcome" | localize
					}}
				</a>
			</div>

			<app-loader v-if="loading" />

			<p class="center" v-else-if="!record">Такой записи не существует</p>

			<div class="row" v-else>
				<div class="col s12 m6">
					<div
						class="card"
						:class="{
							red: record.type === 'outcome',
							green: record.type === 'income',
						}"
					>
						<div class="card-content white-text">
							<p>
								{{ "Description" | localize }}:
								{{ record.description }}
							</p>
							<p>
								{{ "Amount" | localize }}:
								{{ record.sum | currency }}
							</p>
							<p>
								{{ "Category" | localize }}:
								{{ category.title }}
							</p>

							<small>
								{{ new Date(record.date) | date("date") }}
							</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecordDetail",
	metaInfo() {
		return {
			title: this.$title("Detail_Title"),
		};
	},
	data() {
		return {
			record: null,
			loading: true,
			category: null,
		};
	},
	async mounted() {
		const { id, categoryId } = this.$route.params;

		this.record = await this.$store.dispatch("fetchRecord", {
			id,
			categoryId,
		});
		this.category = await this.$store.dispatch("fetchCategory", {
			categoryId,
		});

		this.loading = false;
	},
};
</script>