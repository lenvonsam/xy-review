import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import mixins from "./store/mixins";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import alert from "@/utils/alert";
Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);
Vue.mixin(mixins);
Vue.use(alert);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
