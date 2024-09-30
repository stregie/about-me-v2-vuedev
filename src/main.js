import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/css/main.scss';
import './assets/css/layout.scss';

import App from './App.vue';
import Main from './Main.vue';
import FileManagerTest from '/src/components/Test/file-manager-test.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  	{ path: '/filemanager/', component: Main },
  	{ path: '/filemanager/filemanager-test/', component: FileManagerTest },
  ]
});

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(router);
app.mount('#app');