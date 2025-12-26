import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import '@/styles/tailwind.css';
import '@/styles/index.less';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#root');
