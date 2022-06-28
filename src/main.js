import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '@/components/PageHome.vue';
import PageThreadDisplay from '@/components/PageThreadDisplay.vue';

import './assets/css/main.css';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome,
  },
  {
    path: '/thread/id=:id',
    name: 'ThreadDisplay',
    component: PageThreadDisplay,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const forumApp = createApp(App);
forumApp.use(router);
forumApp.mount('#app');
