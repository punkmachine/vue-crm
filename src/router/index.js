import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			layout: 'empty',
		},
		component: () => import('../views/LoginView'),
	},
	{
		path: '/categories',
		name: 'categories',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/CategoriesView'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
