import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CollegeBusStop from '../views/CollegeBusStop.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/collegebusstop',
    name: 'CollegeBusStop',
    component: CollegeBusStop,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
