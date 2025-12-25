import Layout from '@/components/Layout.vue';

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('@/pages/Home.vue'),
				meta: {
					title: '首页',
				},
			},
		],
	},
];

export default routes;
