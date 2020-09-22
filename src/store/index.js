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
        SETCONFIG: function (state, _a) {
            var key = _a.key, val = _a.val;
            state[key] = val;
        }
    },
    actions: {
        setConfig: function (_a, _b) {
            var commit = _a.commit;
            var key = _b.key, val = _b.val;
            commit("SETCONFIG", { key: key, val: val });
        }
    },
    modules: {}
});
//# sourceMappingURL=index.js.map