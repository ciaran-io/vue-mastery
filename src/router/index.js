import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Profile from '@/pages/Profile.vue';
import Category from '@/pages/Category.vue';
import Forum from '@/pages/Forum.vue';
import ThreadEdit from '@/pages/ThreadEdit.vue';
import ThreadCreate from '@/pages/ThreadCreate.vue';
import ThreadDisplay from '@/pages/ThreadDisplay.vue';
import NotFound from '@/pages/NotFound.vue';
import { threads } from '@/data/data.json';
import { findById } from '@/helpers/index';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/thread/:id/edit',
		name: 'ThreadEdit',
		component: ThreadEdit,
		props: true,
	},
	{
		path: '/forum/:forumId/thread/create',
		name: 'ThreadCreate',
		component: ThreadCreate,
		props: true,
	},
	{
		path: '/my-profile',
		name: 'Profile',
		component: Profile,
		meta: { toTop: true, smoothScroll: true },
	},
	{
		path: '/my-profile/edit',
		name: 'ProfileEdit',
		component: Profile,
		props: { edit: true },
	},
	{
		path: '/category/:id',
		name: 'Category',
		component: Category,
		props: true,
	},
	{
		path: '/forum/:id',
		name: 'Forum',
		component: Forum,
		props: true,
	},
	{
		path: '/thread/:id',
		name: 'ThreadDisplay',
		component: ThreadDisplay,
		props: true,
		// beforeEnter(to, from, next) {
		//   // check if the thread exists
		//   const threadExists = findById(threads, to.params.id);
		//   // if exixts continue
		//   if (threadExists) {
		//     return next();
		//   } else {
		//     next({
		//       name: 'NotFound',
		//       // preserve current path and remove the first char to avoid the target URL starting with `//`
		//       params: { pathMatch: to.path.substring(1).split('/') },
		//       // preserve existing query and hash parameters
		//       query: to.query,
		//       hash: to.hash,
		//     });
		//   }
		//   // if not found redirect to not
		// },
	},
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
		const scroll = {};
		if (to.meta.toTop) scroll.top = 0;
		if (to.meta.smoothScroll) scroll.behavior = 'smooth';

		return scroll;
	},
});

router.beforeEach(() => {
	const store = useStore();
	store.unsubscribeAllSnapshots();
});
export default router;
