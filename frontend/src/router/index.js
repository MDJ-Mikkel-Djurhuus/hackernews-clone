import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/list-view'
import User from '@/views/user-view'
import Post from '@/views/post-view'
import Login from '@/views/login-view'
import New from '@/views/new-view'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/list',
            name: 'List',
            component: List
        },
        {
            path: '/new',
            name: 'new',
            component: New
        },
        {
            path: '/post/:id',
            name: 'post',
            component: Post
        },
        {
            path: '/user/:username',
            name: 'user',
            component: User
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Login
        },
        {
            path: '*',
            redirect: "/list"
        },
        // {
        //   path: '/comments/:username',
        //   name: 'comments',
        //   component: List
        // },
        // {
        //   path: '/stories/:username',
        //   name: 'stories',
        //   component: List
        // }
    ]
})