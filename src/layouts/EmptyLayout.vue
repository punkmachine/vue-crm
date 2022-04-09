<template>
	<div class="grey darken-1 empty-layout">
		<router-view />
	</div>
</template>

<script>
import messages from '@/constants/messages';

export default {
	name: 'empty-layout',
	computed: {
		error() {
			return this.$store.getters.error;
		},
	},
	watch: {
		error(fbError) {
			this.$error(messages[fbError] ?? 'Что-то пошло не так');
		},
	},
};
</script>
