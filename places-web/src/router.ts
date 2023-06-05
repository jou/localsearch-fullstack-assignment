import { Router, createRouter, createWebHistory } from 'vue-router';

import HelloWorldPage from './pages/HelloWorldPage.vue';
import PlaceListingPage from './pages/PlaceListingPage.vue';
import PlaceDetailPage from './pages/PlaceDetailPage.vue';

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/places', component: PlaceListingPage },
        {
            path: '/places/:placeId',
            component: PlaceDetailPage,
            props(route) {
                return {
                    placeId: route.params.placeId,
                };
            },
        },
        { path: '/hello', component: HelloWorldPage },
        { path: '/', redirect: '/places' },
    ],
});

export default router;
