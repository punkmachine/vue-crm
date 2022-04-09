<template>
	<div class="col s12 m6">
		<div>
			<div class="page-subtitle">
				<h4>Редактировать</h4>
			</div>

			<form @submit.prevent="submitUpdate">
				<div class="input-field">
					<select ref="select" v-model="current">
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
					Обновить
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
	name: "category-update",
	props: {
		categories: Array,
	},
	data() {
		return {
			select: null,
			title: "",
			limit: 0,
			current: null,
		};
	},
	validations: {
		title: { required },
		limit: { required, minValue: minValue(1000) },
	},
	watch: {
		current(id) {
			const item = this.categories.find((category) => category.id === id);
			this.writeValues(item);
		},
	},
	created() {
		this.writeValues(this.categories[0]);
	},
	mounted() {
		this.select = M.FormSelect.init(this.$refs.select);
		M.updateTextFields();
	},
	beforeDestroy() {
		if (this.select?.destroy) {
			this.select.destroy();
		}
	},
	methods: {
		writeValues(item) {
			const { id, title, limit } = item;

			this.current = id;
			this.limit = limit;
			this.title = title;
		},
		async submitUpdate() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				try {
					const categoryData = {
						title: this.title,
						limit: this.limit,
						id: this.current,
						uid: this.$store.getters.getUid,
					};

					await this.$store.dispatch("categoryUpdate", categoryData);

					this.$message(
						`Категория ${categoryData.title} была успешно обновлена`
					);
					this.$emit("updated", categoryData);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>