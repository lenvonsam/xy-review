<template lang="pug">
.container.relative
  .banner-bg.border-box.full-width.login-bkg.relative(:style="{height: screenHeight + 'px', width: (screenWidth+1) + 'px'}")
    .login-title(:style="{height: loginTitleHeight + 'px'}")
    .input-bkg.flex-column(:style="{height: loginBkgHeight + 'px'}")
      .dl-word.font-31.text-center 登录
      .login-input.flex-row.relative(:style="{height: loginInputHeight + 'px'}")
        .input-icon.head-url(:style="{height: inputIconHeight + 'px'}")
        input(placeholder="请输入手机号", v-model="phoneNum")
      .login-input.flex-row.relative(:style="{height: loginInputHeight + 'px'}")
        .input-icon.pwd-url(:style="{height: inputIconHeight + 'px'}")
        input(placeholder="请输入验证码", v-model="idCode")
        .code-btn(:style="{height: codeBtnHeight + 'px'}", @click="getIdCode")  {{codeText}}
      .confirm-btn(@click="loginIn") 登录查看
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
let self: any;
@Component({
  components: {}
})
class LoginThird extends Vue {
  phoneNum = "";
  idCode = "";
  canHttp = true;
  userAuth = true;
  wxObj: any = {};
  codeText = "获取验证码";
  codeTime: any = null;
  codeCount = 30;
  canClick = true;
  authRequest = "0";
  exitNo = "";
  vhHeight = 676;
  loginTitleHeight = 162;
  loginBkgHeight = 329;
  loginInputHeight = 42;
  inputIconHeight = 17;
  codeBtnHeight = 33;
  beforeMount() {
    this.vhHeight = window.innerHeight;
    self = this;
    this.loginTitleHeight = (162 / 667) * window.innerHeight;
    this.loginBkgHeight = (329 / 667) * window.innerHeight;
    this.loginInputHeight = (42 / 667) * window.innerHeight;
    this.inputIconHeight = (17 / 667) * window.innerHeight;
    this.codeBtnHeight = (33 / 667) * window.innerHeight;
    this.clearTime();
    this.codeText = "获取验证码";
    this.authRequest = localStorage.getItem("authRequest") || "0";
    this.exitNo = localStorage.getItem("cust_no") || "";
    const queryObject: any = self.query2Obj(
      window.location.search.substring(1)
    );
    console.log("queryObject", queryObject);
    if ("source" in queryObject) {
      this.postSourceInfo(queryObject.source);
    }
    if (this.exitNo.length > 0)
      window.location.replace(
        self.visitUrl + "#/reviewThird?cust_no=" + this.exitNo
      );
    if (!this.userAuth) {
      if (this.authRequest == "0") {
        this.authRequest = "1";
        localStorage.setItem("authRequest", this.authRequest);
        this.wxAuthUrl();
      } else {
        this.wxObj = JSON.parse(localStorage.getItem("wxUser") || "{}");
        this.userAuth = this.wxObj.id > 0;
      }
      if ("code" in queryObject && !this.userAuth) {
        // 获取openId
        this.getWxUserInfo(queryObject.code);
      }
    }
  }
  clearTime() {
    if (this.codeTime) {
      window.clearInterval(this.codeTime);
      this.codeTime = null;
      this.codeCount = 30;
    }
  }
  // 接口获取验证码
  async getIdCode() {
    try {
      if (!this.userAuth) {
        self.$alert.show({
          msg: "微信授权未成功，请重新授权",
          cb() {
            localStorage.removeItem("authRequest");
            self.userAuth = false;
            self.wxAuthUrl();
          }
        });
        return;
      }
      if (!self.phoneReg.test(this.phoneNum)) {
        self.$alert.show({ msg: "请输入正确手机号" });
        return;
      }
      if (this.canClick) {
        this.canClick = false;
        await self.ironRequest(
          "getCaptcha.shtml?user_phone=" + this.phoneNum + "&type=7",
          {},
          "get"
        );
        this.clearTime();
        this.codeTime = setInterval(function() {
          self.codeText = `${self.codeCount}s`;
          self.codeCount--;
          if (self.codeCount < 0) {
            self.codeCount = 0;
            self.codeText = "重新获取";
            self.clearTime();
            self.canClick = true;
          }
        }, 1000);
      }
    } catch (e) {
      self.canClick = true;
      if (e.message === "该手机号未注册") {
        self.$alert.show({
          msg: e.message,
          btnText: "我知道啦",
          extraJump: true,
          cb(resp) {
            if (resp === "extra") {
              //地址
              window.location.replace(
                self.visitUrl + "#/reviewThird?cust_no=-1"
              );
            }
          }
        });
      } else {
        self.$alert.show({ msg: e.message });
      }
    }
  }
  // 登录接口
  async loginIn() {
    try {
      self.iosAdaptor();
      if (!this.userAuth) {
        self.$alert.show({
          msg: "微信授权未成功，请重新授权",
          cb() {
            localStorage.removeItem("authRequest");
            self.userAuth = false;
            self.wxAuthUrl();
          }
        });
        return;
      }
      if (!self.phoneReg.test(this.phoneNum)) {
        self.$alert.show({ msg: "请输入正确手机号" });
        return;
      }
      if (self.idCode.trim().length === 0) {
        self.$alert.show({ msg: "验证码不能为空" });
        return;
      }
      if (!self.codeReg.test(this.idCode)) {
        self.$alert.show({ msg: "请输入正确验证码" });
        return;
      }
      if (this.canHttp) {
        this.canHttp = false;
        const data = await self.ironRequest(
          "promote/validCaptcha.shtml?user_phone=" +
            this.phoneNum +
            "&valid_code=" +
            this.idCode.trim(),
          {},
          "get"
        );
        console.log("data:>>", data);
        this.canHttp = true;
        if (data.cust_co && data.cust_co.length > 0) {
          localStorage.setItem("cust_no", data.cust_no);
          this.bindWxAuthXyUser(data.cust_co);
          // 地址
          window.location.replace(
            self.visitUrl + "#/reviewThird?cust_no=" + data.cust_no
          );
        }
      }
    } catch (e) {
      this.canHttp = true;
      console.error(e.message);
      self.$alert.show({ msg: e.message });
    }
  }
  async bindWxAuthXyUser(xyNo: string) {
    try {
      const body: any = {
        name: this.wxObj.nickname,
        avatar: this.wxObj.headImgUrl,
        appName: this.wxObj.appName,
        appKey: "xingYun",
        openId: this.wxObj.openId,
        xyNo
      };
      if (this.wxObj.subscribe) body.subscribe = this.wxObj.subscribe;
      await self.commRequest(
        "http://crm-admin-test.xingyun361.com/crmserver/api/v1/customer/bindWxAuthXyLinker",
        body,
        "post",
        "crm"
      );
    } catch (e) {
      console.error(e);
    }
  }
  async postSourceInfo(type: string) {
    try {
      await self.ironRequest(
        "promote/updateReviewNum.shtml?type=" + Number(type),
        {},
        "get"
      );
    } catch (e) {
      console.error(e);
    }
  }
  wxAuthUrl() {
    // http://xymobile.xingyun361.com/bg_home%403x.png
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      self.appId +
      "&redirect_uri=http%3A%2F%2Fwechat.xingyun361.com%2Fxyreviewdev%2Findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  }
  async getWxUserInfo(code: string) {
    try {
      const data = await self.commRequest(
        "http://scp-dev.xingyun361.com/api/wechat/auth/oauth",
        { code, appKey: "xingYun" },
        "post"
      );
      console.log("data:>>", data);
      this.wxObj = data.obj;
      localStorage.setItem("wxUser", JSON.stringify(this.wxObj));
      this.userAuth = true;
      window.location.href = self.visitUrl;
    } catch (e) {
      self.$alert.show({ msg: e.message });
    }
  }
}
export default LoginThird;
</script>
<style lang="stylus" scoped>
// 375px作为设计稿基准
vm(val)
  return (val / 375) * 100vw
vh(val)
  return (val / 667) * 100vh
.flex-column
  display flex
  flex-direction column
.flex-row
  display flex
  flex-direction row
  align-items center
.box
  position relative
  padding 5%
.login-bkg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/login_bkg.png') 1x)
  margin-left -1px
  .login-title
    background-image url('http://xymobile.xingyun361.com/login_title.png')
    background-size contain
    background-repeat no-repeat
    width vm(239)
    // height vh(162)
    margin vh(70) auto 0
  .input-bkg
    background-image url('http://xymobile.xingyun361.com/input_bg.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(321)
    // height vh(329)
    margin vh(42) auto 0
    .dl-word
      font-size vm(32)
      color #FDFDFD
      margin vh(25) 0 0
    .login-input
      background-image url('../../src/assets/imgs/input_bkg.png')
      background-size 100% 100%
      background-repeat no-repeat
      width vm(227)
      // height vh(42)
      margin vh(23) 0 0 vm(40)
      .input-icon
        width vm(15)
        // height vh(17)
        margin-left vm(11)
      .head-url
        background-image url('http://xymobile.xingyun361.com/icon_head.png')
        background-size 100% 100%
      .pwd-url
        background-image url('http://xymobile.xingyun361.com/icon_pwd.png')
        background-size 100% 100%
      input
        position absolute
        left vm(34)
        background none
        outline none
        border none
        color #FCFCFD
      .width-100
        width vm(100)
      .code-btn
        display flex
        justify-content center
        align-items center
        width vm(75)
        // height vh(33)
        font-size vm(12)
        text-align center
        position absolute
        right vm(6)
        background-color #33AFED
        border-radius 3px
    .confirm-btn
      width vm(220)
      height vh(52)
      line-height vh(52)
      text-align center
      font-size vm(21)
      font-weight bold
      color #1C0000
      background-color #33AFED
      border-radius 3px
      margin vh(42) auto 0
</style>
