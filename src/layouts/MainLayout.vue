<template>
	<div>
		<div class="app-main-layout">
			<main class="app-content">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn">
				<a class="btn-floating btn-large blue">
					<i class="large material-icons">add</i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'main-layout',
};
</script>
