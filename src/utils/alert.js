import { __assign } from "tslib";
import alertModal from "@/components/AlertModal.vue";
var me;
var AlertConfig = /** @class */ (function () {
    function AlertConfig() {
        this.__installed = false;
        this.AlertModal = alertModal;
        this.__Vue = null;
        this.__config = null;
        this.vm = null;
        me = this;
    }
    AlertConfig.prototype.install = function (Vue) {
        if (this.__installed)
            return;
        this.__installed = true;
        this.__Vue = Vue;
        Vue.prototype.$alert = this;
    };
    AlertConfig.prototype.show = function (config) {
        if (this.vm) {
            this.vm.$destroy();
            this.vm = null;
        }
        var node = document.createElement("div");
        document.body.appendChild(node);
        this.vm = new this.__Vue({
            name: "xy-alert",
            el: node,
            components: {
                alertModal: this.AlertModal
            },
            render: function (h) {
                return h("alert-modal", {
                    props: __assign({ value: true }, config),
                    on: {
                        resp: function (res) {
                            if (config !== undefined && config.cb !== undefined) {
                                config.cb(res.type);
                                // if (res.type === "confirm") {
                                //   config.cb("confirm");
                                // } else {
                                //   config.cb(res.type);
                                // }
                            }
                        }
                    }
                });
            }
        });
    };
    AlertConfig.prototype.hide = function (resp) {
        console.log("hide:>>", resp);
    };
    return AlertConfig;
}());
var instance = new AlertConfig();
export default instance;
//# sourceMappingURL=alert.js.map