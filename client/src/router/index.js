import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Error404 from '../views/ErrorView.vue'
import SelectRoleView from "../views/SelectRoleView";
import RegisterView from "../views/RegisterView";
import AddPrescriptionView from '../views/AddPrescriptionView.vue'
import PrescriptionView from "../views/PrescriptionView";
import PatientSpaceView from "../views/PatientSpaceView";
import LoginView from "../views/LoginView";
import PatientRecordView from "@/views/PatientRecordView";

const routes = [
  {path: '/', component: HomeView},
  {path: '/about', component: AboutView},
  {path: '/signUp', component: SelectRoleView},
  {path: '/register/:type', component: RegisterView, props: true},
  {path: "/addPrescription", component: AddPrescriptionView},
  {path: '/prescription', component: PrescriptionView},
  {path: '/patientSpace', component: PatientSpaceView},
  {path: '/signIn', component: LoginView},
  {path: '/patientRecord', component: PatientRecordView},
  {path: "/:catchAll(.*)*", name: 'error', component: Error404},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
