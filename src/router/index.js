import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/HomeView'),
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
		path: '/register',
		name: 'register',
		meta: {
			layout: 'empty',
		},
		component: () => import('../views/RegisterView'),
	},
	{
		path: '/record',
		name: 'record',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/RecordView'),
	},
	{
		path: '/categories',
		name: 'categories',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/CategoriesView'),
	},
	{
		path: '/profile',
		name: 'profile',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/ProfileView'),
	},
	{
		path: '/planning',
		name: 'planning',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/PlanningView'),
	},
	{
		path: '/history',
		name: 'history',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/HistoryView'),
	},
	{
		path: '/record-detail/:id',
		name: 'record-detail',
		meta: {
			layout: 'main',
		},
		component: () => import('../views/DetailRecordView'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
