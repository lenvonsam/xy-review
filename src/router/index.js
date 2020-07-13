import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewUser from "../views/NewUser.vue";
import Review from "../views/Review.vue";
import NewReview from "../views/NewReview.vue";
Vue.use(VueRouter);
var routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/newUser",
        name: "newUser",
        component: NewUser
    },
    {
        path: "/review",
        name: "/review",
        component: Review
    },
    {
        path: "/newReview",
        name: "/newReview",
        component: NewReview
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ "../views/About.vue");
        }
    }
];
var router = new VueRouter({
    mode: "hash",
    routes: routes
});
export default router;
//# sourceMappingURL=index.js.map