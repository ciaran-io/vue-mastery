import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import '@/assets/css/main.css';
import firebaseConfig from '@/config/firebase';
import { initializeApp } from 'firebase/app';

const pinia = createPinia();
const forumApp = createApp(App);

initializeApp(firebaseConfig);
forumApp.use(router);
forumApp.use(pinia);

forumApp.mount('#app');
