const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home/index.vue'),
		meta: {
			title: '首页',
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('@/views/About/index.vue'),
		meta: {
			title: '关于',
		},
	},
	// 404 页面 - 匹配所有未定义的路由
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/404/index.vue'),
		meta: {
			title: '页面不存在',
		},
	},
];

export default routes;
