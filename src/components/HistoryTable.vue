<template>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Сумма</th>
				<th>Дата</th>
				<th>Категория</th>
				<th>Тип</th>
				<th>Открыть</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(record, index) in records" :key="record.id">
				<td>{{ index + 1 }}</td>
				<td>{{ record.sum | currency }}</td>
				<td>{{ new Date(record.date) | date("datetime") }}</td>
				<td>{{ record.categoryName }}</td>
				<td>
					<span class="white-text badge" :class="record.typeClass">
						{{ record.typeText }}
					</span>
				</td>
				<td>
					<button
						v-tooltip="'Подробнее'"
						class="btn-small btn"
						@click="
							$router.push(
								`/record-detail/id=${record.id}&categoryId=${record.categoryId}`
							)
						"
					>
						<i class="material-icons">open_in_new</i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "history-table",
	props: {
		records: Array,
	},
};
</script>