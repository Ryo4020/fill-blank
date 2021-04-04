import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Exercise from '../views/Exercise.vue';
import Edit from '../views/Edit.vue';

import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: Exercise
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter: (to, from, next) => {
      // ログインしていない場合、ホームに戻す
      if (store.state.auth.isAuthed) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;