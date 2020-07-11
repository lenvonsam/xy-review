import axois from "axios";
import Qs from "qs";
import wx from "weixin-js-sdk";
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
        this.BASICURL = "https://mobileapp.xingyun361.com/quasarserverdev";
    }
    HttpUtil.prototype.serializeformQuery = function (requestParams, encodeUrl) {
        if (encodeUrl === void 0) { encodeUrl = false; }
        var query = "";
        for (var param in requestParams) {
            if (param !== undefined && param !== "") {
                query +=
                    param +
                        "=" +
                        (encodeUrl
                            ? encodeURIComponent(requestParams[param])
                            : requestParams[param]) +
                        "&";
            }
        }
        if (query !== "") {
            query = query.substring(0, query.length - 1);
        }
        return query;
    };
    HttpUtil.prototype.commRequest = function (url, params, method, proxyType, charset) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var reqBody = {
                reqUrl: url,
                params: _this.serializeformQuery(params, method === "get"),
                type: method,
                charset: charset
            };
            axois({
                method: "post",
                url: _this.BASICURL + "/common/proxy",
                params: reqBody,
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: "brackets" });
                }
            })
                .then(function (res) {
                if (res.status === 200) {
                    if (proxyType === "crm") {
                        if (res.data.returnCode === 0) {
                            resolve(res.data);
                        }
                        else {
                            reject(new Error(res.data.errMsg));
                        }
                    }
                    else {
                        if (res.returncode === undefined &&
                            res.data.returncode === undefined) {
                            resolve(res.data);
                        }
                        else {
                            if (Number(res.data.returncode) === 0) {
                                resolve(res.data);
                            }
                            else {
                                reject(new Error(res.data.errormsg || res.data.msg));
                            }
                        }
                    }
                }
                else {
                    reject(new Error(res.data === undefined ? "网络异常" : res.data.errormsg));
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    HttpUtil.prototype.ironRequest = function (reqUrl, param, type, context) {
        var basicParams = Object.assign({}, param);
        var ul = reqUrl;
        console.log("islogin:>>", context.$store.state.isLogin);
        // if (this.isLogin && type === "post") {
        //   basicParams["user_id"] = this.currentUser["user_id"];
        // }
        // if (this.isLogin && type === "get" && reqUrl.indexOf("user_id") < 0) {
        //   ul.indexOf("?") >= 0
        //     ? (ul += "&user_id=" + this.currentUser.user_id)
        //     : (ul += "?user_id=" + this.currentUser.user_id);
        // }
        var baiscUrl = this.BASICURL + "/ironmart/httpProxy";
        var reqBody = {
            url: ul,
            type: type,
            params: this.serializeformQuery(basicParams, type === "post" ? false : true)
        };
        return new Promise(function (resolve, reject) {
            // axois({
            //   method: "post",
            //   url: baiscUrl,
            //   params: reqBody,
            //   paramsSerializer: params => {
            //     return Qs.stringify(params, { arrayFormat: "brackets" });
            //   }
            // })
            axois
                .post(baiscUrl, reqBody)
                .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    if (res.returncode === undefined &&
                        res.data.returncode === undefined) {
                        resolve(res.data);
                    }
                    else {
                        if (Number(res.data.returncode) === 0) {
                            resolve(res.data);
                        }
                        else {
                            reject(new Error(res.data.errormsg || res.data.msg));
                        }
                    }
                }
                else {
                    reject(new Error(res.data === undefined ? "网络异常" : res.data.errormsg));
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    HttpUtil.prototype.initWxJs = function () {
        var basicUrl = this.BASICURL + "/ironmart/wxJsSign";
        return new Promise(function (resolve, reject) {
            axois
                .post(basicUrl, { signUrl: window.location.href.split("#")[0] })
                .then(function (resp) {
                console.log("initWxJS resp:>>", resp);
                if (resp.data && resp.data.returnCode === 0) {
                    wx.config({
                        default: false,
                        appId: resp.data.appId,
                        timestamp: resp.data.timestamp,
                        nonceStr: resp.data.nonceStr,
                        signature: resp.data.signature,
                        jsApiList: [
                            "checkJsApi",
                            "onMenuShareTimeline",
                            "onMenuShareAppMessage",
                            "onMenuShareQQ",
                            "onMenuShareWeibo",
                            "hideMenuItems",
                            "showMenuItems",
                            "hideAllNonBaseMenuItem",
                            "showAllNonBaseMenuItem",
                            "translateVoice",
                            "startRecord",
                            "stopRecord",
                            "onRecordEnd",
                            "playVoice",
                            "pauseVoice",
                            "stopVoice",
                            "uploadVoice",
                            "downloadVoice",
                            "chooseImage",
                            "previewImage",
                            "uploadImage",
                            "downloadImage",
                            "getNetworkType",
                            "openLocation",
                            "getLocation",
                            "hideOptionMenu",
                            "showOptionMenu",
                            "closeWindow",
                            "scanQRCode",
                            "chooseWXPay",
                            "openProductSpecificView",
                            "addCard",
                            "chooseCard",
                            "openCard"
                        ]
                    });
                    wx.ready(function () {
                        resolve(wx);
                    });
                    wx.error(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(new Error(resp.data.errMsg));
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return HttpUtil;
}());
var instace = new HttpUtil();
export default instace;
//# sourceMappingURL=httpUtil.js.map