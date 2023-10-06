import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import DashBoardView from "@/views/DashBoardView.vue";
import UserView from "@/views/UserView.vue";
import advertisementView from "@/views/AdvertisementView.vue";
import advertisementsView from "@/views/AdvertisementsView.vue";
import mailboxView from "@/views/MailboxView.vue";
import resetPasswordView from "@/views/ResetPasswordView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path:'/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path:'/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path:'/dashboard',
    name: 'dashboardRoute',
    component: DashBoardView
  },
  {
    path:'/user',
    name: 'userRoute',
    component: UserView
  },
  {
    path:'/advertisement',
    name: 'advertisementRoute',
    component: advertisementView
  },
  {
    path:'/advertisements',
    name: 'advertisementsRoute',
    component: advertisementsView
  },
  {
    path:'/mailbox',
    name: 'mailboxRoute',
    component: mailboxView
  },
  {
    path:'/resetPassword',
    name: 'resetPasswordRoute',
    component: resetPasswordView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
