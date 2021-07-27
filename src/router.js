import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login';
import Register from './views/Register.vue';
import Dashboad from './views/Dashboad.vue';
import CreateComponent from './views//User/Create.vue';
import EditComponent from './views//User/Edit.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/userboard',
            name: 'userboard',
            component: Dashboad
        },
        {
            name: 'create',
            path: '/create',
            component: CreateComponent
        },
        {
            name: 'edit',
            path: '/edit/:id',
            component: EditComponent
        }
    ]
});

export default router