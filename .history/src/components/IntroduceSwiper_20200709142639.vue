<template lang="pug">
  swiper(:options="swiperOption", ref="mySwiper", style="width: 100%")
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-style.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云CRM
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 行业大数据职称营销策略
          .fs-16.lh-28(class="animated bounceInRight") 结合行业数据
          .fs-16.lh-28(class="animated bounceInRight") 垂直管理客户，精准分析
        .introduceframe2-style
    swiper-slide
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

@Component
class IntroduceSwiper extends Vue {
  swiperOption: {
    direction: "vertical"; //水平方向移动
    autoHeight: true; //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
    slidesPerView: 1; //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
    // mousewheel: true; //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
    // mousewheelControl: true; //同上
    // height: Window["innerHeight"]; // 高度设置，占满设备高度
    resistanceRatio: 0; //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
    // observeParents: true; //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
    loop: true;
    speed: 600; //config参数同swiper4,与官网一致
    autoplay: true;
  };
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
