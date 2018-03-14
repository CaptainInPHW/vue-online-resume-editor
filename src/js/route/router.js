/*
 * router.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

import Edit from './page-edit';
import SignUp from './page-signup';
import SignIn from './page-signin';

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '*',
            redirect: '/edit'
        },
        {
            path: '/',
            redirect: '/edit'
        },
        {
            path: '/edit',
            props: true,
            component: Edit
        },
        {
            path: '/signup',
            props: true,
            component: SignUp
        },
        {
            path: '/signin',
            props: true,
            component: SignIn
        },
    ]
});
