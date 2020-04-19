import alertModal from "@/components/AlertModal.vue";
let me: any;
class AlertConfig {
  __installed = false;
  __Vue: any;
  vm: any;
  __config: any;
  private AlertModal: any = alertModal;
  constructor() {
    this.__Vue = null;
    this.__config = null;
    this.vm = null;
    me = this;
  }
  install(Vue: any) {
    if (this.__installed) return;
    this.__installed = true;
    this.__Vue = Vue;
    Vue.prototype.$alert = this;
  }
  show(config: any) {
    if (this.vm) {
      this.vm.$destroy();
      this.vm = null;
    }
    const node = document.createElement("div");
    document.body.appendChild(node);
    this.vm = new this.__Vue({
      name: "xy-alert",
      el: node,
      components: {
        alertModal: this.AlertModal
      },
      render(h: any) {
        return h("alert-modal", {
          props: {
            value: true,
            ...config
          },
          on: {
            resp: function(res: any) {
              if (config !== undefined && config.cb !== undefined) {
                if (res.type === "confirm") {
                  config.cb("confirm");
                } else {
                  config.cb("hide");
                }
              }
            }
          }
        });
      }
    });
  }
  hide(resp: any) {
    console.log("hide:>>", resp);
  }
}

const instance = new AlertConfig();
export default instance as any;
