<template>
	<form class="card auth-card" @submit.prevent="submitLogin">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>
			<div class="input-field">
				<input
					id="email"
					type="text"
					v-model.trim="email"
					:class="{
						invalid:
							$v.email.$dirty &&
							(!$v.email.required || !$v.email.email),
					}"
				/>
				<label for="email">Email</label>
				<small
					class="helper-text invalid"
					v-if="$v.email.$dirty && !$v.email.required"
				>
					Поле email обязательно к заполнению
				</small>
				<small
					class="helper-text invalid"
					v-else-if="$v.email.$dirty && !$v.email.email"
				>
					Вы не правильно заполнили поле email
				</small>
			</div>
			<div class="input-field">
				<input
					id="password"
					type="password"
					v-model="password"
					:class="{
						invalid:
							$v.password.$dirty &&
							(!$v.password.required || !$v.password.minLength),
					}"
				/>
				<label for="password">Пароль</label>
				<small
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.required"
				>
					Поле пароля обязательно к заполнению
				</small>
				<small
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.minLength"
				>
					Пароль должен содержать минимум 6 символов
				</small>
			</div>
		</div>
		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
				>
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/constants/messages";

export default {
	name: "app-login",
	metaInfo() {
		return {
			title: this.$title("Login"),
		};
	},
	data() {
		return {
			email: "",
			password: "",
		};
	},
	validations: {
		email: { email, required },
		password: { required, minLength: minLength(6) },
	},
	mounted() {
		if (messages[this.$route.query.message]) {
			this.$message(messages[this.$route.query.message]);
		}
	},
	methods: {
		async submitLogin() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				const formData = {
					email: this.email,
					password: this.password,
				};

				try {
					await this.$store.dispatch("login", formData);
					this.$router.push("/");
				} catch (error) {
					console.log("error >>>", error);
				}
			}
		},
	},
};
</script>
