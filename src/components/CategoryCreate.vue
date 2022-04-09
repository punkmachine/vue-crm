<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Создать</h4>
			</div>

			<form @submit.prevent="submitCreate">
				<div class="input-field">
					<input
						v-model="title"
						id="name"
						type="text"
						:class="{
							invalid: $v.title.$dirty && !$v.title.required,
						}"
					/>
					<label for="name">Название</label>
					<span
						class="helper-text invalid"
						v-if="$v.title.$dirty && !$v.title.required"
					>
						Название является обязательным полем
					</span>
				</div>

				<div class="input-field">
					<input
						v-model.number="limit"
						id="limit"
						type="number"
						:class="{
							invalid:
								$v.limit.$dirty &&
								(!$v.limit.required || !$v.limit.minValue),
						}"
					/>
					<label for="limit">Лимит</label>
					<span
						class="helper-text invalid"
						v-if="$v.limit.$dirty && !$v.limit.required"
					>
						Лимит является обязательным полем
					</span>
					<span
						class="helper-text invalid"
						v-else-if="$v.limit.$dirty && !$v.limit.minValue"
					>
						Нельзя использовать значение меньше 1000 тенге
					</span>
				</div>

				<button class="btn waves-effect waves-light" type="submit">
					Создать
					<i class="material-icons right">send</i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import M from "materialize-css";
import { required, minValue } from "vuelidate/lib/validators";

export default {
	name: "category-create",
	data() {
		return {
			title: "",
			limit: 1000,
		};
	},
	validations: {
		title: { required },
		limit: { required, minValue: minValue(1000) },
	},
	mounted() {
		M.updateTextFields();
	},
	methods: {
		async submitCreate() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				try {
					const category = await this.$store.dispatch(
						"createCategory",
						{
							title: this.title,
							limit: this.limit,
							uid: this.$store.getters.getUid,
						}
					);

					this.title = "";
					this.limit = 1000;
					this.$v.$reset();

					this.$message(
						`Категория ${category.title} успешно создана`
					);

					this.$emit("created", category);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>