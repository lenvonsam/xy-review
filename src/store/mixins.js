import { __decorate, __extends } from "tslib";
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import httpUtil from "@/utils/httpUtil";
var MixinConfig = /** @class */ (function (_super) {
    __extends(MixinConfig, _super);
    function MixinConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.httpUtil = httpUtil;
        _this.appId = "wxb1a990032d59f1d4";
        _this.phoneReg = /^1[3-9]\d{9}$/;
        _this.codeReg = /^\d+$/;
        _this.visitUrl = "http://wechat.xingyun361.com/xyreviewdev/index.html";
        return _this;
    }
    // visitUrl = "http://localhost:8080/";
    // visitUrl = "http://172.16.120.235:8081/";
    MixinConfig.prototype.query2Obj = function (query) {
        var arr = query.split("&");
        var obj = {};
        arr.map(function (item) {
            var val = item.split("=");
            obj[val[0]] = val[1];
        });
        return obj;
    };
    MixinConfig.prototype.commRequest = function (url, params, method, proxyType, charset) {
        if (method === void 0) { method = "get"; }
        if (proxyType === void 0) { proxyType = "comm"; }
        if (charset === void 0) { charset = "utf-8"; }
        return this.httpUtil.commRequest(url, params, method, proxyType, charset);
    };
    MixinConfig.prototype.ironRequest = function (reqUrl, param, type) {
        return this.httpUtil.ironRequest(reqUrl, param, type, this);
    };
    MixinConfig.prototype.initWxJs = function () {
        return this.httpUtil.initWxJs();
    };
    MixinConfig.prototype.isIos = function () {
        if (navigator.userAgent) {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("iphone") > -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MixinConfig.prototype.browserName = function () {
        if (navigator.userAgent) {
            // 判断是否是移动设备打开.
            var ua = navigator.userAgent.toLowerCase();
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
        }
        else {
            return "";
        }
    };
    MixinConfig.prototype.iosAdaptor = function () {
        var ua = window.navigator.userAgent;
        if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            //$alert('ios端');
            var speed_1 = 1;
            var timer_1 = setInterval(function () {
                var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                currentPosition -= speed_1;
                window.scrollTo(0, currentPosition); //页面向上滚动
                currentPosition += speed_1;
                window.scrollTo(0, currentPosition); //页面向下滚动
                clearInterval(timer_1);
            }, 100);
        }
    };
    MixinConfig.prototype.mobileVersion = function () {
        var ua = navigator.userAgent.toLocaleLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return "ios";
        }
        else if (/android/.test(ua)) {
            return "and";
        }
        else {
            return "web";
        }
    };
    MixinConfig.prototype.jump = function (to) {
        if (this.$router) {
            this.$router.push(to);
        }
    };
    MixinConfig.prototype.replace = function (to) {
        if (this.$router) {
            this.$router.replace(to);
        }
    };
    MixinConfig.prototype.requireImage = function (url) {
        return require("@/assets/imgs/" + url);
    };
    MixinConfig.prototype.unitConvert = function (num) {
        var moneyUnits = ["元", "万元", "亿元", "万亿"];
        var dividend = 10000;
        var curentNum = num;
        //转换数字 
        var curentUnit = moneyUnits[0];
        //转换单位 
        for (var i = 0; i < 4; i++) {
            curentUnit = moneyUnits[i];
            if (this.strNumSize(curentNum) < 5) {
                break;
            }
            curentNum = curentNum / dividend;
        }
        var m = { num: 0, unit: "" };
        m.num = Number(curentNum.toFixed(3));
        m.unit = curentUnit;
        return m.num + m.unit;
    };
    MixinConfig.prototype.strNumSize = function (tempNum) {
        var stringNum = tempNum.toString();
        var index = stringNum.indexOf(".");
        var newNum = stringNum;
        if (index != -1) {
            newNum = stringNum.substring(0, index);
        }
        return newNum.length;
    };
    __decorate([
        State
    ], MixinConfig.prototype, "screenWidth", void 0);
    __decorate([
        State
    ], MixinConfig.prototype, "screenHeight", void 0);
    MixinConfig = __decorate([
        Component
    ], MixinConfig);
    return MixinConfig;
}(Vue));
export default MixinConfig;
//# sourceMappingURL=mixins.js.map