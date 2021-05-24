import Vue from "vue";
import VueRouter from 'vue-router';
import LoginPage from "@/pages/LoginPage";
import SignUp from "@/pages/SignUp";
import MainPage from "@/pages/MainPage";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage,
        },

        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
        },
        {
            path: "/signup",
            name: "SignUp",
            component: SignUp
        }
    ],
    mode: 'history',
    history: true,
});

