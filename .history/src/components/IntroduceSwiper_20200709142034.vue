<template lang="pug">
  swiper(:options="swiperOption", ref="mySwiper", @slideChange="slideTouchChange")
    swiper-slide 111111111
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")
        .introduceframe-style.padding-18-24
          .fs-23.text-blue.text-bold.lh-28(class="animated bounceInRight") 型云CRM
          .mt-10.fs-16.lh-28(class="animated bounceInRight") 行业大数据职称营销策略
          .fs-16.lh-28(class="animated bounceInRight") 结合行业数据
          .fs-16.lh-28(class="animated bounceInRight") 垂直管理客户，精准分析
        .introduceframe2-style
    swiper-slide 222222222
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
    notNextTick: true; //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
    direction: "vertical"; //水平方向移动
    grabCursor: true; //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
    setWrapperSize: true; //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
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

  slideTouchChange() {
    debugger;
    const mySwiper = this.$refs.mySwiper;
    console.log(mySwiper);
  }
  mounted() {
    this.slideTouchChange();
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
