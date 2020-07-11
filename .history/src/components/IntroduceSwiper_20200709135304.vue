<template lang="pug">
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
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")
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
.swiper-container
  width 100%
  height 100%
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
  background-color #fff8eb
  box-shadow 0 3px 13px 0 rgba(94, 94, 94, 0.5)
</style>
