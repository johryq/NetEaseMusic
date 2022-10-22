import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ItemList from '../views/ItemList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/itemmusic',
    name: 'ItemList',
    component: ItemList,
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
