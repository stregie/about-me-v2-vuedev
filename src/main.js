import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/css/main.scss';

import App from './App.vue';
import Main from './components/main.vue';
// import Main from './components/test-stores.vue';
import FileUploaderTest from './components/file-uploader-test.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  	{ path: '/fileuploader-vue/', component: Main },
  	{ path: '/fileuploader-vue/file-uploader-test/', component: FileUploaderTest },
  ]
});

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(router);
app.mount('#app');