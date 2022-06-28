import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import './assets/css/main.css';

const forumApp = createApp(App);
forumApp.use(router);
forumApp.mount('#app');
