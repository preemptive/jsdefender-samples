import { createWebHistory, createRouter } from "vue-router";
const Login = () => import( "@/views/Login.vue");
const Home = () => import( "@/views/Home.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;