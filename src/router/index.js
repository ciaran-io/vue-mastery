import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '@/components/PageHome.vue';
import PageThreadDisplay from '@/components/PageThreadDisplay.vue';

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

export default createRouter({
  history: createWebHistory(),
  routes,
});
