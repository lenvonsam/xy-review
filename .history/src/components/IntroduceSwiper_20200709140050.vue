<template lang="pug">
div
  div.swiper-container
  div.swiper-wrapper
    div.swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-style.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云CRM
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 行业大数据职称营销策略
          .fs-16.lh-28(class="animated bounceInRight") 结合行业数据
          .fs-16.lh-28(class="animated bounceInRight") 垂直管理客户，精准分析
        .introduceframe2-style
  div.swiper-wrapper
    div.swiper-slide
      .banner-bg.box.full-width.relative.relative.slide-introduce1-bg(:style="{height: screenHeight + 'px'}")
        .introduceframe-style.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云CRM
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 行业大数据职称营销策略
          .fs-16.lh-28(class="animated bounceInRight") 结合行业数据22222222222
          .fs-16.lh-28(class="animated bounceInRight") 垂直管理客户，精准分析
        .introduceframe2-style
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swiper from "swiper";

@Component
class IntroduceSwiper extends Vue {
  mounted() {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      freeMode: true,
      loop: false
    });
  }
}
export default IntroduceSwiper;
</script>

<style lang="stylus" scoped>
// 375px作为设计稿基准
vm(val)
  return (val / 375) * 100vw
.padding-18-24
  padding vm(18) 0 0 vm(24)
.fs-23
  font-size vm(23)
.fs-16
  font-size vm(16)
.lh-28
  line-height vm(28)
.text-blue
  color #258CFF
.swiper-container
  width 100%
  height 100%
  border 1px solid #000
.swiper-slide
  width auto !important
  display inline-block
  margin-right 40px
  height 80px
  line-height 80px
  font-size 32px
  padding 0 15px
  -webkit-box-sizing border-box
  box-sizing border-box
  text-align center
  color #fff
  cursor pointer
.swiper-container .swiper-slide .active
  color #666
  box-shadow 0 3px 13px 0 rgba(94, 94, 94, 0.5)
.slide-introduce1-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce1bkg.png') 1x)
  .introduceframe-style
    background -webkit-image-set(url('http://xymobile.xingyun361.com/introduceframe.png') 2x)
    width vm(231)
    height vm(144)
    position absolute
    top vm(86)
    left vm(18)
    background-repeat no-repeat
    background-size contain
  .introduceframe2-style
    background -webkit-image-set(url('http://xymobile.xingyun361.com/introduceframe1.png') 2x)
    width 100%
    height vm(52)
    position absolute
    bottom vm(41)
    left 0
    background-repeat no-repeat
</style>
