import { Router, createRouter, createWebHistory } from 'vue-router';

import HelloWorldPage from './pages/HelloWorldPage.vue';

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/hello', component: HelloWorldPage }],
});

export default router;
