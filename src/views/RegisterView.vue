<template>
	<form class="card auth-card" @submit.prevent="submitRegister">
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
			<div class="input-field">
				<input
					id="name"
					type="text"
					v-model="name"
					:class="{
						invalid: $v.name.$dirty && !$v.name.required,
					}"
				/>
				<label for="name">Имя</label>
				<small
					class="helper-text invalid"
					v-if="$v.name.$dirty && !$v.name.required"
				>
					Имя обязательно к заполнению
				</small>
			</div>
			<p>
				<label>
					<input type="checkbox" v-model="agree" />
					<span>С правилами согласен</span>
				</label>
			</p>
		</div>
		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
				>
					Зарегистрироваться
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Уже есть аккаунт?
				<router-link to="/login">Войти!</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
	name: "app-register",
	metaInfo() {
		return {
			title: this.$title("Register"),
		};
	},
	data() {
		return {
			email: "",
			password: "",
			name: "",
			agree: false,
		};
	},
	validations: {
		email: { email, required },
		password: { required, minLength: minLength(6) },
		name: { required },
		agree: { checked: (v) => v },
	},
	methods: {
		async submitRegister() {
			if (this.$v.$invalid) {
				this.$v.$touch();
			} else {
				const formData = {
					email: this.email,
					password: this.password,
					name: this.name,
				};

				try {
					await this.$store.dispatch("register", formData);
					this.$router.push("/");
				} catch (error) {
					console.log(error);
				}
			}
		},
	},
};
</script>
