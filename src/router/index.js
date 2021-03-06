import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import NewUser from "../views/NewUser.vue";
// import Review from "../views/Review.vue";
// import NewReview from "../views/NewReview.vue";
// import LoginThird from "../views/LoginThird.vue";
// import ReviewThird from "../views/ReviewThird.vue";
import LoginAnnual from "../views/LoginAnnual.vue";
import AnnualReview from "../views/AnnualReview.vue";
Vue.use(VueRouter);
var routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: LoginAnnual
    },
    // {
    //   path: "/newUser",
    //   name: "newUser",
    //   component: NewUser
    // },
    // {
    //   path: "/review",
    //   name: "/review",
    //   component: Review
    // },
    // {
    //   path: "/newReview",
    //   name: "/newReview",
    //   component: NewReview
    // },
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // },
    // {
    //   path: "/loginThird",
    //   name: "/LoginThird",
    //   component: LoginThird
    // },
    // {
    //   path: "/reviewThird",
    //   name: "/ReviewThird",
    //   component: ReviewThird
    // },
    {
        path: "/reviewAnnual",
        name: "/reviewAnnual",
        component: AnnualReview
    }
];
var router = new VueRouter({
    mode: "hash",
    routes: routes
});
export default router;
//# sourceMappingURL=index.js.map