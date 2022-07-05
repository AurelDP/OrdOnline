import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Error404 from '../views/ErrorView.vue'
import SelectRoleView from "../views/SelectRoleView";
import RegisterView from "../views/RegisterView";
import AddPrescriptionView from '../views/AddPrescriptionView.vue'
import PrescriptionView from "../views/PrescriptionView";
import PatientSpaceView from "../views/UserSpaceView";
import LoginView from "../views/LoginView";
import PatientRecordView from "@/views/PatientRecordView";

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/about', name: 'about', component: AboutView},
    {path: '/signUp', name: 'signup', component: SelectRoleView},
    {path: '/register/:type', name: 'register', component: RegisterView, props: true},
    {path: '/addPrescription', name: 'addprescription', component: AddPrescriptionView},
    {path: '/prescription', name: 'prescription', component: PrescriptionView},
    {path: '/userSpace', name: 'userspace', component: PatientSpaceView},
    {path: '/signIn', name: 'signin', component: LoginView},
    {path: '/patientRecord', name: 'patientrecord', component: PatientRecordView},
    {path: '/:catchAll(.*)*', name: 'error', component: Error404},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const namesNotProtected = ["home", "about", "signup", "signin", "error", "register"];

    if (!namesNotProtected.includes(to.name) && localStorage.getItem("WebToken") === null)
        next({name: 'error'});
    else
        next();
})

export default router
