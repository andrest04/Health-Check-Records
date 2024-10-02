import { createRouter, createWebHistory } from "vue-router";
import homeComponents from "../public/pages/home.components.vue";
import healthChecksComponent from "../public/pages/health-checks.component.vue";
import pageNotFoundComponent from "../public/pages/page-not-found.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: homeComponents ,meta: { title: 'Home' } },
        { path: '/analytics/health-checks', name: 'healthChecks' ,component: healthChecksComponent,  meta: { title: 'Health Checks' } },
        { path: '/', redirect: '/home' },
        { path: '/:pathMatch(.*)*', name: 'NotFound',component: pageNotFoundComponent, meta: { title: 'Page Not Found' } } // Ruta para 404

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'TechnoGym TechnoRun Analytics';
    document.title = `${to.meta['title']} | ${baseTitle}`;
    next();
});

export default router;