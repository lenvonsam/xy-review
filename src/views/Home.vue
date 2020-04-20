<template lang="pug">
.container.relative
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20") {{screenHeight}} ; {{screenWidth}} ; {{deviceRatio}}
  span(style="position: absolute; top: 15px; left: 15px; z-index: 20", @click="cancelAuth") 取消授权
  .box.banner-bg.full-width
    img.banner-img(src="../assets/imgs/home_banner.png")
    div(style="height: 30px")
    //- img.banner-img.title(src="../assets/imgs/home_title.png")
    .login-box(:style="{width: loginBoxWidth+ 'px', height: loginBoxHeight + 'px'}")
      .title 登录
      .input-bg
        .row
          .flex-20.flex.align-center
            img.icon(src="../assets/imgs/user_icon.png")
          .col
            input(placeholder="请输入手机号", type="tel", v-model="phone", @blur="iosAdaptor")
      .input-bg.pr-5
        .row
          .flex-20.flex.align-center
            img.icon(src="../assets/imgs/pwd_icon.png")
          .col.pr-5
            input(placeholder="请输入验证码", type="tel", v-model="code", @blur="iosAdaptor")
          .flex-68
            .captcha(@click="getCode") {{codeText}}
      .login-btn(@click="loginAction")
    .bottom-shape-l
    .bottom-shape-r
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import alertModal from "@/components/AlertModal.vue";

let me: any;
@Component({
  components: {
    alertModal
  }
})
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
  loginBoxWidth = 362.5;
  loginBoxHeight = 401.5;
  beforeMount() {
    me = this;
    this.clearTime();
    this.loginBoxWidth = (362.5 / 414) * me.screenWidth;
    this.loginBoxHeight = (401.5 / 362.5) * this.loginBoxWidth;
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
      window.location.replace(me.visitUrl + "#/review?cust_no=" + this.exitNo);
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
        "promote/updateReviewNum.shtml?type=" + Number(type)
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
      window.location.href =
        "http://wechat.xingyun361.com/xyreviewdev/index.html";
    } catch (e) {
      me.$alert.show({ msg: e.message });
    }
  }
  async getCode() {
    try {
      if (!this.userAuth) {
        me.$alert.show({
          msg: "微信授权未成功，请重新授权",
          cb() {
            localStorage.removeItem("authRequest");
            me.userAuth = false;
            me.wxAuthUrl();
          }
        });
        return;
      }
      if (!me.phoneReg.test(this.phone)) {
        me.$alert.show({ msg: "请输入正确手机号" });
        return;
      }
      if (this.canClick) {
        this.canClick = false;
        await me.ironRequest("getCaptcha.shtml?user_phone=" + this.phone);
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
      if (!this.userAuth) {
        me.$alert.show({
          msg: "微信授权未成功，请重新授权",
          cb() {
            localStorage.removeItem("authRequest");
            me.userAuth = false;
            me.wxAuthUrl();
          }
        });
        return;
      }
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
            this.code.trim()
        );
        console.log("data:>>", data);
        this.canHttp = true;
        if (data.cust_co && data.cust_co.length > 0) {
          localStorage.setItem("cust_no", data.cust_no);
          this.bindWxAuthXyUser(data.cust_co);
          window.location.replace(
            me.visitUrl + "#/review?cust_no=" + data.cust_no
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
  .box
    position relative
    // background -webkit-image-set(
    // url('../assets/imgs/bg_home.png') 1x,
    // url('../assets/imgs/bg_home.png') 2x,
    // url('../assets/imgs/bg_home.png') 3x
    // )
    background-image url('../assets/imgs/bg_home.png')
    padding-top 10%
    .banner-img
      width 260px
      height 100px
      margin 0px auto
      display block
      &.title
        // width 267.5px
        height 27.5px
        margin-top 15px
        margin-bottom 15px
    .bottom-shape-l
      position absolute
      bottom 0px
      left 0
      background-image url('../assets/imgs/review_login_bl.png')
      background-size cover
      width 112px
      height 173px
      z-index 15
    .bottom-shape-r
      position absolute
      bottom 0px
      right 0px
      background-image url('../assets/imgs/review_login_br.png')
      background-size cover
      width 140px
      height 203px
      z-index 15
  .login-box
    width 362.5px
    height 401.5px
    background-image url('../assets/imgs/review_login_box.png')
    background-size cover
    margin 0 auto
    position relative
    z-index 10
    box-sizing border-box
    -webkit-box-sizing border-box
    -moz-box-sizing border-box
    padding-top 12%
    padding-left 13.5%
    padding-right 13.5%
    .title
      color #6000c6
      font-size 26px
      font-weight bold
      text-align center
      letter-spacing 1px
    .input-bg
      background #f8f8f8
      box-sizing border-box
      padding 10px 15px
      width 100%
      margin 0 auto
      margin-top 18px
      height 45px
      .icon
        width 14px
      input
        width 100%
        background transparent
        border 0px
        height 25px
        // color #9d9d9d
        // font-size 13px
      .captcha
        height 35px
        width 65px
        display flex
        align-items center
        background #6000c6
        font-size 10px
        justify-content center
        border-radius 5px
        color #fff
        margin-top -5px
    .login-btn
      position absolute
      width 177px
      height 55px
      margin 0 auto
      bottom 12%
      left calc(((100% - 177px) / 2))
      z-index 20
      background-image url('../assets/imgs/review_login_btn.png')
      background-size cover
.flex-68
  flex 0 0 68px
@media screen and (width: 320px)
  .box
    padding-top 2% !important
    .login-box
      padding-top 8%
    .banner-img.title
      margin-top 10px !important
      margin-bottom 10px !important
@media screen and (max-height: 605px)
  .box
    padding-top 8% !important
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
    padding-top 3% !important
    .banner-img.title
      margin-top 10px !important
      margin-bottom 10px !important
@media screen and (min-height: 720px)
  .box
    padding-top 16% !important
@media screen and (min-height: 780px)
  .box
    padding-top 22% !important
    .banner-img.title
      margin-top 25px !important
      margin-bottom 25px !important
</style>
