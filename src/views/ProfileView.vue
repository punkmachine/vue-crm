<template>
	<div>
		<div class="page-title">
			<h3>{{ "ProfileTitle" | localize }}</h3>
		</div>

		<form class="form" @submit.prevent="submitUpdate">
			<div class="input-field">
				<input
					id="description"
					type="text"
					v-model="name"
					:class="{
						invalid: $v.name.$dirty && !$v.name.required,
					}"
				/>
				<label for="description">{{
					"Message_EnterName" | localize
				}}</label>
				<small
					class="helper-text invalid"
					v-if="$v.name.$dirty && !$v.name.required"
				>
					{{ "NameRequired" | localize }}
				</small>
			</div>

			<div class="switch switch-mb">
				<label>
					English
					<input type="checkbox" v-model="locale" />
					<span class="lever"></span>
					Русский
				</label>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				{{ "Update" | localize }}
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import M from "materialize-css";

export default {
	name: "profileView",
	metaInfo() {
		return {
			title: this.$title("ProfileTitle"),
		};
	},
	data() {
		return {
			name: "",
			locale:
				!localStorage.getItem("locale") ||
				localStorage.getItem("locale") === "ru-RU",
		};
	},
	validations: {
		name: { required },
	},
	mounted() {
		this.name = this.$store.getters.getUser.name;
		setTimeout(() => {
			M.updateTextFields();
		}, 0);
	},
	methods: {
		async submitUpdate() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				const newLocale = this.locale ? "ru-RU" : "en-US";

				try {
					await this.$store.dispatch("updateUser", {
						name: this.name,
					});

					localStorage.setItem("locale", newLocale);
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>