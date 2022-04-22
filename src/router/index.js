import Vue from 'vue';
import VueRouter from 'vue-router';
import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		meta: {
			layout: 'main',
			auth: true,
		},
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
			auth: true,
		},
		component: () => import('../views/RecordView'),
	},
	{
		path: '/categories',
		name: 'categories',
		meta: {
			layout: 'main',
			auth: true,
		},
		component: () => import('../views/CategoriesView'),
	},
	{
		path: '/profile',
		name: 'profile',
		meta: {
			layout: 'main',
			auth: true,
		},
		component: () => import('../views/ProfileView'),
	},
	{
		path: '/planning',
		name: 'planning',
		meta: {
			layout: 'main',
			auth: true,
		},
		component: () => import('../views/PlanningView'),
	},
	{
		path: '/history',
		name: 'history',
		meta: {
			layout: 'main',
			auth: true,
		},
		component: () => import('../views/HistoryView'),
	},
	{
		path: '/record-detail/:id',
		name: 'record-detail',
		meta: {
			layout: 'main',
			auth: true,
		},
		component: () => import('../views/DetailRecordView'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

/* eslint-disable */

router.beforeEach((to, from, next) => {
	const { currentUser } = getAuth();

	if ((to.meta.auth && currentUser) || !to.meta.auth) {
		next()
	} else {
		next('/login?messag=login-please')
	}
});

export default router;
