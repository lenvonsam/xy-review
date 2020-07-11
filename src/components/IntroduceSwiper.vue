<template lang="pug">
  swiper(:options="swiperOption", ref="mySwiper", style="width: 100%")
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-size.introduceframe-position.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云CRM
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 行业大数据职称营销策略
          .fs-16.lh-28(class="animated bounceInRight") 结合行业数据
          .fs-16.lh-28(class="animated bounceInRight") 垂直管理客户，精准分析
        .introduceframe2-style
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce2-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-size.introduceframe-position.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型运物流
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 为钢材运输定制的物流服务
          .fs-16.lh-28(class="animated bounceInRight") 整合优质运力
          .fs-16.lh-28(class="animated bounceInRight") 全程运输监控，安全高效！
        .introduceframe2-style
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce3-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-size.introduceframe-position.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云网
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 满足个性化需求的钢铁电商
          .fs-16.lh-28(class="animated bounceInRight") 供需对接买卖双方
          .fs-16.lh-28(class="animated bounceInRight") 一条龙体验，省心服务！
        .introduceframe2-style
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce4-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-size.introduceframe-position.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云仓储
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 专业供应链管理系统
          .fs-16.lh-28(class="animated bounceInRight") 集成仓库管理,智能吊秤
          .fs-16.lh-28(class="animated bounceInRight") 快捷出库！
        .introduceframe2-style
    
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class IntroduceSwiper extends Vue {
  swiperOption = {};

  mounted() {
    this.swiperOption = {
      direction: "vertical", //水平方向移动
      autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
      loop: true,
      speed: 600, //config参数同swiper4,与官网一致
      autoplay: true
    };
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
.introduceframe-size
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduceframe.png') 2x)
  width vm(231)
  height vm(144)
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
.slide-introduce1-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce1bkg.png') 1x)
  .introduceframe-position
    position absolute
    top vm(86)
    left vm(18)
.slide-introduce2-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce2bkg.png') 1x)
  .introduceframe-position
    position absolute
    top vm(163)
    left vm(18)
.slide-introduce3-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce3bkg.png') 1x)
  .introduceframe-position
    position absolute
    top vm(212)
    left vm(132)
.slide-introduce4-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce4bkg.png') 1x)
  .introduceframe-position
    position absolute
    bottom vm(133)
    left vm(16)
</style>
