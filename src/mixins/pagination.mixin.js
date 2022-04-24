export default {
	data() {
		return {
			page: +this.$route.query.page ? +this.$route.query.page : 1,
			pageSize: 5,
			pageCount: 0,
			allItems: [],
			showItems: [],
		}
	},
	methods: {
		setupPagination(array) {
			let newAllItems = [[]];
			let newAllItemsIndex = 0;

			array.forEach((item, index) => {
				newAllItems[newAllItemsIndex] = [...newAllItems[newAllItemsIndex], item];

				if ((index + 1) / this.pageSize === 1) {
					newAllItems.push([]);
					newAllItemsIndex++;
				}
			});

			this.allItems = [...newAllItems];
			this.pageCount = newAllItems.length;
			this.showItems = [...newAllItems[this.page - 1]] ?? [...newAllItems[0]];
		},
		paginationClick(page) {
			this.showItems = [...this.allItems[page - 1]] ?? [...this.allItems[0]];
			this.page = page;
			this.$router.push(`${this.$route.path}?page=${page}`);
		},
	}
}