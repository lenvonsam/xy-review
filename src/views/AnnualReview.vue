<template lang="pug">
.container(v-if="showPage")
  //- span(
  //-   style="position: absolute; top: 10px; left: 15px; z-index: 20",
  //-   @click="clearData"
  //- ) 退出
  music
  share-modal(v-model="modalShow")
  .banner-bg.border-box.full-width.relative.page-get-info(
    v-if="custNo == -1",
    :style="{ height: screenHeight + 'px' }"
  )
    .title-pic
    .part-bkg.relative
      .part-title
      .part-absolute(v-for="(pgi,idx) in pageInfoPartOne", :key="pgi.id")
        .one
          .first {{pgi.title}}
          .sec {{pgi.subTitle}}
        .two(:class="['c' + idx]")
    .part-bkg.sec
      .part-title-sec
      .form-bg
        .formword-style.text-bold 公司名称
        input.pl-10(placeHolder="请输入公司名称", ref="compName", @blur="autoScroll")
        .formword-style.text-bold 联系电话
        input.pl-10(
          placeHolder="请输入联系电话",
          type="tel",
          ref="phoneNum",
          v-model="phoneInput"
        )
        .formword-style.text-bold.mt-10 经营性质
        div(
          style="display: flex; flex-direction: row; justify-content: space-between; width: 90%; margin-top: 5px"
        )
          label(
            v-for="radio, index in radioGroup",
            :key="index",
            style="display: flex; flex-direction: row; position: relative"
          )
            input(type="radio", v-model="picked", :value="radio.id")
            span {{ radio.name }}
        button.comfirm-btn(@click="submintInfor()") 确认
  template(v-else)
    .banner-bg.border-box.full-width.empty-bg.relative(
      :style="{ height: screenHeight + 'px' }",
      v-if="reviewObj.all_weight == 0"
    )
      .empty-box
        .title-bar
          img(src="../assets/imgs/empty_year.png")
        .animal-bar
          img.empty-monkey-left(src="../assets/imgs/monkey_top.png")
          img.empty-arrow(src="../assets/imgs/empty_arrow.png")
          img.empty-monkey-right(src="../assets/imgs/monkey_right.png")
        .content-box.banner-bg
          .top-bar.row.justify-center.align-center
            span.red-text(v-if="reviewObj.rec_goods.length > 0") 这是您关注的物资信息
          .list(v-if="reviewObj.rec_goods && reviewObj.rec_goods.length > 0")
            .item(
              v-for="(itm, idx) in reviewObj.rec_goods",
              v-if="reviewObj.rec_goods.length > 0",
              :key="idx"
            )
              span {{ itm.name }}
              span.ml-10 {{ itm.standard }}
          .empty-list(v-else)
            img.title(src="../assets/imgs/empty_title.png")
            img.line(src="../assets/imgs/empty_line.png")
          .bottom.text-center(v-if="reviewObj.rec_goods.length <= 0")
            .title.mt-10
              span 极速询价
              span.ml-5 一键下单
              span.ml-5 智能提货
            img.mt-10.qrcode.animated.fadeIn(
              src="../assets/imgs/qrcode.jpg",
              style="animation-duration: 1.5s; animation-delay: 1s"
            )
            .mt-10(style="font-size: 10px; color: #504e49") 微信扫码体验型云小程序
          .bottom(
            v-else,
            style="display: flex; flex-direction: column; align-items: center"
          )
            img.mt-5.qrcode.animated.fadeIn(
              src="../assets/imgs/qrcode.jpg",
              style="animation-duration: 1.5s; animation-delay: 1s"
            )
    swiper.swipper.full-width(
      :options="swiperOption",
      ref="xySwiper",
      @slideChange="slideTouchChange",
      v-else
    )
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page1-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .box
            .title {{keyDescription(reviewObj.key_flag)}}
            div(:class="[keyBkg(reviewObj.key_flag)]")
            .bottom-mark 您2021开年属于哪种”牛“
            .flex-column.content-center.text-center.lh-30.font-19.text-bold
              .flex-column(v-if="reviewObj.key_flag == 1")
                .animated.bounceInRight 
                  | 采钢万钧
                  span.ml-15 富可敌国
              .flex-column(v-else-if="reviewObj.key_flag == 2")
                .animated.bounceInRight
                  | 你来我往
                  span.ml-15 有条不紊
              .flex-column(v-else-if="reviewObj.key_flag == 3")
                .animated.bounceInRight
                  | 驷马难追
                  span.ml-15 唯快不破
              .flex-column(v-else) 
                span.animated.bounceInRight
                  | 高瞻远瞩
                  span.ml-15 卓尔不群
              .flex-row.content-center(v-if="reviewObj.key_flag == 1")
                span 购钢总量超过
                span {{ parseInt(reviewObj.all_weight_percent) }}%
                span 的客户
              .flex-row.content-center(v-else-if="reviewObj.key_flag == 2")
                span 采购频率超过
                span {{ parseInt(reviewObj.purchase_cycle_percent) }}%
                span 的客户
              .flex-row.content-center(v-else-if="reviewObj.key_flag == 3")
                span 急速付款超过
                span {{ parseInt(reviewObj.payment_time_percent) }}%
                span 的客户
              .flex-row.content-center(v-else)
                span 您的未来充满无限可能
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page3-bkg.flex-column.font-12(
          :style="{ height: screenHeight + 'px' }"
        )
          .box-sec
            span 在2021第一季度中
            .row.align-baseline
              span 您在型云一共采购了
              .font-17.text-red.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.all_weight.toFixed(3) }}
              .col 吨钢材
            span 不忘采购的初心，更不负挣钱的韶华
            .row.align-baseline
              span 相较于上季度提升
              .font-17.text-red.text-bold {{ reviewObj.allWeightDiff }}
              span %
            .row.align-baseline
              span 其中
              .font-17.text-red.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.goods_name_one }}
              .col 为您主要的采购品种
            .row
              .charts-style.animated.slideInUp(ref="chartPie")
            .row.align-baseline
              span 您在型云一共搜索了
              .font-17.text-red.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.search_count }}
              .col 次物资
            .row.align-baseline
              span 有
              .font-17.text-red.text-bold.text-animate.animated.bounceInLeft {{ cartPercent }}
              .col %成功进入到了您的购物车中
            span 众里寻他千百度
            div 型云帮您找到理想中的物资了吗？
            .flex-row.align-center(style="margin: 10px auto;")
              img(
                v-if="findGoods",
                src="../assets/imgs/annual_selected.png"
                style="width: 15.5px"
              )
              img(
                v-else,
                src="../assets/imgs/annual_unselected.png",
                style="width: 15.5px"
                @click="selectFindGoods"
              )
              .text-black.font-15.ml-3 是
              img.ml-10(
                v-if="!findGoods",
                src="../assets/imgs/annual_selected.png"
                style="width: 15.5px"
              )
              img.ml-10(
                v-else,
                src="../assets/imgs/annual_unselected.png",
                style="width: 15.5px"
                @click="selectFindGoods"
              )
              .text-black.font-15.ml-3 否
            .submit-btn.font-15(v-if="showFindGoodsBtn" @click="submitFindGoodsSelect") 提交
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page4-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .box-third.flex-column.font-14(:class="[screenHeight < 812? 'lh-34': 'lh-28']")
            .flex-row.align-baseline
              span 第一季度您一共成交了
              .ml-3.mr-3.text-bold.text-red {{ reviewObj.dx_num + reviewObj.zz_num }}
              span 笔合同
            .flex-row.align-baseline
              span 我们的业务员为您提供了
              .text-bold.text-red {{ reviewObj.dx_num }}
              span 笔定向开单服务
            .flex-row.align-baseline
              span 您总是习惯在
              .ml-3.mr-3.text-bold.text-red {{ getBgTime(reviewObj.page_backgroup) }}
              span 的时候采购
            .flex-row.align-baseline
              span 型云一共为您节约了
              .text-bold.text-red {{ (reviewObj.order_num * 3).toFixed(0) }}
              span 分钟的交易时间
            span 您可以利用这些时间
            .flex-row.align-baseline(
              v-if="[getRelase(reviewObj.order_num * 3)] == 'movie'"
            )
              span 多看
              .ml-3.text-bold.text-red {{ relaseNum }}
              span 场精彩的电影，
              span 更多的陪伴家人
            .flex-row.align-baseline(v-else)
              span 多听
              .ml-3.text-bold.text-red {{ relaseNum }}
              span 首美妙的歌曲
            span 更多的陪伴家人
            span 与朋友分享自己的快乐
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.pt-35.relative.page5-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .box-fourth
            .title-fourth
            .lbl.text-white.font-12 您希望型云
            .choose-area
              .row(v-for="goal in goalsGroup", :key="goal.id", @click="goalRowChoose(goal)")
                .icon-col
                  .choose-icon
                    .checked(v-if="goal.choosed")
                .col.row.align-center {{goal.name}}
            .choose-btn(@click="goalSubmit()", v-if="goalBtnShow") 提交
            .bottom-lbl.sec 不忘初心 立志于为客户带来
            .bottom-lbl 更全面、更高效、更便捷、成本更低的服务
      swiper-slide
        .banner-bg.border-box.full-width.page6-bkg.padding-10(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-area.relative
            .score-lbl 为我打分
            img.head-pic(:src="reviewObj.employeePic")
            .flex-row.font-14.content-center.mb-5
              span 服务经理：
              span {{ reviewObj.employee_name }}
            .flex-row.text-grey.font-12.content-center
              span 联系电话：
              span {{ reviewObj.employee_phone }}
            .score-area
              .mt-10.font-14(v-for="(pitem, pidx) in starLbls", :key="pidx")
                .row
                  .width-30 {{pitem.title}}
                  .col
                    .sub-title {{pitem.subTitle}}
                .flex-row.content-around.mt-10
                  img.star-pic(
                    v-for="(item, index) in starList[pidx].star",
                    :key="index",
                    :src="item",
                    @click="getStar(starList[pidx].name, index)"
                  )
            .submit-btn(v-if="showSubmitStarBtn", @click="submitStar") 提交评价
          .bottom-text 
            | 感谢您一直以来的认可和支持，欢迎多提宝贵的意见和建议
            br
            | 型云的诗和远方，就是为您创造更好的购钢体验！
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page7-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content7-bg.flex-column.lh-40.font-15
            .title7 
            div(:class="[keyBkg(reviewObj.key_flag)]")
            div(v-if="reviewObj.key_flag == 1")
              span 购钢总量超过
              .font-25.text-red.ml-3.mr-3 {{ parseInt(reviewObj.all_weight_percent) }}
              span %的客户
            div(v-else-if="reviewObj.key_flag == 2")
              span 采购频率超过
              .font-25.text-red.ml-3.mr-3 {{ parseInt(reviewObj.purchase_cycle_percent) }}
              span %的客户
            .flex-row(v-else-if="reviewObj.key_flag == 3")
              span 急速付款超过
              .font-25.text-red.ml-3.mr-3 {{ parseInt(reviewObj.payment_time_percent) }}
              span %的客户
            div(v-else)
              span 您的未来充满无限可能
            .flex-row
              .font-25.mr-3.text-red {{ reviewObj.days }}
              span 个日日夜夜
            .flex-row
              .font-25.mr-3.text-red {{ (reviewObj.xy_contract / 6).toFixed(0) }}
              span 个小时的采钢服务
            span 这就是最长情的陪伴!
          .page7-pic(:class="titleBkg")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import music from "@/components/Music.vue";
import shareModal from "@/components/ShareModal.vue";
import echarts from "echarts";
// eslint-disable-next-line
let self: any;
@Component({
  components: {
    music,
    shareModal
  }
})
class AnnualReview extends Vue {
  echarts: any = echarts;
  showPage = false;
  wxShareTitle = "型云季度回顾";
  wxShareDesc = "型云分享描述";
  custNo = "";
  reviewObj = {};
  swiperSildeIndex = 0;
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
  goalBtnShow = true;
  titleBkg = "first";
  chartData = [];
  relaseNum = 1;
  writeOpinion = "";
  pickedOpinions = [];
  phoneInput = "";
  picked = "";
  radioGroup = [
    { id: 1, name: "金融" },
    { id: 2, name: "加工" },
    { id: 3, name: "物流" },
    { id: 4, name: "供应" },
    { id: 5, name: "采购" }
  ];
  goalsGroup = [
    { id: 1, name: "提供赊销白条支付服务", choosed: false },
    { id: 2, name: "提供在途物资订购服务", choosed: false },
    { id: 3, name: "提供特价竞拍服务", choosed: false },
    { id: 4, name: "提供拼单团购服务", choosed: false },
    { id: 5, name: "提供型云积分换购服务", choosed: false },
    { id: 6, name: "提供行情预判信息推送服务", choosed: false }
  ];
  btnClick = true;
  modalShow = false;
  modalShowNever = true;
  turnover = 10;
  cartPercent = "";
  findGoods = true;
  showFindGoodsBtn = true;
  saveHours = "";
  pageInfoPartOne = [
    { id: 1, title: "金融服务", subTitle: "服务中小微   成就大未来 " },
    { id: 2, title: "物流服务", subTitle: "整车拼车顺风车  车车都满" },
    { id: 3, title: "加工服务", subTitle: "展现一场钢铁加工的  艺术之旅" },
    {
      id: 4,
      title: "物资采购",
      subTitle: "只为您每一次采购的满意与放心"
    },
    {
      id: 5,
      title: "钢铁供应",
      subTitle: "人无我有 人有我优 人优我精"
    }
  ];
  starLbls = [
    { key: "sqxy", title: "询价响应", subTitle: "快速回复" },
    { key: "fwtd", title: "开单态度", subTitle: "热情耐心" },
    { key: "fwzl", title: "配合提货", subTitle: "高效有序" },
    { key: "shgz", title: "异议跟踪", subTitle: "圆满解决" },
    { key: "mycd", title: "满意程度", subTitle: "非常满意" }
  ];
  starList = [
    {
      name: "sqxy",
      star: [
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png"
      ],
      num: 0
    },
    {
      name: "fwtd",
      star: [
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png"
      ],
      num: 0
    },
    {
      name: "fwzl",
      star: [
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png"
      ],
      num: 0
    },
    {
      name: "shgz",
      star: [
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png"
      ],
      num: 0
    },
    {
      name: "mycd",
      star: [
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png",
        "http://xymobile.xingyun361.com/annual_unselect_star.png"
      ],
      num: 0
    }
  ];
  showSubmitStarBtn = true;
  beforeMount() {
    self = this;
    self.initWxConfig();
    if (self.$route.query.cust_no) {
      self.custNo = self.$route.query.cust_no;
      if (self.custNo) {
        self.loadData();
      }
    } else if (localStorage.getItem("cust_no")) {
      self.custNo = localStorage.getItem("cust_no");
      if (self.custNo) {
        self.loadData();
      }
    } else {
      window.location.replace(self.visitUrl);
    }
  }
  initWxConfig() {
    self = this;
    if (self.browserName() === "wxpub") {
      self
        .initWxJs()
        .then(wx => {
          console.log("wx:>>", wx);
          wx.onMenuShareTimeline({
            title: self.wxShareTitle,
            link: self.visitUrl + "?source=3",
            imgUrl: "http://xymobile.xingyun361.com/share_pic.png",
            success() {
              console.log("wx share success");
            },
            error() {
              console.log("wx share fail");
            }
          });
          if (self.custNo != "-1") {
            self.wxShareDesc =
              "2021年型云季度采钢关键字是" +
              self.keyWord(self.reviewObj.key_flag) +
              "，点击查看属于自己的2021有多”牛“吧！";
            wx.onMenuShareAppMessage({
              title: self.wxShareTitle,
              desc: self.wxShareDesc,
              link: self.visitUrl + "?source=3",
              imgUrl: "http://xymobile.xingyun361.com/share_pic.png",
              success() {
                console.log("wx share success");
              },
              error() {
                console.log("wx share fail");
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  // 测试环境清空数据
  clearData() {
    self = this;
    localStorage.removeItem("cust_no");
    window.location.replace(self.visitUrl);
  }
  // 轮播翻页
  slideTouchChange() {
    const slideIndex = self.$refs.xySwiper.$swiper.activeIndex;
    console.log("slide Index:>>", slideIndex);
    if (this.swiperSildeIndex !== slideIndex) {
      this.swiperSildeIndex = slideIndex;
      console.log("swiperSlideIndex:>>", this.swiperSildeIndex);
    }
    if (this.custNo !== "-1") {
      if (this.swiperSildeIndex == 5) {
        this.modalShow = true && this.modalShowNever;
        console.log("末页遮罩层" + this.modalShow);
        this.modalShowNever = false;
      }
    }
  }
  goalRowChoose(goal: any) {
    console.log("goal:>>", goal);
    if (this.goalBtnShow) {
      goal.choosed = !goal.choosed;
    }
  }
  async loadData() {
    self = this;
    console.log("loadData");
    const data = await self.ironRequest(
      "promote/customerOrderInfo.shtml?custNo=" +
        self.custNo +
        "&recordTime=2021Q1",
      {},
      "get"
    );
    if (data.returncode == "0") {
      console.log(data);
      self.reviewObj = data;
      self.showPage = true;
      if (self.custNo != -1 && self.reviewObj.all_weight > 0) {
        self.reviewObj.allWeight = self.reviewObj.all_weight.toFixed(2);
        // eslint-disable-next-line prettier/prettier
        self.reviewObj.allWeightPercent = self.reviewObj.all_weight_percent.toFixed(
          0
        );
        self.reviewObj.allWeightDiff = (
          self.reviewObj.all_weight_diff * 100
        ).toFixed(2);
        self.turnover = self.unitConvert(self.reviewObj.xy_turnover);

        let leftWeight = 0;
        if (self.reviewObj.weight_one) {
          leftWeight = Number(
            (self.reviewObj.all_weight - self.reviewObj.weight_one).toFixed(3)
          );
          self.chartData.push({
            value: self.reviewObj.weight_one,
            name: self.reviewObj.goods_name_one
          });
          if (leftWeight > 0) {
            self.chartData.push({
              value: leftWeight,
              name: "其他"
            });
            if (self.reviewObj.weight_two && self.reviewObj.weight_two > 0) {
              leftWeight = Number(
                (
                  self.reviewObj.all_weight -
                  self.reviewObj.weight_one -
                  self.reviewObj.weight_two
                ).toFixed(3)
              );
              self.chartData.push({
                value: self.reviewObj.weight_two,
                name: self.reviewObj.goods_name_two
              });
              if (leftWeight > 0) {
                self.chartData.map(item => {
                  if (item.name == "其他") {
                    item.value = leftWeight;
                  }
                });
                if (
                  self.reviewObj.weight_three &&
                  self.reviewObj.weight_three > 0
                ) {
                  leftWeight = Number(
                    (
                      self.reviewObj.all_weight -
                      self.reviewObj.weight_one -
                      self.reviewObj.weight_two -
                      self.reviewObj.weight_three
                    ).toFixed(3)
                  );
                  self.chartData.push({
                    value: self.reviewObj.weight_three,
                    name: self.reviewObj.goods_name_three
                  });
                  if (leftWeight > 0) {
                    self.chartData.map(item => {
                      if (item.name == "其他") {
                        item.value = leftWeight;
                      }
                    });
                    if (
                      self.reviewObj.weight_four &&
                      self.reviewObj.weight_four > 0
                    ) {
                      leftWeight = Number(
                        (
                          self.reviewObj.all_weight -
                          self.reviewObj.weight_one -
                          self.reviewObj.weight_two -
                          self.reviewObj.weight_three -
                          self.reviewObj.weight_four
                        ).toFixed(3)
                      );
                      self.chartData.push({
                        value: self.reviewObj.weight_four,
                        name: self.reviewObj.goods_name_four
                      });
                      if (leftWeight > 0) {
                        self.chartData.map(item => {
                          if (item.name == "其他") {
                            item.value = leftWeight;
                          }
                        });
                        if (
                          self.reviewObj.weight_five &&
                          self.reviewObj.weight_five > 0
                        ) {
                          leftWeight = Number(
                            (
                              self.reviewObj.all_weight -
                              self.reviewObj.weight_one -
                              self.reviewObj.weight_two -
                              self.reviewObj.weight_three -
                              self.reviewObj.weight_four -
                              self.reviewObj.weight_five
                            ).toFixed(3)
                          );
                          self.chartData.push({
                            value: self.reviewObj.weight_five,
                            name: self.reviewObj.goods_name_five
                          });
                          if (leftWeight > 0) {
                            self.chartData.map(item => {
                              if (item.name == "其他") {
                                item.value = leftWeight;
                              }
                            });
                          } else {
                            self.chartData = self.chartData.filter(
                              item => item.name !== "其他"
                            );
                          }
                        }
                      } else {
                        self.chartData = self.chartData.filter(
                          item => item.name !== "其他"
                        );
                      }
                    }
                  } else {
                    self.chartData = self.chartData.filter(
                      item => item.name !== "其他"
                    );
                  }
                }
              } else {
                self.chartData = self.chartData.filter(
                  item => item.name !== "其他"
                );
              }
            }
          }
        }
        if (self.reviewObj.search_count && self.reviewObj.search_count > 0) {
          const cartPer = Math.floor(
            self.reviewObj.cart_count / self.reviewObj.search_count
          );
          self.cartPercent = cartPer;
        } else {
          self.cartPercent = 0;
        }
        self.reviewObj.employeePic = "http:" + self.reviewObj.employee_pic;
        if (
          self.reviewObj.rating_sqxy !== 0 ||
          self.reviewObj.rating_fwtd !== 0 ||
          self.reviewObj.rating_fwzl !== 0 ||
          self.reviewObj.rating_shgz !== 0 ||
          self.reviewObj.rating_mycd !== 0
        ) {
          self.submitStarBtn = false;
        }
        if (self.reviewObj.rating_sqxy !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[0].num = self.reviewObj.rating_sqxy;
          for (let i = self.reviewObj.rating_sqxy - 1; i >= 0; i--) {
            self.starList[0].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_fwtd !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[1].num = self.reviewObj.rating_fwtd;
          for (let i = self.reviewObj.rating_fwtd - 1; i >= 0; i--) {
            self.starList[1].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_fwzl !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[2].num = self.reviewObj.rating_fwzl;
          for (let i = self.reviewObj.rating_fwzl - 1; i >= 0; i--) {
            self.starList[2].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_shgz !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[3].num = self.reviewObj.rating_shgz;
          for (let i = self.reviewObj.rating_shgz - 1; i >= 0; i--) {
            self.starList[3].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_mycd !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[4].num = self.reviewObj.rating_mycd;
          for (let i = self.reviewObj.rating_mycd - 1; i >= 0; i--) {
            self.starList[4].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if ("cart_confirm" in self.reviewObj) {
          self.findGoods = self.reviewObj.cart_confirm === 0 ? false : true;
          self.showFindGoodsBtn = false;
        }
        if (self.reviewObj.goal && self.reviewObj.goal !== "") {
          const existGoals = self.reviewObj.goal.split(",");
          this.goalBtnShow = true;
          for (let i = 0; i < existGoals.length; i++) {
            const idx = this.goalsGroup.findIndex(
              itm => itm.name === existGoals[i]
            );
            if (idx >= 0) {
              this.goalsGroup[i].choosed = true;
              this.goalBtnShow = false;
            }
          }
        }
        if (self.reviewObj.allWeight > 0) {
          setTimeout(function() {
            self.setChart();
          }, 300);
        }
      }
    } else {
      self.$alert.show({
        msg: "加载失败，请重试！",
        cb() {
          window.location.replace(self.visitUrl);
          self.showPage = false;
        }
      });
    }
  }
  async submintInfor() {
    console.log(this.picked);
    const compName = self.$refs.compName.value;
    const phoneNum = self.$refs.phoneNum.value;
    if (compName.trim().length === 0) {
      self.$alert.show({ msg: "公司名称不能为空" });
    } else if (phoneNum.trim().length === 0) {
      self.$alert.show({ msg: "联系电话不能为空" });
    } else if (this.picked == "") {
      self.$alert.show({ msg: "请选择经营性质" });
    } else if (!self.phoneReg.test(phoneNum)) {
      self.$alert.show({ msg: "请输入正确手机号" });
    } else {
      if (this.btnClick) {
        this.btnClick = false;
        try {
          const param = {
            custNo: "",
            custName: compName,
            phone: phoneNum,
            type: this.picked
          };
          if (this.custNo !== "-1") {
            param["custNo"] = this.custNo;
          }
          const data = await self.ironRequest(
            "promote/feedback.shtml?",
            param,
            "post"
          );
          if (data.returncode == 0) {
            this.btnClick = true;
            self.$alert.show({
              msg: "加盟成功！",
              cb() {
                window.location.replace(self.visitUrl);
              }
            });
            // 地址
            // this.$router.push({ path: "/loginThird" });
            // window.location.href =
            //   "http://wechat.xingyun361.com/xyreviewdev/home.html";
          }
        } catch (e) {
          this.btnClick = true;
          self.$alert.show({ msg: "网络异常" });
        }
      }
    }
  }
  autoScroll() {
    console.log("auto scroll");
    window.scroll(0, 0);
  }
  //钢圈关键词背景图片
  keyBkg(type: number): string {
    switch (type) {
      case 1:
        return "fu";
      case 2:
        return "wen";
      case 3:
        return "shuang";
      default:
        return "lang";
    }
  }
  keyWord(type: number): string {
    switch (type) {
      case 1:
        return "”财富牛“";
      case 2:
        return "”周转牛“";
      case 3:
        return "”实力牛“";
      default:
        return "“潜力牛”";
    }
  }
  keyDescription(type: number): string {
    switch (type) {
      case 1:
        return `[采购量前20%]`;
      case 2:
        return "[平均购买周期前20%]";
      case 3:
        return "[平均付款时间前20%]";
      default:
        return "[其他用户]";
    }
  }
  // 根据条件显示称号
  titleInfo(num: number): string {
    if (num >= 200) {
      self.titleBkg = "first";
      return "华东钢皇";
    } else if (num >= 100) {
      self.titleBkg = "second";
      return "钢铁巨佬";
    } else if (num >= 50) {
      self.titleBkg = "third";
      return "购钢大牛";
    } else {
      self.titleBkg = "forth";
      return "采钢圣手";
    }
  }
  // 根据page_backgroup显示习惯下单时间
  getBgTime(num: number): string {
    switch (num) {
      case 1:
        return "旭日东升";
      case 2:
        return "当午日明";
      default:
        return "晚霞万道";
    }
  }
  //根据节约时间显示看电影/听音乐
  getRelase(time: number): string {
    if (time >= 90) {
      this.relaseNum = Math.round(time / 90);
      return "movie";
    } else {
      this.relaseNum = Math.round(time / 5);
      return "music";
    }
  }
  selectFindGoods() {
    if (this.showFindGoodsBtn) {
      this.findGoods = !this.findGoods;
    } else {
      return;
    }
  }
  async submitFindGoodsSelect() {
    const paramsObj = {
      custNo: this.custNo,
      recordTime: "2021Q1",
      key: "cart_confirm",
      value: this.findGoods === true ? 1 : 0
    };
    const data = await self.ironRequest(
      "promote/choose.shtml",
      paramsObj,
      "post"
    );
    if (data.returncode == "0") {
      self.$alert.show({ msg: data.errormsg });
      // eslint-disable-next-line @typescript-eslint/camelcase
      self.showFindGoodsBtn = false;
    }
  }
  // 型云小目标提交
  async goalSubmit() {
    try {
      const valueStr = this.goalsGroup
        .filter(item => item.choosed == true)
        .map(item => item.name)
        .join(",");
      if (valueStr === "") {
        self.$alert.show({ msg: "请您选择小目标" });
      } else {
        const paramsObj = {
          custNo: this.custNo,
          recordTime: "2021Q1",
          key: "goal",
          value: valueStr
        };
        const data = await self.ironRequest(
          "promote/choose.shtml",
          paramsObj,
          "post"
        );
        if (data.returncode == "0") {
          self.$alert.show({ msg: data.errormsg });
          self.goalBtnShow = false;
        }
      }
    } catch (e) {
      self.$alert.show({ msg: e.message || "网络异常" });
      console.error(e);
    }
  }
  getStar(name: string, index: number) {
    if (this.showSubmitStarBtn) {
      console.log(name + "+" + index);
      this.starList.map(item => {
        if (item.name === name) {
          item.num = index + 1;
          item.star = [
            "http://xymobile.xingyun361.com/annual_unselect_star.png",
            "http://xymobile.xingyun361.com/annual_unselect_star.png",
            "http://xymobile.xingyun361.com/annual_unselect_star.png",
            "http://xymobile.xingyun361.com/annual_unselect_star.png",
            "http://xymobile.xingyun361.com/annual_unselect_star.png"
          ];
          for (let i = index; i >= 0; i--) {
            item.star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
      });
      this.$forceUpdate();
    } else {
      return;
    }
  }
  async submitStar() {
    if (
      this.starList[0].num === 0 ||
      this.starList[1].num === 0 ||
      this.starList[2].num === 0 ||
      this.starList[3].num === 0 ||
      this.starList[4].num === 0
    ) {
      self.$alert.show({ msg: "请点亮评星，最低选择一颗星" });
      return false;
    }
    const paramsObj = {
      custNo: this.custNo,
      recordTime: "2021Q1",
      key: "rating_sqxy,rating_fwtd,rating_fwzl,rating_shgz,rating_mycd",
      value:
        this.starList[0].num +
        "," +
        this.starList[1].num +
        "," +
        this.starList[2].num +
        "," +
        this.starList[3].num +
        "," +
        this.starList[4].num
    };
    const data = await self.ironRequest(
      "promote/choose.shtml",
      paramsObj,
      "post"
    );
    if (data.returncode == "0") {
      self.$alert.show({ msg: data.errormsg });
      self.showSubmitStarBtn = false;
    }
  }
  // 画饼图
  setChart() {
    console.log("初始化图标");
    const seriesName = [];
    this.chartData.map(item => {
      seriesName.push(item.name);
    });
    console.log("chartData:>>", this.chartData);
    self = this;
    const chart = this.echarts.init(this.$refs.chartPie);
    chart.setOption({
      aria: {
        show: true
      },
      series: [
        {
          // name: "111",
          top: 10,
          type: "pie",
          radius: ["30%", "58%"],
          minAngle: 10,
          // avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            formatter: "{a|{b}}\n{hr|}\n  {per|{d}%}  ",
            rich: {
              a: {
                color: "#8B7B8B",
                lineHeight: 10,
                fontSize: 10,
                align: "center"
              },
              hr: {
                borderColor: "#8B7B8B",
                width: "100%",
                borderWidth: 0.5,
                height: 0.2
              },
              per: {
                color: "#8B7B8B",
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
          color: [
            "#3594FD",
            "#92D1FF",
            "#B49472",
            "#F0A24F",
            "#EC64A7",
            "#614DA7"
          ],
          data: this.chartData
        }
      ]
    });
  }
}
export default AnnualReview;
</script>
<style lang="stylus" scoped>
@font-face
  font-family cute
  font-style normal
  src url('../assets/font/cute.TTF')
@font-face
  font-family zwj
  font-style normal
  src url('../assets/font/zhangweijing.ttf')
.ff-cute
  font-family cute
.ff-zwj
  font-family zwj
vm(val)
  return (val / 375) * 100vw
vh(val)
  return (val / 667) * 100vh
.flex-column
  display flex
  flex-direction column
.content-center
  justify-content center
.content-between
  justify-content space-between
.content-around
  justify-content space-around
.align-center
  align-items center
.align-end
  align-items flex-end
.align-baseline
  align-items baseline
.flex-row
  display flex
  flex-direction row
.font-12
  font-size vm(12)
.font-14
  font-size vm(14)
.font-15
  font-size vm(15)
.font-16
  font-size vm(16)
.font-17
  font-size vm(17)
.font-19
  font-size vm(19)
.font-23
  font-size vm(23)
.font-25
  font-size vm(25)
.font-35
  font-size vm(35)
.lh-26
  line-height vh(26)
.lh-28
  line-height vh(28)
.lh-30
  line-height vh(30)
.lh-34
  line-height vh(34)
.lh-40
  line-height vh(40)
.lh-47
  line-height vh(47)
.lh-51
  line-height vh(51)
.mt-10
  margin-top vh(10)
.mt-15
  margin-top vh(15)
.mt-23
  margin-top vh(23)
.mt-310
  margin-top vh(310)
.ml-3
  margin-left vm(3)
.ml-10
  margin-left vm(10)
.ml-15
  margin-left vm(15)
.ml-50
  margin-left vm(50)
.mr-3
  margin-right vm(3)
.mb-12
  margin-bottom vh(12)
.padding-10
  padding 10px
.width-30
  width 30%
.width-70
  width 70%
.text-white
  color white
.text-blue
  color #3594FD
.text-black
  color #000000
.text-grey
  color #8A8A8F
.text-brown
  color #48362A
.text-bold
  font-weight bold
.content-bg
  width vm(319)
  height auto
  background-color #01101A
  border 2px solid rgba(238, 249, 255, 0.39)
  opacity 0.6
  border-radius 25px
  margin vh(50) auto 0
  color #FFFFFF
  font-size vm(15)
  padding vh(15) 0
.page1-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_1.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_1%402x.png') 2x
  )
  padding-top vm(74.5)
  padding-left vm(37.5)
  .box
    background-image url('../assets/imgs/niu_box.png')
    width vm(300.5)
    height vh(518.5)
    position relative
    box-sizing border-box
    padding-top vh(49.5)
    .title
      background-image url('../assets/imgs/niu_bg_title.png')
      background-size 100% 100%
      text-align right
      font-size vm(15)
      width vm(242)
      height vh(54)
      margin-left vm(37.5)
      box-sizing border-box
      color #3DA7FF
      padding-top vh(5.5)
    .fu
      background-image url('../assets/imgs/niu_fu.png')
      background-size 100% 100%
      width vm(115)
      height vh(209.5)
      margin-left vm(100)
      margin-top vh(29)
      margin-bottom vh(25.5)
    .wen
      background-image url('../assets/imgs/niu_wen.png')
      background-size 100% 100%
      width vm(179.5)
      height vh(223)
      margin-left vm(68)
      margin-top vh(25)
      margin-bottom vh(16)
    .shuang
      background-image url('../assets/imgs/niu_shuang.png')
      background-size 100% 100%
      width vm(165)
      height vh(225.5)
      margin-left vm(75)
      margin-top vh(17.5)
      margin-bottom vh(21)
    .lang
      background-image url('../assets/imgs/niu_lang.png')
      background-size 100% 100%
      width vm(198.5)
      height vh(190)
      margin-left vm(51)
      margin-top vh(34.5)
      margin-bottom vh(39.5)
    .bottom-mark
      position absolute
      left vm(23)
      bottom vm(42)
      color #fff
      background #3DA7FF
      height vh(29)
      width vm(194)
      font-size vm(15)
      display flex
      align-items center
      justify-content center
.page2-bkg
  // padding-top 10%
  &.fu
    background -webkit-image-set(
      url('http://xymobile.xingyun361.com/annual_bg_2_fu_1x.png') 1x,
      url('http://xymobile.xingyun361.com/annual_bg_2_fu.png') 2x
    )
  &.lang
    background -webkit-image-set(
      url('http://xymobile.xingyun361.com/annual_bg_2_lang_1x.png') 1x,
      url('http://xymobile.xingyun361.com/annual_bg_2_lang.png') 2x
    )
  &.shuang
    background -webkit-image-set(
      url('http://xymobile.xingyun361.com/annual_bg_2_shuang_1x.png') 1x,
      url('http://xymobile.xingyun361.com/annual_bg_2_shuang.png') 2x
    )
  &.wen
    background -webkit-image-set(
      url('http://xymobile.xingyun361.com/annual_bg_2_wen_1x.png') 1x,
      url('http://xymobile.xingyun361.com/annual_bg_2_wen.png') 2x
    )
.page3-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_2.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_2%402x.png') 2x
  )
  padding-top vh(6)
  padding-left vm(12)
  box-sizing border-box
  font-size vm(14)
  line-height vh(26)
  .box-sec
    display flex
    flex-direction column
    padding-left vm(30)
    padding-top vh(12)
    width vm(288.5)
    height vh(503.5)
    box-sizing border-box
    background-image url('../assets/imgs/niu_bg2.png')
    background-size 100% 100%
  .charts-style
    width vm(238)
    height vh(126)
    // margin-left vm(-20)
  .submit-btn
    width vm(86.5)
    height vh(30)
    line-height vh(30)
    text-align center
    color #ffffff
    font-weight bold
    background #3594FD
    border-radius 15px
    margin vh(5) auto
.page4-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual2101_bg_3.png') 1x,
    url('http://xymobile.xingyun361.com/annual2101_bg_3%402x.png') 2x
  )
  box-sizing border-box
  padding-left vm(14)
  padding-top vh(32)
  .box-third
    background-image url('../assets/imgs/niu_bg3_box.png')
    background-size 100% 100%
    width vm(330.5)
    height vm(330.5)
    box-sizing border-box
    padding-top vh(26.5)
    padding-left vm(33)
  .rotate-content
    transform rotate(10deg)
    margin vh(110) 0 0 vm(29)
.page5-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual2101_bg_4.png') 1x,
    url('http://xymobile.xingyun361.com/annual2101_bg_4%402x.png') 2x
  )
  box-sizing border-box
  padding-left vm(36.5)
  padding-top vh(14)
  .box-fourth
    background-image url('../assets/imgs/niu_box.png')
    background-size 100% 100%
    width vm(300.5)
    height vh(518.5)
    box-sizing border-box
    padding-left vm(14.5)
    padding-top vh(39)
    position relative
    .title-fourth
      background-image url('../assets/imgs/niu_bg_4_title.png')
      background-size 100% 100%
      width vm(247.5)
      height vh(19)
      margin-left vm(19)
      margin-bottom vh(10.5)
    .lbl
      background-image url('../assets/imgs/niu_bg_4_lbl.png')
      background-size 100% 100%
      width vm(83.5)
      height vh(25)
      line-height vh(25)
      text-align center
    .choose-area
      margin-left vm(20)
      margin-top vh(24)
      .row
        height vh(22)
        margin-bottom vh(15)
        .icon-col
          flex 0 0 vm(25)
          display flex
          height 100%
          align-items center
          justify-content center
          .choose-icon
            background-image url('../assets/imgs/goal_cbx.png')
            background-size 100% 100%
            position relative
            width vm(11)
            height vh(11)
            .checked
              background-size 100% 100%
              background-image url('../assets/imgs/goal_cbx_check.png')
              top 0
              left 0
              position absolute
              z-index 10
              width vm(13.5)
              height vh(10)
    .choose-btn
      width vm(105.5)
      height vh(36.5)
      background #3DA7FF
      color white
      font-size 18px
      display flex
      align-items center
      justify-content center
      border-radius 20px
      margin 0 auto
      margin-top vh(30)
    .bottom-lbl
      background #3DA7FF
      height vh(22.5)
      line-height vh(22.5)
      padding 0px vm(6)
      font-size 12px
      color white
      position absolute
      right 0
      bottom vh(44)
      box-sizing border-box
      &.sec
        bottom vh(74)
.page6-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual2101_bg_5.png') 1x,
    url('http://xymobile.xingyun361.com/annual2101_bg_5%402x.png') 2x
  )
  box-sizing border-box
  padding-top vh(29)
  .content-area
    background-image url('../assets/imgs/niu_box.png')
    background-size 100% 100%
    width vm(300.5)
    height vh(518.5)
    margin 0 auto
    box-sizing border-box
    padding-left vm(15)
    padding-top vh(17)
    .score-lbl
      background-image url('../assets/imgs/niu_bg_5_score.png')
      background-size 100% 100%
      width vm(94)
      height vh(23.5)
      line-height vh(23.5)
      text-align center
      color white
      font-size 16px
    .head-pic
      width vm(66)
      height vm(66)
      border-radius 50%
      margin 0 auto
      margin-bottom vh(11)
      display block
    .score-area
      width vm(210)
      margin-left vm(30)
      margin-bottom vh(6)
      box-sizing border-box
      .sub-title
        font-size 11px
        width 50px
        color #888
        border 1px solid #ddd
    .star-pic
      width vm(18)
      height vm(18)
    .submit-btn
      width vm(183)
      height vh(42)
      background #3DA7FF
      border-radius 25px
      line-height vh(42)
      text-align center
      color #ffffff
      font-size vm(18)
      margin 0 auto
  .bottom-text
    width vm(315)
    margin 0 auto
    line-height vh(22)
    margin-top vh(28)
    text-align center
    font-size 11px
    color #fff
.page-get-info
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual2101_bg_5.png') 1x,
    url('http://xymobile.xingyun361.com/annual2101_bg_5%402x.png') 2x
  )
  box-sizing border-box
  padding-top vh(10)
  .title-pic
    background-image url('../assets/imgs/page_info_title.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(295.2)
    height vh(59.4)
    margin 0 auto
  .part-bkg
    background-image url('../assets/imgs/page_info_box.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(300.5)
    height vh(253)
    margin vh(10) auto 0
    box-sizing border-box
    padding-left vm(28)
    padding-top vh(21.5)
    &.sec
      background-image url('../assets/imgs/page_info_box_sec.png')
      height vh(328)
      margin-top vh(8)
    .part-title, .part-title-sec
      background-size 100% 100%
      width vm(129)
      height vh(14.5)
      margin-left vm(65)
      margin-bottom vh(16)
    .part-title
      background-image url('../assets/imgs/page_info_part_title.png')
    .part-title-sec
      background-image url('../assets/imgs/page_info_part_title_sec.png')
    .part-absolute
      margin-bottom vh(15)
      .one
        display flex
        .first
          flex 0 0 vm(60)
          font-size vm(13)
          font-weight bold
        .sec
          display flex
          flex-direction column
          justify-content flex-end
          font-size 10px
      .two
        background-image url('../assets/imgs/page_info_line.png')
        background-size 100% 100%
        height vh(3)
        &.c0, &.c1
          width vm(220)
        &.c2, &.c3, &.c4
          width vm(240)
    .form-bg
      .formword-style
        font-size vm(12)
        font-weight bold
      input
        width vm(248)
        height vh(35)
        background rgba(255, 255, 255, 1)
        font-size vm(12)
        border 1px solid rgba(220, 220, 220, 1)
        margin vh(5) auto vh(7)
      span
        font-size vm(12)
        margin-left vm(4)
        margin-top vh(2)
        display inline-block
      input[type=radio]
        // opeacity 0
        -webkit-appearance none
        appearance none
        outline none
        width vm(12)
        height vh(12)
        border 1px solid rgba(191, 191, 191, 1)
        position relative
      input[type='radio']:checked
        +span
          &::before
            display none
      input[type='radio']:checked
        +span
          &::after
            content ''
            width vm(8)
            height vh(8)
            background #2485FF
            position absolute
            top vh(7)
            right vm(30)
      .comfirm-btn
        width vm(142)
        height vh(32)
        margin vh(10) 0 0 vm(60)
        background #3DA7FF
        border 0
        border-radius 2px
        font-size vm(16)
        font-weight bold
        letter-spacing vm(4)
        color #fff
.page7-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual2101_bg_5.png') 1x,
    url('http://xymobile.xingyun361.com/annual2101_bg_5%402x.png') 2x
  )
  box-sizing border-box
  padding-top vh(74.5)
  .content7-bg
    background-image url('../assets/imgs/niu_box.png')
    background-size 100% 100%
    width vm(300.5)
    height vh(518.5)
    margin 0 auto
    box-sizing border-box
    padding-left vm(40)
    padding-top vh(22)
    .title7
      background-image url('../assets/imgs/bg_7_title.png')
      background-size 100% 100%
      width vm(218)
      height vh(26)
      margin-left vm(8.5)
    .fu, .wen, .shuang, .lang
      background-size 100% 100%
      margin 0 auto
      margin-bottom vh(25)
      margin-top vh(26)
    .fu
      background-image url('../assets/imgs/niu_fu.png')
      width vm(115)
      height vh(209.5)
    .wen
      background-image url('../assets/imgs/niu_wen.png')
      width vm(179.5)
      height vh(223)
    .shuang
      background-image url('../assets/imgs/niu_shuang.png')
      width vm(165)
      height vh(225.5)
    .lang
      background-image url('../assets/imgs/niu_lang.png')
      width vm(198.5)
      height vh(190)
.page8-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/bg_8_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_8.png') 2x
  )
  .page8-content-bg
    background-image url('http://xymobile.xingyun361.com/pic_6.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(291)
    height vh(310)
    margin vh(60) auto 0
    padding-top vh(85)
    line-height vh(30)
    .page8-title
      font-size vm(33)
      line-height vh(60)
    .dotted
      width 80%
      height 1px
      border-top vh(2) dashed #48362A
      overflow hidden
      margin vh(25) auto 0
    .check-btn
      background-image url('http://xymobile.xingyun361.com/btn_1.png')
      background-size 100% 100%
      background-repeat no-repeat
      width vm(176)
      height vh(52)
      margin vh(34) auto 0
  .qrcode
    display block
    width vm(90)
    height vm(90)
    margin vh(57) auto 0
.empty-bg
  background -webkit-image-set(url('../assets/imgs/empty_bg.png') 1x)
  .empty-box
    padding-top vh(20)
    .title-bar
      text-align center
      img
        width vm(336)
        height vh(151)
    .animal-bar
      width vm(336)
      position relative
      padding 0 vm(20) 0 vm(9)
      margin 0 auto
      box-sizing border-box
      top vh(-35)
      display flex
      flex-direction row
      justify-content space-between
      z-index 99
      .empty-monkey-left
        width vm(76)
        height vh(76)
      .empty-arrow
        width vm(114.5)
        height vh(47)
        margin-bottom vh(20)
      .empty-monkey-right
        width vm(70)
        height vh(72)
    .content-box
      background-image url('../assets/imgs/empty_box.png')
      width vm(290)
      height vh(450)
      background-size 100% 100%
      background-repeat no-repeat
      margin 0 auto
      position relative
      top vh(-42)
      .top-bar
        height vh(38)
        margin-bottom vh(12)
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
          padding vh(5) vm(10)
          background #EDF4FF
          border-radius vm(5)
          margin-bottom vh(3)
          font-weight bold
      .empty-list
        padding-top vh(20)
        text-align center
        .title
          width vm(198.5)
          height vh(31)
        .line
          width vm(197)
          height vh(10)
        .clickopenmall-style
          width vm(239)
          height vh(64)
          position relative
          margin vh(10) 0 0
      .bottom
        box-sizing border-box
        padding-top vh(10)
        .title
          letter-spacing vm(1)
          text-align center
          color #42403C
          font-weight bold
          font-size vm(15)
        .qrcode
          margin-top vh(20)
          width vh(100)
          height vh(100)
</style>
