import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/Create.vue'),
    },
    {
      path: '/createGQL',
      name: 'createGQL',
      component: () => import('./views/CreateGQL.vue'),
    },
    {
      path: '/:id',
      name: 'one',
      component: () => import('./views/One.vue'),
    },
  ],
});
