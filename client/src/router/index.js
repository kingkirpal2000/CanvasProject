import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
