<template lang="pug">
.container.relative
  span(style="position: absolute; top: 15px; left: 15px; z-index: 20") {{screenHeight}} ; {{screenWidth}} ; {{deviceRatio}}
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20", @click="cancelAuth") 取消授权
  .box.banner-bg.full-width
    img.banner-img(src="../assets/imgs/home_banner.png")
    .space
    img.title.up(src="../assets/imgs/home_title_up.png", :style="{height: loginBoxBarTopHeight + 'px', width: loginBoxBarTopWidth + 'px'}")
    .relative(style="overflow-y:hidden;")
      img.title.down(src="../assets/imgs/home_title_down.png", :style="{height: loginBoxBarDownHeight + 'px', width: loginBoxBarDownWidth + 'px'}")
      .login-box.animated.slideInDown(:style="{width: loginBoxWidth+ 'px', height: loginBoxHeight + 'px', top: '-' + loginBoxTop + 'px'}")
        .title
        .input-bg.row.align-center
          .flex-30.flex.align-center
            img.icon(src="../assets/imgs/user_icon.png")
          .col
            input(placeholder="请输入手机号", type="tel", v-model="phone", @blur="iosAdaptor")
        .input-bg.sec.pr-5.row.align-center
          .flex-30.flex.align-center
            img.icon(src="../assets/imgs/pwd_icon.png")
          .col.pr-5
            input(placeholder="请输入验证码", type="tel", v-model="code", @blur="iosAdaptor")
          .flex-68
            .captcha(@click="getCode") {{codeText}}
        .login-btn(@click="loginAction")
  .bottom-shape
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

let me: any;
@Component({})
class HomePage extends Vue {
  phone = "";
  code = "";
  codeTime: any = null;
  codeText = "获取验证码";
  codeCount = 30;
  canClick = true;
  canHttp = true;
  userAuth = false;
  authRequest = "0";
  exitNo = "";
  deviceRatio = 1;
  wxObj: any = {};
  loginBoxBarTopWidth = 337;
  loginBoxBarTopHeight = 3;
  loginBoxBarDownWidth = 339;
  loginBoxBarDownHeight = 10;
  loginBoxWidth = 315;
  loginBoxHeight = 362;
  loginBoxTop = 9;
  beforeMount() {
    me = this;
    this.clearTime();
    this.loginBoxWidth = (315 / 375) * me.screenWidth;
    this.loginBoxHeight = (362 / 315) * this.loginBoxWidth;
    this.loginBoxBarTopWidth = (337 / 375) * me.screenWidth;
    this.loginBoxBarTopHeight = (3 / 337) * this.loginBoxBarTopWidth;
    this.loginBoxBarDownWidth = (339 / 375) * me.screenWidth;
    this.loginBoxBarDownHeight = (10 / 339) * this.loginBoxBarDownWidth;
    this.loginBoxTop = (9 / 375) * me.screenWidth;
    this.codeText = "获取验证码";
    this.authRequest = localStorage.getItem("authRequest") || "0";
    this.exitNo = localStorage.getItem("cust_no") || "";
    this.deviceRatio = window.devicePixelRatio;
    const newUserMark = localStorage.getItem("new_user") || "0";
    const queryObject: any = me.query2Obj(window.location.search.substring(1));
    console.log("queryObject", queryObject);
    if ("source" in queryObject) {
      this.postSourceInfo(queryObject.source);
    }
    if (this.exitNo.length > 0)
      window.location.replace(
        me.visitUrl + "#/newReview?cust_no=" + this.exitNo
      );
    if (newUserMark === "1") window.location.replace(me.visitUrl + "#/newUser");
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
    // if (window.location.href !== me.visitUrl + "#/home")
    //   window.location.replace(me.visitUrl);
  }
  clearTime() {
    if (this.codeTime) {
      window.clearInterval(this.codeTime);
      this.codeTime = null;
      this.codeCount = 30;
    }
  }
  cancelAuth() {
    localStorage.removeItem("authRequest");
    window.location.href = me.visitUrl;
  }
  async postSourceInfo(type: string) {
    try {
      await me.ironRequest(
        "promote/updateReviewNum.shtml?type=" + Number(type),
        {},
        "get"
      );
    } catch (e) {
      console.error(e);
    }
  }
  async getWxUserInfo(code: string) {
    try {
      const data = await me.commRequest(
        "http://scp-dev.xingyun361.com/api/wechat/auth/oauth",
        { code, appKey: "xingYun" },
        "post"
      );
      console.log("data:>>", data);
      this.wxObj = data.obj;
      localStorage.setItem("wxUser", JSON.stringify(this.wxObj));
      this.userAuth = true;
      window.location.href = me.visitUrl;
    } catch (e) {
      me.$alert.show({ msg: e.message });
    }
  }
  async getCode() {
    try {
      // if (!this.userAuth) {
      //   me.$alert.show({
      //     msg: "微信授权未成功，请重新授权",
      //     cb() {
      //       localStorage.removeItem("authRequest");
      //       me.userAuth = false;
      //       me.wxAuthUrl();
      //     }
      //   });
      //   return;
      // }
      if (!me.phoneReg.test(this.phone)) {
        me.$alert.show({ msg: "请输入正确手机号" });
        return;
      }
      if (this.canClick) {
        this.canClick = false;
        await me.ironRequest(
          "getCaptcha.shtml?user_phone=" + this.phone + "&type=7",
          {},
          "get"
        );
        this.clearTime();
        this.codeTime = setInterval(function() {
          me.codeText = `${me.codeCount}s`;
          me.codeCount--;
          if (me.codeCount < 0) {
            me.codeCount = 0;
            me.codeText = "重新获取";
            me.clearTime();
            me.canClick = true;
          }
        }, 1000);
      }
    } catch (e) {
      this.canClick = true;
      me.$alert.show({ msg: e.message });
    }
  }
  async loginAction() {
    try {
      me.iosAdaptor();
      // if (!this.userAuth) {
      //   me.$alert.show({
      //     msg: "微信授权未成功，请重新授权",
      //     cb() {
      //       localStorage.removeItem("authRequest");
      //       me.userAuth = false;
      //       me.wxAuthUrl();
      //     }
      //   });
      //   return;
      // }
      if (!me.phoneReg.test(this.phone)) {
        me.$alert.show({ msg: "请输入正确手机号" });
        return;
      }
      if (me.code.trim().length === 0) {
        me.$alert.show({ msg: "验证码不能为空" });
        return;
      }
      if (!me.codeReg.test(this.code)) {
        me.$alert.show({ msg: "请输入正确验证码" });
        return;
      }
      if (this.canHttp) {
        this.canHttp = false;
        const data = await me.ironRequest(
          "promote/validCaptcha.shtml?user_phone=" +
            this.phone +
            "&valid_code=" +
            this.code.trim(),
          {},
          "get"
        );
        console.log("data:>>", data);
        this.canHttp = true;
        if (data.cust_co && data.cust_co.length > 0) {
          localStorage.setItem("cust_no", data.cust_no);
          this.bindWxAuthXyUser(data.cust_co);
          window.location.replace(
            me.visitUrl + "#/newReview?cust_no=" + data.cust_no
          );
        } else {
          localStorage.setItem("new_user", "1");
          window.location.replace(me.visitUrl + "#/newUser");
        }
      }
    } catch (e) {
      this.canHttp = true;
      console.error(e.message);
      me.$alert.show({ msg: e.message });
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
      await me.commRequest(
        "http://crm-admin-test.xingyun361.com/crmserver/api/v1/customer/bindWxAuthXyLinker",
        body,
        "post",
        "crm"
      );
    } catch (e) {
      console.error(e);
    }
  }
  wxAuthUrl() {
    // http://xymobile.xingyun361.com/bg_home%403x.png
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      me.appId +
      "&redirect_uri=http%3A%2F%2Fwechat.xingyun361.com%2Fxyreviewdev%2Findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  }
}
export default HomePage;
</script>

<style lang="stylus" scoped>
.container
  .bottom-shape
    position absolute
    bottom 0px
    left 0px
    right 0px
    height 55%
    background-image url('../assets/imgs/review_login_bottom.png')
    background-size cover
    background-position center
  .box
    position relative
    background-image url('../assets/imgs/bg_home.png')
    padding-top 5%
    .banner-img, .title
      position relative
      z-index 10
      width 250px
      margin 0px auto
      display block
    .banner-img
      height 184px
    .title
      position relative
      z-index 10
      &.up
        width 337px
        height 3px
      &.down
        width 339px
        height 10px
    .space
      height 15px
  .login-box
    position absolute
    top -9px
    width 315px
    height 362px
    background-image url('../assets/imgs/review_login_box.png')
    background-size cover
    margin 0 auto
    position relative
    z-index 10
    box-sizing border-box
    -webkit-box-sizing border-box
    -moz-box-sizing border-box
    animation-delay 0.3s
    animation-duration 5s
    padding-top 10%
    padding-left 10%
    padding-right 10%
    // animation animateDrawer 2s ease
    .title
      margin 0 auto
      width 66px
      height 31px
      background-image url('../assets/imgs/review_login_box_title.png')
      background-size cover
    .input-bg
      background #fff
      box-sizing border-box
      padding 10px 15px
      width 100%
      margin 0 auto
      margin-top 18px
      height 64px
      &.sec
        margin-top 25px
      .icon
        width 20px
      input
        width 100%
        background transparent
        border 0px
        height 25px
        // color #9d9d9d
        // font-size 13px
      .captcha
        height 42px
        width 75.5px
        display flex
        align-items center
        background #8A8886
        font-size 12px
        justify-content center
        border-radius 5px
        color #fff
    .login-btn
      width 182px
      height 54px
      margin 0 auto
      margin-top 30px
      background-image url('../assets/imgs/review_login_btn.png')
      background-size cover
.flex-68
  flex 0 0 68px
@media screen and (width: 320px)
  .box
    padding-top 1% !important
    .banner-img
      width 220px !important
      height 162px !important
    .space
      height 5px !important
    .login-box
      padding-top 5%
    .login-btn
      margin-top 20px !important
@media screen and (max-height: 605px)
  .box
    padding-top 6% !important
    // .login-box
    // width 300px !important
    // height 370px !important
  .bottom-shape-l
    width 70px !important
    height 108px !important
  .bottom-shape-r
    width 100px !important
    height 145px !important
@media screen and (max-height: 550px)
  .box
    padding-top 2% !important
    .banner-img
      width 220px !important
      height 162px !important
    .space
      height 5px !important
@media screen and (min-height: 720px)
  .box
    padding-top 16% !important
@media screen and (min-height: 780px)
  .box
    padding-top 22% !important
</style>
