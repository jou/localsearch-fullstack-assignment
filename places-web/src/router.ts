import { Router, createRouter, createWebHistory } from 'vue-router';

import HelloWorldPage from './pages/HelloWorldPage.vue';
import IndexPage from './pages/IndexPage.vue';

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/places', component: IndexPage },
        { path: '/hello', component: HelloWorldPage },
        { path: '/', redirect: '/places' },
    ],
});

export default router;
