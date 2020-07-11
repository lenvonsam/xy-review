<template lang="pug">
.container.ls-1(v-show="loadFinish") 
  span(style="position: absolute; top: 15px; left: 15px; z-index: 20", @click="clearData") 清空
  //- .banner-bg.border-box.full-width.empty-bg.relative(:style="{height: screenHeight + 'px'}")
  //-   .empty-box
  //-     .title-bar
  //-       img(src="../assets/imgs/empty_title_bar.png")
  //-     .animal-bar
  //-       img.empty-monkey-left(src="../assets/imgs/monkey_top.png")
  //-       img.empty-arrow(src="../assets/imgs/empty_arrow.png")
  //-       img.empty-monkey-right(src="../assets/imgs/monkey_right.png")
  //-     .content-box.banner-bg
  //-       .top-bar.row.justify-center.align-center
  //-         span.red-text(v-if="reviewObj.rec_goods.length !== 0") 这是您关注的物资信息
  //-       .empty-list(v-if="reviewObj.rec_goods.length === 0")
  //-         img.title(src="../assets/imgs/empty_title.png")
  //-         img.line(src="../assets/imgs/empty_line.png")
  //-         img.clickopenmall-style(src="http://xymobile.xingyun361.com/clickopenmall.png")
  //-         img.hand-style(src="http://xymobile.xingyun361.com/hand.png")
  //-       .list(v-else)
  //-         .item(v-for="(itm, idx) in reviewObj.rec_goods", v-if="reviewObj.rec_goods.length > 0", :key="idx")
  //-           span {{itm.name}}
  //-           span.ml-10 {{itm.standard}}
  //-       .bottom.text-center
  //-         .title
  //-           span 极速询价
  //-           span.ml-5 一键下单
  //-           span.ml-5 智能提货
  //-         img.qrcode.animated.fadeIn(src="../assets/imgs/qrcode.jpg", style="animation-duration: 1.5s; animation-delay: 1s")
  //-         .mt-5(style="font-size:10px; color: #504E49") 微信扫码体验型云小程序
  swiper.swipper.full-width(:options="swiperOption", ref="xySwiper", @slideChange="slideTouchChange")
    swiper-slide
      .banner-bg.box.full-width.relative.slide-introduce1-bg.relative(:style="{height: screenHeight + 'px'}")

        img.keyword-style(src="http://xymobile.xingyun361.com/keyword.png")
    swiper-slide
    swiper-slide
      .banner-bg.box.full-width.relative.slide-keyword-bg.relative(:style="{height: screenHeight + 'px'}")
        div.frame-style
          img.keywordCenter-style(src="http://xymobile.xingyun361.com/keywordfucenter.png")
          img.keywordContent-style(src="http://xymobile.xingyun361.com/keywordfu.png")
          img.keywordLine-style(src="http://xymobile.xingyun361.com/keyword1.png")
          .fs-16.text-center(class="animated bounceInRight") 采钢万钧
          .fs-16.text-center(class="animated bounceInRight") 富可敌国
          .fs-16.text-center(class="animated bounceInRight") 购钢总量超过96%的客户！
          div(style="display:flex; flex-direction: row;")
            img.qrcode-style(src="../assets/imgs/qrcode.jpg")
            div.qrcodeWord-style(style="display:flex; flex-direction: column;")
              .span.fs-12(class="animated bounceInRight") 长按识别二维码                          
              .mt-10.span.fs-12(class="animated bounceInRight") 查看属于自己的采钢关键字吧！
        img.keyword-style(src="http://xymobile.xingyun361.com/keyword.png")
    swiper-slide
      .banner-bg.box.full-width.relative.slide-fifth-bg.relative(:style="{height: screenHeight + 'px'}")
        .slide-fifth-book.banner-bg
          div.content-style
            .mt-15 没有了电话里的讨价还价
            .mt-15 没有了到处比价的捉摸不定
            .row.mt-10.align-center
              div 有的只是您下单时
              .text-red.title(class="animated bounceInLeft") 运筹帷幄
              .col 的气势
            .mt-10 不忘采购的初心，更不负挣钱的韶华
            .mt-10 型云心目中2020年第二季度的 
            .row.mt-10.align-center              
              .text-red.title(class="animated bounceInLeft") 华东钢皇
              .col 非你莫属!
        img.wodegangquan-style(src="http://xymobile.xingyun361.com/wodegangquan.png")
        img.rubber-style(src="http://xymobile.xingyun361.com/rubber.png")
        img.pencil-style(src="http://xymobile.xingyun361.com/pencil.png")
    swiper-slide
      .banner-bg.border-box.full-width.padding-xl.relative.part-sec(:style="{height: screenHeight + 'px'}", :class="[timeBg(1)]")
        .mt-15.text-white(class="animated bounceInRight") 买钢不只有钢市的波澜与壮阔
        .mt-15.text-white(class="animated bounceInRight") 还有使用型云的便捷与放心
        .row.align-center.mt-15
          div.text-white(class="animated bounceInRight") 您本季度的钢圈关键词为：
          .text-bold.text-center.text-animate.mr-5.ml-5.text-yellow.fs-25(class="animated bounceInLeft") 富
        .mt-15.text-white(class="animated bounceInRight") 采钢万钧
        .mt-15.text-white(class="animated bounceInRight") 富可敌国
        .row.mt-15.align-center.text-white
          div(class="animated bounceInRight") 购钢总量超过
          .text-bold.text-animate.text-center.mr-5.ml-5.text-yellow.fs-25(class="animated bounceInLeft") 96%
          .flex-68.text-center(class="animated bounceInRight") 的客户
        img.fu1-style(src="http://xymobile.xingyun361.com/fu1.png")
        img.fu2-style(src="../assets/imgs/fu2.png")
        img.fu3-style(src="http://xymobile.xingyun361.com/fu3.png")
      .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")    
    swiper-slide
      .banner-bg.border-box.full-width.pt-2rem.padding-xl.slide-sec-bg.relative(:style="{height: screenHeight + 'px'}")
        div.mt-10.text-white 在过去的2020年二季度中
        .row.mt-10.align-center
          div.text-white 您在型云一共采购了
          .text-yellow.text-animate.mr-5.ml-5(class="animated bounceInLeft") 50
          .col.text-white 吨钢材
        .row.mt-10.align-center
          div.text-white 其中
          .text-yellow.text-center.ml-5.mr-5(class="animated bounceInLeft") H型钢
          .col.text-white 为您主要的采购品种
        .mt-10.text-white 为疫情过后祖国的经济复苏
        .mt-10.text-white 贡献了自己的力量！ 
        .mt-10.charts-style(class="animated slideInUp", ref="chartPie")
        img.chartsPage1-style(src="http://xymobile.xingyun361.com/chartsPage1.png")
        img.chartsPage4-style(src="http://xymobile.xingyun361.com/chartsPage4.png")
        img.chartsPage2-style(src="http://xymobile.xingyun361.com/chartsPage2.png")
        img.chartsPage3-style(src="http://xymobile.xingyun361.com/chartsPage3.png")
      .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    swiper-slide
      .banner-bg.border-box.full-width.pt-2rem.padding-xl.slide-third-bg.relative(:style="{height: screenHeight + 'px'}")
        .row.mt-10.align-center
          div.text-white 本季度中您一共在型云搜索了
          .text-yellow.text-animate.mr-5.ml-5(class="animated bounceInLeft") 999
          .col.text-white 次
        .row.mt-10.align-center
          div.text-white 其中
          .text-yellow.text-center.ml-5.mr-5(class="animated bounceInLeft") H型钢
          .col.text-white 是您搜索最多的品类
        .row.mt-10.align-center
          div.text-white 有
          .text-yellow.text-animate.mr-5.ml-5(class="animated bounceInLeft") 10%
          .col.text-white 成功进入到了您的购物车中                           
        .mt-10.text-white 众里寻他千百度
        .mt-20.text-white.text-center 型云帮你找到理想中的物资了吗？
        .row.mt-15.text-center
          div.margin-auto.text-white
            label
              input(type="radio", name="inputRadio")
              span.ml-8 是
            label.ml-23
              input(type="radio", name="inputRadio")
              span.ml-8 否
        .row.mt-20
          button.submit-btn(type='submit') 确定
      .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    swiper-slide
      .banner-bg.border-box.full-width.padding-xl.slide-forth-bg.relative(:style="{height: screenHeight + 'px'}")
        .row.mt-15.align-center.text-white
          div(class="animated bounceInRight") 您一共成交了
          .text-yellow.text-animate.mr-5.ml-5(class="animated bounceInLeft") 60
          .col.text-white(class="animated bounceInRight") 笔订单
        .row.mt-10.align-center.text-white
          div(class="animated bounceInRight") 我们的业务员为您提供了
          .text-yellow.text-animate.mr-5.ml-5(class="animated bounceInLeft") 25
          .col.text-white(class="animated bounceInRight") 笔定向开单服务
        .row.mt-10.align-center.text-white
          div(class="animated bounceInRight") 您总是习惯在
          .text-animate.text-center.mr-5.ml-5.text-yellow(class="animated bounceInLeft") 当午日明
          .col.text-white(class="animated bounceInRight") 的时候下单
        .row.mt-10.align-center.text-white
          div(class="animated bounceInRight") 型云一共为您节约了
          .text-animate.text-center.mr-5.ml-5.text-yellow(class="animated bounceInLeft") 90
          .col.text-white(class="animated bounceInRight") 分钟的下单时间
        .mt-10.text-white(class="animated bounceInRight") 您可以利用这些时间
        .row.mt-10.align-center.text-white
          div(class="animated bounceInRight") 多看
          .text-animate.text-center.mr-5.ml-5.text-yellow(class="animated bounceInLeft") 1
          .col.text-white(class="animated bounceInRight") 场精彩的电影
        .mt-10.text-white(class="animated bounceInRight") 更多的陪伴家人
        .mt-10.text-white(class="animated bounceInRight") 与朋友分享自己的快乐
        img.page4movie-style(src="http://xymobile.xingyun361.com/page4movie.png")
      .black.arrow.banner-bg.animated.infinite.zoomIn(style="animation-duration: 2s")
    
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from "echarts";
let self: any;
@Component({
  components: {}
})
class NewReviewPage extends Vue {
  echarts: any = echarts;
  loadFinish = false;
  custNo = "";
  reviewObj = {};
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
  slideOneAnimateOne = "";
  slideOneAnimateTwo = "";
  bottomImgOneHeight = 246;
  bottomImgSecWidth = 320;
  bottomImgSecHeight = 246;
  bottomImgOne: ImageData = require("@/assets/imgs/review_slide_b_one.png");
  bottomImgSec: ImageData = require("@/assets/imgs/review_slide_b_sec.png");

  beforeMount() {
    self = this;
    self.$nextTick(function() {
      if (self.$route.query.cust_no) {
        self.custNo = self.$route.query.cust_no;
      }
      if (self.custNo.length > 0) {
        self.loadData();
      }
    });
  }
  mounted() {
    this.$nextTick(() => {
      self.setChart();
    });
  }
  clearData() {
    // 测试环境清空数据
    self = this;
    debugger;
    localStorage.removeItem("cust_no");
    window.location.href = self.visitUrl;
  }
  async loadData() {
    self = this;
    try {
      const data = await self.ironRequest(
        "promote/customerOrderInfo.shtml?cust_no=" +
          self.custNo +
          "&record_time=2020Q2"
      );
      self.reviewObj = data;
      self.loadFinish = true;
      // setTimeout(function() {
      //   if (self.reviewObj.all_weight > 0) self.setChart();
      // }, 300);
    } catch (e) {
      self.$alert.show({ msg: e.message });
    }
  }
  slideTouchChange() {
    console.log("11111111111111111111111111");
  }
  timeBg(type: number): string {
    switch (type) {
      case 1:
        return "one";
      case 2:
        return "sec";
      case 3:
        return "third";
      default:
        return "forth";
    }
  }
  // calcChartData() {
  //   const totalWeight = this.reviewObj.all_weight;
  //   const weightArr = [];
  //   this.chartNameData = [];
  //   if (this.reviewObj.weight_one > 0) {
  //     weightArr.push(this.reviewObj.weight_one);
  //     this.chartNameData.push(this.reviewObj.goods_name_one);
  //   }
  //   if (this.reviewObj.weight_two > 0) {
  //     weightArr.push(this.reviewObj.weight_two);
  //     this.chartNameData.push(this.reviewObj.goods_name_two);
  //   }
  //   if (this.reviewObj.weight_three > 0) {
  //     weightArr.push(this.reviewObj.weight_three);
  //     this.chartNameData.push(this.reviewObj.goods_name_three);
  //   }
  //   if (this.reviewObj.weight_four > 0) {
  //     weightArr.push(this.reviewObj.weight_four);
  //     this.chartNameData.push(this.reviewObj.goods_name_four);
  //   }
  //   if (this.reviewObj.weight_five > 0) {
  //     weightArr.push(this.reviewObj.weight_five);
  //     this.chartNameData.push(this.reviewObj.goods_name_five);
  //   }
  //   let otherWeight = 0;
  //   if (weightArr.length > 1)
  //     otherWeight = totalWeight - weightArr.reduce((a, b) => a + b);
  //   if (otherWeight > 0) {
  //     weightArr.push(Number(otherWeight.toFixed(3)));
  //     this.chartNameData.push("其他");
  //   }
  //   // 计算占比
  //   let percentArr = [];
  //   for (let i = 0; i < weightArr.length - 1; i++) {
  //     const tempW = weightArr[i];
  //     const tempPert = Number(((tempW * 100) / (totalWeight * 100)).toFixed(4));
  //     percentArr.push(tempPert);
  //   }
  //   if (weightArr.length === 1) percentArr = ["1.0000"];
  //   let lastPercent = 0;
  //   if (weightArr.length > 1) {
  //     if (percentArr.length > 1) {
  //       lastPercent = 1 - percentArr.reduce((a, b) => a + b);
  //     } else {
  //       lastPercent = 1 - percentArr[0];
  //     }
  //     percentArr.push(Number(lastPercent.toFixed(4)));
  //   }
  //   this.chartSerialData = [];
  //   console.log("last percentArr:>>", percentArr);
  //   console.log("weightArr:>>", weightArr);
  //   for (let i = 0; i < weightArr.length; i++) {
  //     this.chartNameData[i] =
  //       this.chartNameData[i] + "(" + (percentArr[i] * 100).toFixed(2) + "%)";
  //     this.chartSerialData.push({
  //       value: weightArr[i],
  //       name: this.chartNameData[i]
  //     });
  //   }
  // }
  setChart() {
    // this.calcChartData();
    self = this;
    const chart = this.echarts.init(this.$refs.chartPie);
    chart.setOption({
      aria: {
        show: true
      },
      // series: [
      //   {
      //     type: "pie",
      //     radius: "80%",
      //     center: ["50%", "70%"],
      //     label: {
      //       show: false
      //     },
      //     emphasis: {
      //       label: {
      //         show: false
      //       }
      //     },
      //     color: [
      //       "#1161DB",
      //       "#3E93EF",
      //       "#73ABF9",
      //       "#97C3FE",
      //       "#BDD9FF",
      //       "#dfecfd"
      //     ],
      //     data: [
      //       { value: 335, name: "直接访问" },
      //       { value: 310, name: "邮件营销" },
      //       { value: 234, name: "联盟广告" },
      //       { value: 135, name: "视频广告" },
      //       { value: 1548, name: "搜索引擎" }
      //     ]
      //   }
      // ]
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            formatter: "{a|{a}}\n{hr|}\n  {per|{d}%}  ",
            rich: {
              a: {
                color: "#86E8E7",
                lineHeight: 22,
                align: "center"
              },
              hr: {
                borderColor: "#86E8E7",
                width: "100%",
                borderWidth: 0.5,
                height: 0.5
              },
              per: {
                color: "#86E8E7",
                align: "center",
                padding: [0, 0, 4, 0]
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: true
          },
          color: ["#C5EAFF", "#86E8E7", "#C3F8CD", "#9EE4AF"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        }
      ]
    });
  }
}
export default NewReviewPage;
</script>

<style lang="stylus" scoped>
// 375px作为设计稿基准
vm(val)
  return (val / 375) * 100vw
.ls-1
  letter-spacing vm(1)
.text-white
  color #FFFFFF
  font-size vm(15)
.text-yellow
  color #FFD946
  font-size vm(15)
.fs-25
  font-size vm(25)
.fs-16
  font-size vm(16)
.fs-12
  font-size vm(12)
.mt-15
  margin-top vm(15)
.mt-20
  margin-top vm(20)
.ml-23
  margin-left vm(23)
.ml-8
  margin-left vm(8)
.margin-auto
  margin 0 auto
.flex-68
  flex 0 0 3rem
.part-sec
  padding-top 10%
  &.one
    background -webkit-image-set(url('http://xymobile.xingyun361.com/fubkg.png') 1x)
  &.sec
    background -webkit-image-set(url('http://xymobile.xingyun361.com/langbkg.png') 1x)
  &.third
    background -webkit-image-set(url('http://xymobile.xingyun361.com/shuangbkg.png') 1x)
  &.forth
    background -webkit-image-set(url('http://xymobile.xingyun361.com/wenbkg.png') 1x)
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
.fu1-style
  width vm(158)
  height vm(155)
  position absolute
  left 0
  bottom vm(77)
.fu2-style
  width vm(155)
  height vm(123)
  position absolute
  left 0
  bottom 0
.fu3-style
  width vm(153)
  height vm(104)
  position absolute
  right 0
  bottom 0
.slide-sec-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/chartsPagebkg.png') 1x)
.charts-style
  width vm(335)
  height vm(200)
.chartsPage1-style
  width vm(173)
  height vm(170)
  position absolute
  right 0
  top vm(26)
.chartsPage2-style
  width vm(258)
  height vm(144)
  position absolute
  left 0
  bottom 0
.chartsPage3-style
  width vm(219)
  height vm(117)
  position absolute
  right 0
  bottom 0
.chartsPage4-style
  width vm(115)
  height vm(115)
  position absolute
  left vm(153)
  bottom vm(91)
.slide-third-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/checkPagebkg.png') 1x)
input[type=radio]
  -webkit-appearance none
  appearance none
  outline none
  width vm(16)
  height vm(16)
  cursor pointer
  vertical-align center
  border 1px solid #fff
  border-radius 50%
  position relative
input[type=radio]:checked::after
  // content: url('http://xymobile.xingyun361.com/checkHook.png')
  // width vm(21)
  // height vm(16)
  content url('../assets/imgs/checkMark.png')
  display block
  position absolute
  right 0
  bottom 0
  width vm(16)
  height vm(16)
.submit-btn
  width vm(100)
  height vm(34)
  margin 0 auto
  background rgba(255, 255, 255, 0.54)
  border 1px solid rgba(255, 255, 255, 1)
  border-radius vm(17)
  font-size vm(19)
  font-weight 500
  color rgba(8, 36, 134, 1)
.slide-forth-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/noonbkg.png') 1x)
.page4movie-style
  width 100%
  height vm(289)
  position absolute
  bottom 0
  left 0
.slide-fifth-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/reviewbkg.png') 1x)
.slide-fifth-book
  background-image url('http://xymobile.xingyun361.com/book.png')
  width vm(341)
  height vm(438)
  position absolute
  left vm(24)
  top vm(140)
  .content-style
    width vm(230)
    height auto
    position absolute
    left vm(52)
    top vm(119)
.wodegangquan-style
  width vm(180)
  height vm(45)
  position absolute
  margin vm(88) vm(100) 0
.rubber-style
  width vm(102)
  height vm(87)
  position absolute
  left 0
  bottom 0
.pencil-style
  width vm(134)
  height vm(99)
  position absolute
  right 0
  bottom 0
.slide-keyword-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/keywordfubkg.png') 1x)
  .keyword-style
    width vm(277)
    height vm(82)
    position absolute
    margin vm(91) 0 0 vm(51)
  .frame-style
    width vm(312)
    height vm(452)
    position absolute
    margin vm(151) 0 0 vm(30)
    background rgba(255, 255, 255, 1)
    border-radius 13px
    .keywordCenter-style
      width vm(289)
      height vm(188)
      position relative
      margin vm(44) 0 0 vm(12)
    .keywordContent-style
      width vm(44)
      height vm(45)
      position relative
      margin vm(-22) 0 0 vm(135)
    .keywordLine-style
      width vm(152)
      height vm(15)
      position relative
      margin vm(2) 0 0 vm(86)
    .qrcode-style
      width vm(73)
      height vm(73)
      position relative
      margin vm(18) 0 0 vm(10)
    .qrcodeWord-style
      margin vm(45) 0 0 vm(8)
.empty-bg
  background -webkit-image-set(url('../assets/imgs/empty_bg.png') 1x)
.empty-box
  padding-top vm(60)
  .title-bar
    text-align center
    img
      width vm(336)
      height vm(151)
  .animal-bar
    width vm(336)
    position relative
    padding-left vm(6)
    margin 0 auto
    box-sizing border-box
    top vm(-30)
    .empty-monkey-left
      width vm(76)
      height vm(76.5)
    .empty-arrow
      width vm(114.5)
      height vm(47)
      margin-bottom vm(20)
      margin-left vm(25)
      margin-right vm(25)
    .empty-monkey-right
      width vm(70)
      height vm(72.5)
  .content-box
    background-image url('../assets/imgs/empty_box.png')
    width vm(318)
    height vm(451.5)
    margin 0 auto
    position relative
    top vm(-42)
    box-sizing border-box
    .top-bar
      height vm(38)
      margin-bottom vm(12)
      .red-text
        color #D64004
        font-size vm(13.5)
        font-weight bold
    .list
      padding-left 8%
      padding-right 8%
      .item
        overflow hidden
        text-align center
        padding vm(5) vm(10)
        background #EDF4FF
        border-radius vm(5)
        margin-bottom vm(5)
        font-weight bold
    .empty-list
      padding-top vm(20)
      text-align center
      .title
        width vm(198.5)
        height vm(31)
      .line
        width vm(197)
        height vm(10)
      .clickopenmall-style
        width vm(239)
        height vm(64)
        position relative
        margin vm(10) 0 0
      .hand-style
        width vm(27)
        height vm(32)
        position absolute
        margin vm(64) 0 0 vm(-44)
    .bottom
      box-sizing border-box
      padding-top 13%
      .title
        letter-spacing vm(1)
        text-align center
        color #42403C
        font-weight bold
        font-size vm(16)
      .qrcode
        width vm(120)
        height vm(120)
.slide-introduce1-bg
  background -webkit-image-set(url('http://xymobile.xingyun361.com/introduce1bkg.png') 1x)
</style>
