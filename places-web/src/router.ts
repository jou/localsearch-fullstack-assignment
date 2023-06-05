import { Router, createRouter, createWebHistory } from 'vue-router';

import HelloWorldPage from './pages/HelloWorldPage.vue';
import IndexPage from './pages/IndexPage.vue';

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: IndexPage },
        { path: '/hello', component: HelloWorldPage },
    ],
});

export default router;
