import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/pages/Home.vue";
import Videos from "../views/pages/Videos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/videos",
    name: "Videos",
    component: Videos,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
