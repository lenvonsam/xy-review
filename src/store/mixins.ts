import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import httpUtil from "@/utils/httpUtil";
@Component
class MixinConfig extends Vue {
  httpUtil: any = httpUtil;
  @State screenWidth: any;
  @State screenHeight: any;
  appId = "wxb1a990032d59f1d4";
  phoneReg = /^1[3-9]\d{9}$/;
  codeReg = /^\d+$/;
  visitUrl = "http://wechat.xingyun361.com/xyreviewdev/index.html";
  // visitUrl = "http://localhost:8080/";
  // visitUrl = "http://172.16.120.235:8081/";
  query2Obj(query: any): any {
    const arr = query.split("&");
    const obj: any = {};
    arr.map((item: any) => {
      const val: any = item.split("=");
      obj[val[0]] = val[1];
    });
    return obj;
  }
  commRequest(
    url: string,
    params: any,
    method = "get",
    proxyType = "comm",
    charset = "utf-8"
  ): Promise<any> {
    return this.httpUtil.commRequest(url, params, method, proxyType, charset);
  }
  ironRequest(reqUrl: string, param: any, type: string): Promise<any> {
    return this.httpUtil.ironRequest(reqUrl, param, type, this);
  }
  initWxJs() {
    return this.httpUtil.initWxJs();
  }
  isIos() {
    if (navigator.userAgent) {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("iphone") > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  browserName() {
    if (navigator.userAgent) {
      // 判断是否是移动设备打开.
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("micromessenger") > -1) {
        // 微信中打开
        return "wxpub";
      }
      if (ua.indexOf("iphone") > -1) {
        return "ios";
      }
      if (ua.indexOf("android") > -1) {
        return "android";
      }
      return "web";
    } else {
      return "";
    }
  }
  iosAdaptor() {
    const ua = window.navigator.userAgent;
    if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      //$alert('ios端');
      const speed = 1;
      const timer = setInterval(function () {
        let currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition); //页面向上滚动
        currentPosition += speed;
        window.scrollTo(0, currentPosition); //页面向下滚动
        clearInterval(timer);
      }, 100);
    }
  }
  mobileVersion() {
    const ua = navigator.userAgent.toLocaleLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      return "ios";
    } else if (/android/.test(ua)) {
      return "and";
    } else {
      return "web";
    }
  }
  jump(to: any) {
    if (this.$router) {
      this.$router.push(to);
    }
  }
  replace(to: any) {
    if (this.$router) {
      this.$router.replace(to);
    }
  }
  requireImage(url: string) {
    return require("@/assets/imgs/" + url);
  }
  unitConvert(num: number) {
    const moneyUnits = ["元", "万元", "亿元", "万亿"]
    const dividend = 10000;
    let curentNum = num;
    //转换数字 
    let curentUnit = moneyUnits[0];
    //转换单位 
    for (let i = 0; i < 4; i++) {
      curentUnit = moneyUnits[i]
      if (this.strNumSize(curentNum) < 5) {
        break;
      }
      curentNum = curentNum / dividend
    }
    const m = { num: 0, unit: "" }
    m.num = Number(curentNum.toFixed(3));
    m.unit = curentUnit;
    return m.num + m.unit;
  }
  strNumSize(tempNum: number) {
    const stringNum = tempNum.toString();
    const index = stringNum.indexOf(".");
    let newNum = stringNum;
    if (index != -1) {
      newNum = stringNum.substring(0, index);
    }
    return newNum.length;
  }
}
export default MixinConfig;
