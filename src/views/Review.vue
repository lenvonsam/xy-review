<template lang="pug">
.container(v-if="loadFinish")
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20", @click="clearData") 清空
  music
  //- span(style="position: absolute; top: 15px; left: 15px; z-index: 20") {{screenHeight}} ; {{screenWidth}} {{deviceRatio}}
  .banner-bg.border-box.full-width.empty-bg.relative(:style="{height: screenHeight + 'px'}", v-if="reviewObj.all_weight === 0")
    .empty-box
      .title-bar
        img(src="../assets/imgs/empty_title_bar.png")
      .animal-bar
        img.empty-monkey-left(src="../assets/imgs/monkey_top.png")
        img.empty-arrow(src="../assets/imgs/empty_arrow.png")
        img.empty-monkey-right(src="../assets/imgs/monkey_right.png")
      .content-box.banner-bg(:class="{'full': reviewObj.rec_goods.length > 0}")
        .top-bar.row.justify-center.align-center
          span.red-text 这是您关注的物资信息
        .empty-list(v-if="reviewObj.rec_goods.length === 0")
          img.title(src="../assets/imgs/empty_title.png")
          img.line(src="../assets/imgs/empty_line.png")
        .list(v-else)
          .item(v-for="(itm, idx) in reviewObj.rec_goods", v-if="reviewObj.rec_goods.length > 0", :key="idx")
            span {{itm.name}}
            span.ml-10 {{itm.standard}}
        .bottom.text-center(:class="{'list': reviewObj.rec_goods.length > 0, 'zoom': reviewObj.rec_goods.length <= 3}")
          .title
            span 极速询价
            span.ml-5 一键下单
            span.ml-5 智能提货
          img.qrcode.animated.fadeIn(src="../assets/imgs/qrcode.jpg", style="animation-duration: 1.5s; animation-delay: 1s", :class="{'mt-15': reviewObj.rec_goods.length === 0, 'mt-5': reviewObj.rec_goods.length > 0}")
          .mt-5(style="font-size:10px; color: #504E49") 微信扫码体验型云小程序
  swiper.swipper.full-width(:options="swiperOption", v-else, ref="xySwiper", @slideChange="slideTouchChange")
    swiper-slide
      .slide-one-bg.banner-bg.box.full-width.relative(:style="{height: screenHeight + 'px'}")
        img.full-width(src="../assets/imgs/slide_one_shape_third.png")
        .slide-one-shape-one.banner-bg.delay(:class="[slideOneAnimateOne]", v-show="slideOneAnimateOne.length > 0", :style="{width: slideOneShapeWidth + 'px', height: slideOneShapeHeight + 'px', left: 'calc((100% - ' + slideOneShapeWidth + 'px) / 2)', top: 'calc((100% - ' + slideOneShapeHeight + 'px) / 2 - 20px)'}")
        .slide-one-shape-two.banner-bg.delay(:class="[slideOneAnimateTwo]", v-show="slideOneAnimateTwo.length > 0", :style="{width: slideOneTextBarWidth + 'px', height: slideOneTextBarHeight + 'px'}")
        .slide-one-shape-four.banner-bg
        .arrow.green.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    swiper-slide
      .banner-bg.border-box.full-width.pt-2rem.padding-xl.slide-two-bg.relative(:style="{height: screenHeight + 'px'}")
        div 在过去的2020年一季度中
        .row.mt-10.align-center
          div 您在型云一共采购了
          .text-red.text-bold.text-animate.mr-5.ml-5(:class="[slideTwoAnimate]", v-if="slideTwoAnimate.length > 0") {{reviewObj.all_weight}}
          .col 吨钢材
        .mt-10(:class="slideTwoChartAnimate", ref="chartPie", style="height: 200px")
        .row.mt-10.align-center
          div 其中
          .text-red.text-bold.text-center.ml-5.mr-5(:class="[slideTwoAnimate]", v-if="slideTwoAnimate.length > 0") {{reviewObj.goods_name_one}}
          .col 为您主要的采购品种
        .mt-10 为祖国数以千计的基建项目贡献了自己的力量！
        .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    swiper-slide
      //- 舍我其谁
      .banner-bg.border-box.full-width.padding-xl.relative.part-sec(:style="{height: screenHeight + 'px', color: reviewObj.page_backgroup === 3 ? '#fff' : '#262626' }", :class="[timeBg(reviewObj.page_backgroup)]")
        .row.align-center
          div(:class="slideThreeTextAnimate") 成交了
          .text-bold.text-center.text-animate.mr-5.ml-5(:class="[textClass, slideThreeAnimate]", v-if="reviewObj.page_backgroup && slideThreeAnimate.length > 0") {{reviewObj.order_num}}
          .col(:class="slideThreeTextAnimate") 笔订单
        .row.mt-20.align-center
          div(:class="slideThreeTextAnimate") 定向
          .text-bold.text-animate.text-center.mr-5.ml-5(:class="[textClass, slideThreeAnimate]", v-if="slideThreeAnimate.length > 0") {{(reviewObj.dx_percent * 100).toFixed(2)}}%
          .flex-68.text-center(:class="slideThreeTextAnimate") 自主占比
          .col.text-animate.text-bold(:class="[textClass, slideThreeAnimate]", v-if="slideThreeAnimate.length > 0") {{(reviewObj.zz_percent * 100).toFixed(2)}}%
        .row.mt-20.align-center
          div(:class="slideThreeTextAnimate") 您总是习惯在
          .flex-68.text-center.text-bold.text-animate(:class="[textClass, slideThreeBottomTextAnimate]", style="animation-delay: 1s; animation-duration: 2s", v-if="slideThreeBottomTextAnimate.length > 0") {{timeText(reviewObj.page_backgroup)}}
          div(:class="slideThreeTextAnimate") 的时候下单
        .row.mt-20.align-center
          div(:class="slideThreeTextAnimate") 型云一共为您节约了
          div.text-animate.text-bold.text-center.mr-5.ml-5(:class="[textClass, slideThreeAnimate]", v-if="slideThreeAnimate.length > 0") {{reviewObj.save_time}}
          .col(:class="slideThreeTextAnimate") 分钟的下单时间
        .mt-20(:class="slideThreeTextAnimate") 没有了繁琐的讨价还价
        .mt-20(:class="slideThreeTextAnimate") 没有了你来我往的勾心斗角
        .mt-20(:class="slideThreeTextAnimate") 
          | 不忘采购的初心
          span.ml-5 更不负挣钱的韶华
        .row.mt-20.align-center(style="position: relative; z-index: 10")
          div(:class="slideThreeTextAnimate") 有的只是您下单时
          .ml-5.mr-5.text-bold.text-animate(:class="[textClass, slideThreeBottomTextAnimate]", style="animation-delay: 1s; animation-duration: 2s", v-if="slideThreeAnimate.length > 0") {{reviewObj.zz_num > reviewObj.dx_num ? '舍我其谁' : '运筹帷幄'}}
          div(:class="slideThreeTextAnimate") 的气势
        .slide-bottom-shape.banner-bg(:style="{left: '0px', right: '0px', height: bottomImgOneHeight + 'px', backgroundImage:'url('+bottomImgOne+')'}", v-if="reviewObj.zz_num > reviewObj.dx_num")
        .slide-bottom-shape.banner-bg(:style="{right: '0px', width: bottomImgSecWidth + 'px', height: bottomImgSecHeight + 'px', backgroundImage:'url('+bottomImgSec+')'}", v-else)
      .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    swiper-slide
      .banner-bg.box.full-width.relative.slide-four-bg.relative(:style="{height: screenHeight + 'px'}")
        .slide-four-bird.banner-bg
        .slide-four-monkey.banner-bg(:style="{width: monkeyWidth + 'px', height: monkeyHeight + 'px'}")
        .slide-four-envelope-left.banner-bg(:style="{width: envelopeLeftWidth + 'px', height: envelopeLeftWidth + 'px'}")
        .slide-four-envelope-right.banner-bg
        .slide-four-white-flat.banner-bg(:style="{width: whiteFlagWidth + 'px', height: whiteFlagHeight + 'px'}")
          div(:style="{width:(whiteFlagWidth * 0.8) + 'px'}")
            div(:class="slideFourTextAnimate") 您和型云一起见证了{{reviewObj.days}}天的潮起潮落
            .mt-15(:class="slideFourTextAnimate") 一起感受钢市涨跌带来的悸动
            .mt-15(:class="slideFourTextAnimate") 感谢您一直以来的认可与支持
            .mt-15(:class="slideFourTextAnimate") 采购总量
            .mt-10(:class="[slideFourAnimate]", v-if="slideFourAnimate.length > 0")
              span.text-red.title-xl {{reviewObj.all_weight}}
              span.ml-5 吨
            .mt-10(:class="slideFourTextAnimate") 2020年一季度型云心中的
            .mt-10.text-red.title(:class="[slideFourAnimate]", v-if="slideFourAnimate.length > 0") {{titleInfo(reviewObj.all_weight)}}
            .mt-10(:class="slideFourTextAnimate") 非你莫属!
            .mt-25.ft-12(:class="slideFourTextAnimate") 扫码回顾我的钢圈传奇
            .mt-10
              img.slide-four-qrcode(src="../assets/imgs/qrcode.jpg", style="animation-delay: 1.5s", :class="slideFourQrcodeAnimate")
  share-modal(v-model="modalShow")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from "echarts";
import shareModal from "@/components/ShareModal.vue";
import music from "@/components/Music.vue";

let me: any;
@Component({
  components: {
    shareModal,
    music
  }
})
class ReviewPage extends Vue {
  echarts: any = echarts;
  swiperObj: any;
  wxShareTitle = "型云季度回顾";
  wxShareDesc = "型云分享描述";
  swiperSildeIndex = 0;
  slideOneAnimateOne = "";
  slideOneAnimateTwo = "";
  slideTwoAnimate = "";
  slideTwoChartAnimate = "";
  slideThreeAnimate = "";
  slideThreeTextAnimate = "";
  slideThreeBottomTextAnimate = "";
  slideFourAnimate = "";
  slideFourTextAnimate = "";
  slideFourQrcodeAnimate = "";
  reviewObj: any = {};
  bottomImgOne: ImageData = require("@/assets/imgs/review_slide_b_one.png");
  bottomImgSec: ImageData = require("@/assets/imgs/review_slide_b_sec.png");
  bottomImgOneHeight = 246;
  bottomImgSecWidth = 320;
  bottomImgSecHeight = 246;
  whiteFlagWidth = 322.5;
  whiteFlagHeight = 459;
  monkeyWidth = 141.5;
  monkeyHeight = 168.5;
  envelopeLeftWidth = 190.5;
  envelopeLeftHeight = 156;
  slideOneShapeWidth = 79;
  slideOneShapeHeight = 270;
  slideOneTextBarWidth = 63;
  slideOneTextBarHeight = 63;
  custNo = "";
  deviceRatio = 1;
  loadFinish = false;
  textClass = "text-red";
  toggleMusic = false;
  modalShow = false;
  swiperOption = {
    direction: "vertical",
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true
    }
  };
  chartSerialData = [];
  chartNameData = [];
  beforeMount() {
    me = this;
    this.initWxConfig();
    this.deviceRatio = window.devicePixelRatio;
    this.$nextTick(function() {
      if (me.$route.query.cust_no) me.custNo = me.$route.query.cust_no;
      if (me.custNo.length > 0) this.loadData();
      this.bottomImgOneHeight = Number(
        ((246 / 375) * me.screenWidth).toFixed(2)
      );
      this.bottomImgSecWidth = Number(
        ((me.screenWidth / 375) * 320).toFixed(2)
      );
      this.bottomImgSecHeight = Number(
        ((me.screenWidth / 375) * 246).toFixed(2)
      );
      this.whiteFlagWidth = Number((me.screenWidth * 0.86).toFixed(2));
      this.whiteFlagHeight = Number(
        ((459 / 322.5) * this.whiteFlagWidth).toFixed(2)
      );
      this.monkeyWidth = Number((me.screenWidth * 0.377).toFixed(2));
      this.monkeyHeight = Number(
        ((168.5 / 141.5) * this.monkeyWidth).toFixed(2)
      );
      this.envelopeLeftWidth = Number((me.screenWidth * 0.508).toFixed(2));
      this.envelopeLeftHeight = Number(
        ((156 / 190.5) * this.envelopeLeftWidth).toFixed(2)
      );
      this.slideOneShapeWidth = Number((me.screenWidth * 0.211).toFixed(2));
      this.slideOneShapeHeight = Number(
        ((270 / 79) * this.slideOneShapeWidth).toFixed(2)
      );
      this.slideOneTextBarWidth = Number((me.screenWidth * 0.168).toFixed(2));
      this.slideOneTextBarHeight = Number(
        ((63 / 63) * this.slideOneTextBarWidth).toFixed(2)
      );
      this.slideOneAnimateOne = "animated fadeInUp";
      this.slideOneAnimateTwo = "animated slideInLeft";
    });
  }
  titleInfo(num: number): string {
    if (num >= 200) {
      return "华东钢皇";
    } else if (num >= 100) {
      return "钢铁巨佬";
    } else if (num >= 50) {
      return "购钢大牛";
    } else {
      return "采钢圣手";
    }
  }
  initWxConfig() {
    if (me.browserName() === "wxpub") {
      me.initWxJs()
        .then(wx => {
          console.log("wx:>>", wx);
          wx.onMenuShareTimeline({
            title: me.wxShareTitle,
            link: me.visitUrl + "?source=3",
            imgUrl: "http://xymobile.xingyun361.com/share_review_icon.jpg",
            success() {
              console.log("wx share success");
            },
            error() {
              console.log("wx share fail");
            }
          });
          me.wxShareDesc =
            "2020第一季度我在型云的光荣称号是" +
            me.titleInfo(me.reviewObj.all_weight) +
            "，点击查看属于自己的钢圈称号吧！";
          wx.onMenuShareAppMessage({
            title: me.wxShareTitle,
            desc: me.wxShareDesc,
            link: me.visitUrl + "?source=3",
            imgUrl: "http://xymobile.xingyun361.com/share_review_icon.jpg",
            success() {
              console.log("wx share success");
            },
            error() {
              console.log("wx share fail");
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  slideTouchChange() {
    const slideIndex = me.$refs.xySwiper.$swiper.activeIndex;
    console.log("slide Index:>>", slideIndex);
    console.log("currentIndex:>>", this.swiperSildeIndex);
    if (this.swiperSildeIndex !== slideIndex) {
      this.slideOneAnimateOne = "";
      this.slideOneAnimateTwo = "";
      this.slideTwoAnimate = "";
      this.slideTwoChartAnimate = "";
      this.slideThreeAnimate = "";
      this.slideThreeTextAnimate = "";
      this.slideThreeBottomTextAnimate = "";
      this.slideFourAnimate = "";
      this.slideFourTextAnimate = "";
      this.slideFourQrcodeAnimate = "";
      this.swiperSildeIndex = slideIndex;
      this.modalShow = false;
      console.log("swiperSlideIndex:>>", this.swiperSildeIndex);
      switch (this.swiperSildeIndex) {
        case 0:
          setTimeout(function() {
            me.slideOneAnimateOne = "animated fadeInUp";
            me.slideOneAnimateTwo = "animated slideInLeft";
          }, 500);
          break;
        case 1:
          this.slideTwoAnimate = "animated bounceInLeft";
          this.slideTwoChartAnimate = "animated slideInUp";
          break;
        case 2:
          this.slideThreeAnimate = "animated bounceInLeft";
          this.slideThreeTextAnimate = "animated bounceInRight";
          this.slideThreeBottomTextAnimate = "animated fadeIn";
          break;
        case 3:
          this.slideFourAnimate = "animated slideInDown";
          this.slideFourTextAnimate = "animated slideInUp";
          this.slideFourQrcodeAnimate = "animated fadeIn";
          this.modalShow = true;
          break;
        default:
          break;
      }
    }
  }
  calcChartData() {
    const totalWeight = this.reviewObj.all_weight;
    const weightArr = [];
    this.chartNameData = [];
    if (this.reviewObj.weight_one > 0) {
      weightArr.push(this.reviewObj.weight_one);
      this.chartNameData.push(this.reviewObj.goods_name_one);
    }
    if (this.reviewObj.weight_two > 0) {
      weightArr.push(this.reviewObj.weight_two);
      this.chartNameData.push(this.reviewObj.goods_name_two);
    }
    if (this.reviewObj.weight_three > 0) {
      weightArr.push(this.reviewObj.weight_three);
      this.chartNameData.push(this.reviewObj.goods_name_three);
    }
    if (this.reviewObj.weight_four > 0) {
      weightArr.push(this.reviewObj.weight_four);
      this.chartNameData.push(this.reviewObj.goods_name_four);
    }
    if (this.reviewObj.weight_five > 0) {
      weightArr.push(this.reviewObj.weight_five);
      this.chartNameData.push(this.reviewObj.goods_name_five);
    }
    let otherWeight = 0;
    if (weightArr.length > 1)
      otherWeight = totalWeight - weightArr.reduce((a, b) => a + b);
    if (otherWeight > 0) {
      weightArr.push(Number(otherWeight.toFixed(3)));
      this.chartNameData.push("其他");
    }
    // 计算占比
    let percentArr = [];
    for (let i = 0; i < weightArr.length - 1; i++) {
      const tempW = weightArr[i];
      const tempPert = Number(((tempW * 100) / (totalWeight * 100)).toFixed(4));
      percentArr.push(tempPert);
    }
    if (weightArr.length === 1) percentArr = ["1.0000"];
    let lastPercent = 0;
    if (weightArr.length > 1) {
      if (percentArr.length > 1) {
        lastPercent = 1 - percentArr.reduce((a, b) => a + b);
      } else {
        lastPercent = 1 - percentArr[0];
      }
      percentArr.push(Number(lastPercent.toFixed(4)));
    }
    this.chartSerialData = [];
    console.log("last percentArr:>>", percentArr);
    console.log("weightArr:>>", weightArr);
    for (let i = 0; i < weightArr.length; i++) {
      this.chartNameData[i] =
        this.chartNameData[i] + "(" + (percentArr[i] * 100).toFixed(2) + "%)";
      this.chartSerialData.push({
        value: weightArr[i],
        name: this.chartNameData[i]
      });
    }
  }
  setChart() {
    this.calcChartData();
    const chart = me.echarts.init(me.$refs.chartPie);
    chart.setOption({
      legend: {
        orient: "vertical",
        top: 12,
        left: 0,
        data: this.chartNameData
      },
      series: [
        {
          type: "pie",
          radius: "80%",
          center: ["70%", "50%"],
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          color: [
            "#1161DB",
            "#3E93EF",
            "#73ABF9",
            "#97C3FE",
            "#BDD9FF",
            "#dfecfd"
          ],
          data: this.chartSerialData
        }
      ]
    });
  }
  async loadData() {
    try {
      const data = await me.ironRequest(
        "promote/customerOrderInfo.shtml?cust_no=" +
          this.custNo +
          "&record_time=2020Q1"
      );
      this.reviewObj = data;
      this.textClass =
        this.reviewObj.page_backgroup < 3 ? "text-red" : "text-yellow";
      this.loadFinish = true;
      setTimeout(function() {
        if (me.reviewObj.all_weight > 0) me.setChart();
      }, 300);
    } catch (e) {
      me.$alert.show({ msg: e.message });
    }
  }
  timeBg(type: number): string {
    switch (type) {
      case 1:
        return "one";
      case 2:
        return "sec";
      default:
        return "third";
    }
  }
  timeText(type: number) {
    switch (type) {
      case 1:
        return "旭日东升";
      case 2:
        return "当午日明";
      default:
        return "晚霞万道";
    }
  }
  clearData() {
    // 测试环境清空数据
    localStorage.removeItem("cust_no");
    window.location.href = me.visitUrl;
  }
}
export default ReviewPage;
</script>
<style lang="stylus" scoped>
.flex-68
  flex 0 0 4.25rem
.slide-bottom-shape
  position absolute
  bottom 0
  right 0
.part-sec
  padding-top 10%
  &.one
    background -webkit-image-set(
      url('../assets/imgs/r_time_bg_one.png') 1x,
      url('http://xymobile.xingyun361.com/r_time_bg_one2x.png') 2x,
      url('http://xymobile.xingyun361.com/r_time_bg_one3x.png') 3x
    )
  &.sec
    background -webkit-image-set(
      url('../assets/imgs/r_time_bg_sec.png') 1x,
      url('http://xymobile.xingyun361.com/r_time_bg_sec2x.png') 2x,
      url('http://xymobile.xingyun361.com/r_time_bg_sec3x.png') 3x
    )
  &.third
    background -webkit-image-set(
      url('../assets/imgs/r_time_bg_third.png') 1x,
      url('http://xymobile.xingyun361.com/r_time_bg_third%402x.png') 2x,
      url('http://xymobile.xingyun361.com/r_time_bg_third%403x.png') 3x
    )
.slide-end-text
  width 250px
  position absolute
  top 26.5%
  right 13%
  color #406198
  font-size 13px
  font-weight bold
  text-align center
  .title-xl
    font-size 28px
  .title
    font-size 25px
.slide-one-shape-one
  background-image url('../assets/imgs/slide_one_shape_one.png')
  width 310px
  height 410px
  position absolute
  z-index 10
  &.delay
    animation-duration 1.5s
    animation-delay 500ms
.slide-one-shape-two
  background-image url('../assets/imgs/slide_one_shape_two.png')
  position absolute
  bottom 3%
  right 15%
  &.delay
    animation-duration 1.5s
    animation-delay 300ms
.slide-one-shape-four
  background-image url('../assets/imgs/slide_one_shape_four.png')
  width 198px
  height 137px
  position absolute
  bottom 25%
  right 5%
.arrow
  width 21px
  height 12px
  position absolute
  left calc(((100% - 21px) / 2))
  bottom 10px
  &.red
    background-image url('../assets/imgs/red_arrow.png')
  &.black
    background-image url('../assets/imgs/black_arrow.png')
  &.green
    background-image url('../assets/imgs/green_arrow.png')
.slide-one-bg
  background -webkit-image-set(
    url('../assets/imgs/slide_one.png') 1x,
    url('http://xymobile.xingyun361.com/slide_one%402x.png') 2x,
    url('http://xymobile.xingyun361.com/slide_one%403x.png') 3x
  )
.slide-two-bg
  background -webkit-image-set(
    url('../assets/imgs/slide_two.png') 1x,
    url('http://xymobile.xingyun361.com/slide_two%402x.png') 2x,
    url('http://xymobile.xingyun361.com/slide_two%403x.png') 3x
  )
.slide-four-bg
  background -webkit-image-set(
    url('../assets/imgs/slide_four.png') 1x,
    url('http://xymobile.xingyun361.com/slide_four%402x.png') 2x,
    url('http://xymobile.xingyun361.com/slide_four%403x.png') 3x
  )
.slide-four-bird
  background-image url('../assets/imgs/bird.png')
  width 244px
  height 54px
  position absolute
  top 3%
  left calc(((100% - 244px) / 2))
.slide-four-monkey
  background-image url('../assets/imgs/monkey.png')
  position absolute
  left 0
  bottom 8%
  z-index 22
.slide-four-envelope-left
  background-image url('../assets/imgs/envelope_one.png')
  position absolute
  top 11%
  left 0
.slide-four-envelope-right
  background-image url('../assets/imgs/envelope_two.png')
  right 0
  bottom 3%
  width 136px
  height 140px
  position absolute
.slide-four-white-flat
  z-index 20
  background-image url('../assets/imgs/white_flat.png')
  position absolute
  right 0px
  bottom 6%
  box-sizing border-box
  padding-top 19.5%
  padding-left 7.5%
  color #406198
  font-weight bold
  text-align center
  .title-xl
    font-size 22px
  .title
    font-size 18px
  .mt-15
    margin-top 10px
  .mt-25
    margin-top 16px
.text-animate
  animation-duration 1.5s
  animation-delay 100ms
.empty-bg
  background -webkit-image-set(
    url('../assets/imgs/empty_bg.png') 1x,
    url('http://xymobile.xingyun361.com/empty_bg%402x.png') 2x,
    url('http://xymobile.xingyun361.com/empty_bg%403x.png') 3x
  )
.empty-box
  padding-top 5%
  .title-bar
    text-align center
    img
      width 336px
      height 151px
  .animal-bar
    width 336px
    position relative
    padding-left 6px
    margin 0 auto
    box-sizing border-box
    top -30px
    .empty-monkey-left
      width 76px
      height 76.5px
    .empty-arrow
      width 114.5px
      height 47px
      margin-bottom 20px
      margin-left 25px
      margin-right 25px
    .empty-monkey-right
      width 70px
      height 72.5px
  .content-box
    background-image url('../assets/imgs/empty_box.png')
    width 318px
    height 451.5px
    margin 0 auto
    position relative
    top -42px
    // padding-top 15%
    box-sizing border-box
    .top-bar
      height 38px
      margin-bottom 12px
      .red-text
        color #D64004
        font-size 13.5px
        font-weight bold
    &.full
      // padding-top 13%
    .list
      padding-left 8%
      padding-right 8%
      .item
        overflow hidden
        text-align center
        padding 5px 10px
        background #EDF4FF
        border-radius 5px
        margin-bottom 5px
        font-weight bold
    .empty-list
      padding-top 20px
      text-align center
      .title
        width 198.5px
        height 31px
      .line
        width 197px
        height 10px
    .bottom
      box-sizing border-box
      padding-top 13%
      .title
        letter-spacing 1px
        text-align center
        color #42403C
        font-weight bold
        font-size 16px
      .qrcode
        width 120px
        height 120px
      &.list
        padding-top 3px
        .title
          font-size 14px
        .qrcode
          width 80px
          height 80px
        &.zoom
          padding-top 25px
          .qrcode
            width 120px
            height 120px
.slide-four-qrcode
  width 70px
  height 70px
.share-modal
  position fixed
  z-index 999
  background rgba(0, 0, 0, 0.8)
  top 0
  left 0
  right 0
  bottom 0
@media screen and (max-height: 605px)
  .empty-box
    .title-bar
      img
        width 320px
        height 143.8px
    .animal-bar
      width 320px
      .empty-monkey-left
        width 60px
        height 60.5px
      .empty-arrow
        margin-bottom 10px
        margin-left 35px
        margin-right 35px
      .empty-monkey-right
        width 58px
        height 60px
    .content-box
      width 290px
      height 411px
      .top-bar
        height 35px
      .list
        font-size 13px
      .bottom
        &.list
          .title
            font-size 13px
          .qrcode
            width 70px
            height 70px
@media screen and (max-height: 575px)
  .part-sec
    padding-top 6% !important
  .empty-box
    .title-bar
      img
        width 310px
        height 139px
    .animal-bar
      width 310px
      .empty-monkey-left
        width 50px
        height 50.5px
      .empty-arrow
        margin-bottom 10px
        margin-left 40px
        margin-right 40px
      .empty-monkey-right
        width 48px
        height 50px
    .content-box
      width 280px
      height 397.5px
      .bottom
        &.list
          .qrcode
            width 55px
            height 55px
@media screen and (width: 320px), screen and (max-height: 520px)
  .swipper
    font-size 12px
  .empty-box
    padding-top 2% !important
    .title-bar
      img
        width 280px
        height 125.8px
    .animal-bar
      width 280px
      .empty-monkey-left
        width 40px
        height 40.4px
      .empty-arrow
        margin-bottom 10px
        height 30px
        width 73px
        margin-left 60px
        margin-right 60px
      .empty-monkey-right
        width 38px
        height 40px
    .content-box
      width 260px
      height 369px
      .top-bar
        height 30px
        .red-text
          font-size 12px
      &.full
        // padding-top 11%
      .list
        font-size 12px
      .bottom
        &.list
          .title
            font-size 11px
          .qrcode
            width 45px
            height 45px
  .slide-four-qrcode
    width 54px
    height 54px
@media screen and (min-height: 723px)
  .slide-one-shape-one
    top 8%
  .slide-four-envelope-left
    top 26%
  .empty-box
    padding-top 15%
</style>
