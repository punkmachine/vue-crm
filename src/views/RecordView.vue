<template>
	<div>
		<div class="page-title">
			<h3>Новая запись</h3>
		</div>

		<app-loader v-if="loading" />

		<p class="center" v-else-if="!(categories.length > 0)">
			Категорий пока нет.
			<router-link to="/categories">Создать категорию</router-link>
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
				<label>Выберите категорию</label>
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
					<span>Доход</span>
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
					<span>Расход</span>
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
				<label for="amount">Сумма</label>
				<span
					class="helper-text invalid"
					v-if="$v.sum.$dirty && !$v.sum.required"
				>
					Сумма обязательным полем
				</span>
				<span
					class="helper-text invalid"
					v-else-if="$v.sum.$dirty && !$v.sum.minValue"
				>
					Нельзя использовать значение меньше 100 тенге
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
				<label for="description">Описание</label>
				<span
					class="helper-text invalid"
					v-if="$v.description.$dirty && !$v.description.required"
				>
					Описание является обязательным полем
				</span>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Создать
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
		await this.$store.dispatch("fetchAllCategories", {
			uid: this.$store.getters.getUid,
		});
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
							uid: this.$store.getters.getUid,
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
							uid: this.$store.getters.getUid,
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