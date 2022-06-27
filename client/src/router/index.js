import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Error404 from '../views/ErrorView.vue'
import SelectRoleView from "@/views/SelectRoleView";
import RegisterView from "../views/RegisterView";
import CustomerSpaceView from "@/views/CustomerSpaceView";

const routes = [
  {path: '/', name: 'home', component: HomeView},
  {path: '/about', name: 'about', component: AboutView},
  {path: '/signUp', name: 'role', component: SelectRoleView},
  {path: '/register', name: 'register', component: RegisterView},
  {path: '/customer-space', name: 'customer', component: CustomerSpaceView},
  {path: "/:catchAll(.*)*", component: Error404},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
