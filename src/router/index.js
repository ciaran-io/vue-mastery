import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import ThreadDisplay from '@/pages/ThreadDisplay.vue';
import NotFound from '@/pages/NotFound.vue';
import { threads } from '@/data/data.json';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thread/id=:id',
    name: 'ThreadDisplay',
    component: ThreadDisplay,
    props: true,
    beforeEnter(to, from, next) {
      // check if the thread exists
      const threadExists = threads.find((thread) => thread.id === to.params.id);
      // if exixts continue
      if (threadExists) {
        return next();
      } else {
        next({
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash parameters
          query: to.query,
          hash: to.hash,
        });
      }
      // if not found redirect to not
    },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
