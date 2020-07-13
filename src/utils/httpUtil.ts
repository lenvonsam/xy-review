import axois from "axios";
import Qs from "qs";
import wx from "weixin-js-sdk";
class HttpUtil {
  private BASICURL = "https://mobileapp.xingyun361.com/quasarserver";
  private serializeformQuery(requestParams: any, encodeUrl = false) {
    let query = "";
    for (const param in requestParams) {
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
  }
  commRequest(
    url: string,
    params: any,
    method: string,
    proxyType: string,
    charset: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqBody: any = {
        reqUrl: url,
        params: this.serializeformQuery(params, method === "get"),
        type: method,
        charset
      };
      axois({
        method: "post",
        url: this.BASICURL + "/common/proxy",
        params: reqBody,
        paramsSerializer: params => {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        }
      })
        .then((res: any) => {
          if (res.status === 200) {
            if (proxyType === "crm") {
              if (res.data.returnCode === 0) {
                resolve(res.data);
              } else {
                reject(new Error(res.data.errMsg));
              }
            } else {
              if (
                res.returncode === undefined &&
                res.data.returncode === undefined
              ) {
                resolve(res.data);
              } else {
                if (Number(res.data.returncode) === 0) {
                  resolve(res.data);
                } else {
                  reject(new Error(res.data.errormsg || res.data.msg));
                }
              }
            }
          } else {
            reject(
              new Error(res.data === undefined ? "网络异常" : res.data.errormsg)
            );
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  ironRequest(
    reqUrl: string,
    param: any,
    type: string,
    context: any
  ): Promise<any> {
    const basicParams: any = Object.assign({}, param);
    const ul = reqUrl;
    console.log("islogin:>>", context.$store.state.isLogin);
    // if (this.isLogin && type === "post") {
    //   basicParams["user_id"] = this.currentUser["user_id"];
    // }
    // if (this.isLogin && type === "get" && reqUrl.indexOf("user_id") < 0) {
    //   ul.indexOf("?") >= 0
    //     ? (ul += "&user_id=" + this.currentUser.user_id)
    //     : (ul += "?user_id=" + this.currentUser.user_id);
    // }
    const baiscUrl = this.BASICURL + "/ironmart/httpProxy";
    const reqBody = {
      url: ul,
      type: type,
      params: this.serializeformQuery(
        basicParams,
        type === "post" ? false : true
      )
    };
    return new Promise((resolve, reject) => {
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
        .then((res: any) => {
          console.log(res);
          if (res.status === 200) {
            if (
              res.returncode === undefined &&
              res.data.returncode === undefined
            ) {
              resolve(res.data);
            } else {
              if (Number(res.data.returncode) === 0) {
                resolve(res.data);
              } else {
                reject(new Error(res.data.errormsg || res.data.msg));
              }
            }
          } else {
            reject(
              new Error(res.data === undefined ? "网络异常" : res.data.errormsg)
            );
          }
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  initWxJs(): Promise<any> {
    const basicUrl = this.BASICURL + "/ironmart/wxJsSign";
    return new Promise((resolve, reject) => {
      axois
        .post(basicUrl, { signUrl: window.location.href.split("#")[0] })
        .then(resp => {
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
            wx.ready(() => {
              resolve(wx);
            });
            wx.error(err => {
              reject(err);
            });
          } else {
            reject(new Error(resp.data.errMsg));
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

const instace = new HttpUtil();
export default instace as any;
