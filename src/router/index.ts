import { createRouter, createWebHistory, type Router } from 'vue-router';
import config from '@/config';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory(config.BASE_URL),
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
  routes: routes,
});

router.afterEach(async (to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  setTimeout(() => {
    // set current url -> mount 1 component -> get previousUrl -> set jsPreviousUrl
    window.jmPreviousRouteName = String(to.name);
  }, 500);
});

export default router;
