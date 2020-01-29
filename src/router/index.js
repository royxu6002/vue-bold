import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/faq",
    name: "Faq",
    component: () => import("../views/Faq.vue")
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/Customer.vue")
  },
  {
    path: "/customer/:id",
    name: "CustomerShow",
    component: () => import("../views/customer/Show.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
