import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenWidth: 375,
    screenHeight: 667,
    isLogin: false,
    currentUser: {}
  },
  mutations: {
    SETCONFIG(state: any, { key, val }) {
      state[key] = val;
    }
  },
  actions: {
    setConfig({ commit }, { key, val }) {
      commit("SETCONFIG", { key, val });
    }
  },
  modules: {}
});
