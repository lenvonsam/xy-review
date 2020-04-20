<template lang="pug">
.container
  music
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20") {{screenHeight}} ; {{screenWidth}}
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20", @click="clearData") 清空
  .box.full-width.banner-bg
    .right-img
      img(src="../assets/imgs/new_user_girl.png")
    .new-user-box.banner-bg
      .title.banner-bg.animated.fadeInDown
      .line.banner-bg
      .title-sec.animated.fadeInLeft
        img(src="../assets/imgs/new_user_box_title_1.png")
      .title-third.animated.fadeInRight
        img(src="../assets/imgs/new_user_box_title_2.png")
      .sub-title
        span 极速询价
        span.ml-5 一键下单
        span.ml-5 智能提货
      .qrcode
        img.animated.fadeIn(src="../assets/imgs/qrcode.jpg", style="animation-delay: 800ms; animation-duration: 1.5s")
        .bottom-text 扫码体验型云小程序（长按识别）
  .bottom-monkey.banner-bg
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import music from "@/components/Music.vue";
let me: any;
@Component({
  components: {
    music
  }
})
class NewUserPage extends Vue {
  beforeMount() {
    me = this;
  }
  clearData() {
    // 测试环境清空数据
    localStorage.removeItem("new_user");
    window.location.href = me.visitUrl;
  }
}
export default NewUserPage;
</script>

<style lang="stylus" scoped>
.box
  background -webkit-image-set(
    url('../assets/imgs/new_user.png') 1x,
    url('http://xymobile.xingyun361.com/new_user%402x.png') 2x,
    url('http://xymobile.xingyun361.com/new_user%403x.png') 3x
  )
  padding-top 5%
  .right-img
    text-align right
    img
      width 200px
      height 192px
  .new-user-box
    width 323px
    height 435.5px
    background-image url('../assets/imgs/new_user_box.png')
    margin 0 auto
    position relative
    z-index 10
    top -22px
    box-sizing border-box
    padding-top 48px
    .title
      width 169px
      height 30.5px
      background-image url('../assets/imgs/new_user_box_title.png')
      margin 0 auto
    .line
      width 197px
      height 10px
      background-image url('../assets/imgs/new_user_line.png')
      margin 0 auto
      margin-top 12px
      margin-bottom 18px
    .title-sec
      padding-left 25px
      img
        width 203px
        height 36.5px
    .title-third
      text-align right
      padding-right 25px
      padding-top 8px
      img
        width 236.5px
        height 38px
    .sub-title
      margin-top 50px
      text-align center
      font-size 15px
      font-weight bold
      color #42403C
      letter-spacing 1px
    .qrcode
      margin-top 10px
      text-align center
      img
        width 100px
        height 100px
      .bottom-text
        margin-top 5px
        color #504E49
        font-size 10px
.bottom-monkey
  position absolute
  bottom 0px
  right 2%
  background-image url('../assets/imgs/monkey_bottom.png')
  width 95px
  height 129px
  z-index 10
@media screen and (max-height: 605px)
  .right-img
    padding-right 2%
    img
      width 190px !important
      height 182.4px !important
  .box
    padding-top 2% !important
    .new-user-box
      width 310px !important
      height 418px !important
      .qrcode
        img
          width 85px !important
          height 85px !important
@media screen and (max-height: 572px)
  .right-img
    padding-right 1% !important
    img
      width 160px !important
      height 153.6px !important
@media screen and (max-height: 520px)
  .right-img
    padding-right 1%
    img
      width 140px !important
      height 134.4px !important
  .box
    .new-user-box
      width 290px !important
      height 391px !important
      .sub-title
        margin-top 30px
@media screen and (width: 320px)
  .right-img
    padding-right 1%
    img
      width 140px !important
      height 134.4px !important
  .box
    .new-user-box
      width 280px !important
      height 377.5px !important
      .sub-title
        margin-top 30px
      .qrcode
        img
          width 70px !important
          height 70px !important
@media screen and (min-height: 720px)
  .box
    padding-top 10%
@media screen and (min-height: 800px)
  .box
    padding-top 15%
</style>
