<template>
	<div>
		<div class="page-title">
			<h3>{{ "Menu_NewRecord" | localize }}</h3>
		</div>

		<app-loader v-if="loading" />

		<p class="center" v-else-if="!(categories.length > 0)">
			{{ "NoCategories" | localize }}
			<router-link to="/categories">
				{{ "AddFirst" | localize }}
			</router-link>
		</p>

		<form v-else class="form" @submit.prevent="createRecord">
			<div class="input-field">
				<select ref="select" v-model="selectCategory">
					<option
						v-for="category in categories"
						:key="category.id"
						:value="category.id"
					>
						{{ category.title }}
					</option>
				</select>
				<label>{{ "SelectCategory" | localize }}</label>
			</div>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="income"
						v-model="type"
					/>
					<span>{{ "Income" | localize }}</span>
				</label>
			</p>

			<p>
				<label>
					<input
						class="with-gap"
						name="type"
						type="radio"
						value="outcome"
						v-model="type"
					/>
					<span>{{ "Outcome" | localize }}</span>
				</label>
			</p>

			<div class="input-field">
				<input
					id="amount"
					type="number"
					v-model.number="sum"
					:class="{
						invalid:
							$v.sum.$dirty &&
							(!$v.sum.required || !$v.sum.minValue),
					}"
				/>
				<label for="amount">{{ "Amount" | localize }}</label>
				<span
					class="helper-text invalid"
					v-if="$v.sum.$dirty && !$v.sum.minValue"
				>
					{{ "Message_MinLength" | localize }}
					{{ $v.amount.$params.minValue.min }}
				</span>
			</div>

			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model.trim="description"
					:class="{
						invalid:
							$v.description.$dirty && !$v.description.required,
					}"
				/>
				<label for="description">{{ "Description" | localize }}</label>
				<span
					class="helper-text invalid"
					v-if="$v.description.$dirty && !$v.description.required"
				>
					{{ "Message_EnterDescription" | localize }}
				</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				{{ "Create" | localize }}
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import M from "materialize-css";
import { required, minValue } from "vuelidate/lib/validators";

export default {
	name: "record-create",
	metaInfo() {
		return {
			title: this.$title("Menu_NewRecord"),
		};
	},
	data() {
		return {
			description: "",
			select: null,
			sum: 100,
			loading: true,
			categories: [],
			selectCategory: null,
			type: "outcome",
		};
	},
	validations: {
		description: { required },
		sum: { required, minValue: minValue(100) },
	},
	async mounted() {
		await this.$store.dispatch("fetchAllCategories");
		this.categories = this.$store.getters.getCategoriesArray;
		this.loading = false;

		if (this.categories.length > 0) {
			this.selectCategory = this.categories[0].id;
		}

		setTimeout(() => {
			this.select = M.FormSelect.init(this.$refs.select);
			M.updateTextFields();
		}, 0);
	},
	beforeDestroy() {
		if (this.select?.destroy) {
			this.select.destroy();
		}
	},
	computed: {
		canCreateRecord() {
			return (
				this.$store.getters.getUser.money >= this.sum ||
				this.type === "income"
			);
		},
	},
	methods: {
		async createRecord() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				if (this.canCreateRecord) {
					try {
						await this.$store.dispatch("createRecord", {
							description: this.description,
							categoryId: this.selectCategory,
							type: this.type,
							sum: this.sum,
							date: new Date().toJSON(),
						});

						const newMoney =
							this.type === "income"
								? this.$store.getters.getUser.money + this.sum
								: this.$store.getters.getUser.money - this.sum;

						await this.$store.dispatch("updateUser", {
							money: newMoney,
						});

						this.$message("Запись успешно создана");

						this.$v.$reset();

						this.description = "";
						this.sum = 100;
						this.type = "outcome";
					} catch (error) {
						console.log(error);
					}
				} else {
					this.$error("Недостаточно средств на вашем счете.");
				}
			}
		},
	},
};
</script>