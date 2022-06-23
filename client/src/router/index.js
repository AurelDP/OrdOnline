import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/AccueilView.vue'
import AboutView from '../views/AboutView.vue'
import Error404 from '../views/ErrorView.vue'

const routes = [
  {path: '/', name: 'home', component: HomeView},
  {path: '/about', name: 'about', component: AboutView},
  {path: "/:catchAll(.*)*", component: Error404},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
