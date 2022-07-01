import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import '@/assets/css/main.css';

const pinia = createPinia();
const forumApp = createApp(App);
forumApp.use(router);
forumApp.use(pinia);

forumApp.mount('#app');
