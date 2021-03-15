import Vue from "vue";
import VueRouter from "vue-router";
import LoginAnnual from "../views/LoginAnnual.vue";
import AnnualReview from "../views/AnnualReview.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: LoginAnnual
  },
  {
    path: "/reviewAnnual",
    name: "/reviewAnnual",
    component: AnnualReview
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
