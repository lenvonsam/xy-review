<template lang="pug">
.container(v-if="showPage")
  span(
    style="position: absolute; top: 10px; left: 15px; z-index: 20",
    @click="clearData"
  ) 退出
  music
  share-modal(v-model="modalShow")
  .banner-bg.border-box.full-width.relative.pageGetInfo(
    v-if="custNo == -1",
    :style="{ height: screenHeight + 'px' }"
  )
    .title-pic
    .part-bkg.relative
      .part-title.text-center 我们诚邀
      .part-absolute.first
        .part-title 金融服务
        .part-content 服务中小微 成就大未来
      .part-absolute.second
        .part-title 物流服务
        .part-content 整车拼车顺风车 车车都满
      .part-absolute.third
        .part-title 钢铁供应
        .part-content 人无我有 人有我优 人优我特 人特我精
      .part-absolute.forth
        .part-title 加工服务
        .part-content 展现一场钢铁加工的艺术之旅
      .part-absolute.fifth
        .part-title 物资采购
        .part-content 我们的服务只为您每一次
        .part-content 采购的满意与放心
    .part-bkg
      .part-title.text-center 信息采集
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
        .formword-style.text-bold 经营性质
        div(
          style="display: flex; flex-direction: row; justify-content: space-between"
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
          img(src="../assets/imgs/empty_title_bar.png")
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
        .banner-bg.border-box.full-width.padding-xl.pt-30.relative.page1-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .flex-column.lh-26.font-14(style="color: #414866")
            span 再见，2020，
            span 这是特别的一年，
            span 我们克服一切，勇往直前。
            span 你好，2021，
            span 这是希望的一年，
            span 我们不断改变，化茧成蝶。
            span 不念过往，
            span 不惧将来！
            span 汇智成型，聚气为云。
            span 只因“钢”好有您。
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page2-bkg(
          :style="{ height: screenHeight + 'px' }",
          :class="[keyBkg(reviewObj.key_flag)]"
        )
          .flex-column.content-center.text-center.lh-30.font-16.ff-cute.text-white.mt-310
            span 买钢不只有钢市的波澜与壮阔
            span 还有使用型云的便捷与放心!
            span 您的2020年度钢圈关键词为：
            .title-pic(:class="[keyBkg(reviewObj.key_flag)]")
            .flex-column(v-if="reviewObj.key_flag == 1")
              .text-white.animated.bounceInRight 采钢万钧
              .text-white.animated.bounceInRight 富可敌国
            .flex-column(v-else-if="reviewObj.key_flag == 2")
              .text-white.animated.bounceInRight 你来我往
              .text-white.animated.bounceInRight 有条不紊
            .flex-column(v-else-if="reviewObj.key_flag == 3")
              .text-white.animated.bounceInRight 驷马难追
              .text-white.animated.bounceInRight 唯快不破
            .flex-column(v-else) 
              span.animated.bounceInRight 高瞻远瞩
              span.animated.bounceInRight 卓尔不群
            .flex-row.content-center
              span 购钢总量超过
              span {{ parseInt(reviewObj.all_weight_percent) }}%
              span 的客户
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page3-bkg.flex-column.font-13(
          :style="{ height: screenHeight + 'px' }"
        )
          span 在过去的2020年中
          .row
            span 您在型云一共采购了
            .text-black.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.all_weight.toFixed(2) }}
            .col 吨钢材
          span 不忘采购的初心
          span 更不负挣钱的韶华
          .row
            span 相较于2019提升
            .text-black.text-bold {{ reviewObj.allWeightDiff }}
            span %
          .row
            span 其中
            .text-black.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.goods_name_one }}
            .col 为您主要的采购品种
          .row
            span 您在型云一共搜索了
            .text-black.text-bold.text-animate.animated.bounceInLeft {{ reviewObj.xy_search }}
            .col 次物资
          .row
            span 有
            .text-black.text-bold.text-animate.animated.bounceInLeft {{ cartPercent }}
            .col %成功进入到了您的购物车中
          span 众里寻他千百度
          span 型云帮您找到理想中的物资了吗？
          .flex-row.align-center.mt-10.ml-50
            img(
              v-if="findGoods",
              src="http://xymobile.xingyun361.com/annual_selected.png"
            )
            img(
              v-else,
              src="http://xymobile.xingyun361.com/annual_unselected.png",
              @click="findGoods = !findGoods"
            )
            .text-black.font-15.ml-3 是
            img.ml-10(
              v-if="!findGoods",
              src="http://xymobile.xingyun361.com/annual_selected.png"
            )
            img.ml-10(
              v-else,
              src="http://xymobile.xingyun361.com/annual_unselected.png",
              @click="findGoods = !findGoods"
            )
            .text-black.font-15.ml-3 否
          .submit-btn.font-15(v-if="showFindGoodsBtn", @click="submitFindGoodsSelect") 提交
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page4-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .flex-column.lh-47.font-14.ff-zwj.rotate-content
            .flex-row.align-baseline
              span 2020年您一共成交了
              .font-23.ml-3.mr-3.text-bold {{ reviewObj.dx_num + reviewObj.zz_num }}
              span 笔合同
            .flex-row.align-baseline
              span 我们的业务员为您提供了
              .font-23.text-bold {{ reviewObj.dx_num }}
              span 笔定向开单服务
            .flex-row.align-baseline
              span 您总是习惯在
              .font-23.ml-3.mr-3.text-bold {{ getBgTime(reviewObj.page_backgroup) }}
              span 的时候采购
            .flex-row.align-baseline
              span 型云一共为您节约了
              .font-23.text-bold {{ (reviewObj.xy_contract * 3).toFixed(0) }}
              span 分钟的交易时间
            span 您可以利用这些时间
            .flex-row.align-baseline(
              v-if="[getRelase(reviewObj.xy_contract * 3)] == 'movie'"
            )
              span 多看
              .font-23.ml-3.text-bold {{ relaseNum }}
              span 场精彩的电影，
              span 更多的陪伴家人
            .flex-row.align-baseline(v-else)
              span 多听
              .font-23.ml-3.text-bold {{ relaseNum }}
              span 首美妙的歌曲，
              span 更多的陪伴家人
            span 与朋友分享自己的快乐
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.pt-30.relative.page5-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .flex-column.lh-34.font-14(style="color: #414866")
            .flex-row.align-baseline
              span 2020年型云成交额超
              .font-23.ml-3 {{ turnover }}
            .flex-row.align-baseline(v-if="reviewObj.xy_sale_length")
              span 交易物资总长度超
              .font-23.ml-3 {{ reviewObj.xy_sale_length }}
              span 米
            .flex-row.align-baseline(v-if="reviewObj.xy_sale_length")
              span 约等于
              .font-23.ml-3 {{ (reviewObj.xy_sale_length / 8844).toFixed(0) }}
              span 座珠穆朗玛峰的高度
            .flex-row.align-baseline
              span 为
              .font-23.ml-3 {{ reviewObj.xy_customer }}
              span 位客户完成了
              .font-23.ml-3 {{ reviewObj.xy_contract }}
              span 笔合同
            .flex-row.align-baseline
              span 节约了
              .font-23.ml-3 {{ (reviewObj.xy_contract / 20).toFixed(0) }}
              span 小时的交易时间
            .flex-row.align-baseline
              span 提供了
              .font-23.ml-3 {{ reviewObj.xy_search }}
              span 次物资的搜索与比价
            .flex-row.align-baseline
              span 节约了
              .font-23.ml-3 {{ (reviewObj.xy_search / 20).toFixed(0) }}
              span 小时
            span 不忘初心 立志于为客户带来
            span 更全面、更高效、
            span 更便捷、成本更低的服务
      swiper-slide
        .banner-bg.border-box.full-width.page6-bkg.absolute(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-area.relative.flex-column
            img.head-pic(:src="reviewObj.employeePic")
            .flex-row.font-17.content-center
              span 服务经理：
              span {{ reviewObj.employee_name }}
            .flex-row.text-grey.font-15.content-center
              span 联系电话：
              span {{ reviewObj.employee_phone }}
            .mt-10.text-red.text-center 又到了年度星级星级经理评选的时间
            .text-red.text-center 请您为自己的服务经理点亮服务星级
            .mt-23.flex-row.content-between.font-14(style="color: #414866")
              .width-30 售前响应
              .width-70.flex-row.content-around
                img.star-pic(
                  v-for="(item, index) in starList[0].star",
                  :key="index",
                  :src="item",
                  @click="getStar(starList[0].name, index)"
                )
            .mt-23.flex-row.content-between.font-14
              .width-30 服务态度
              .width-70.flex-row.content-around
                img.star-pic(
                  v-for="(item, index) in starList[1].star",
                  :key="index",
                  :src="item",
                  @click="getStar(starList[1].name, index)"
                )
            .mt-23.flex-row.content-between.font-14
              .width-30 服务质量
              .width-70.flex-row.content-around
                img.star-pic(
                  v-for="(item, index) in starList[2].star",
                  :key="index",
                  :src="item",
                  @click="getStar(starList[2].name, index)"
                )
            .mt-23.flex-row.content-between.font-14
              .width-30 售后跟踪
              .width-70.flex-row.content-around
                img.star-pic(
                  v-for="(item, index) in starList[3].star",
                  :key="index",
                  :src="item",
                  @click="getStar(starList[3].name, index)"
                )
            .mt-23.flex-row.content-between.font-14
              .width-30 满意程度
              .width-70.flex-row.content-around
                img.star-pic(
                  v-for="(item, index) in starList[4].star",
                  :key="index",
                  :src="item",
                  @click="getStar(starList[4].name, index)"
                )
            .mt-23.font-14(style="color: #414866") 感谢您一直以来的认可和支持，欢迎多提宝贵的意见和建议型云的诗和远方，就是为您创造更好的购钢体验！
            .submit-btn(v-if="showSubmitStarBtn", @click="submitStar") 提交评价
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page7-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-bg.flex-column.text-center.lh-40.font-15
            span 2020属您最“关键字”！
            .font-35.lh-47(v-if="reviewObj.key_flag == 1") 富
            .font-35.lh-47(v-else-if="reviewObj.key_flag == 2") 浪
            .font-35.lh-47(v-else-if="reviewObj.key_flag == 3") 爽
            .font-35.lh-47(v-else) 稳
            .flex-row.content-center.align-baseline
              span 购钢总量超过
              .font-25.ml-3.mr-3 {{ parseInt(reviewObj.all_weight_percent) }}
              span %的客户
            .flex-row.content-center
              .font-25.mr-3 {{ reviewObj.days }}
              span 个日日夜夜
            .flex-row.content-center
              .font-25.mr-3 {{ (reviewObj.xy_contract / 6).toFixed(0) }}
              span 个小时的采钢服务
            span 这就是最长情的陪伴
          .page7-pic(:class="titleBkg")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import music from "@/components/Music.vue";
import shareModal from "@/components/ShareModal.vue";
// eslint-disable-next-line
let self: any;
@Component({
  components: {
    music,
    shareModal
  }
})
class AnnualReview extends Vue {
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
  btnClick = true;
  modalShow = false;
  modalShowNever = true;
  turnover = 10;
  picSpaceHeight = 560;
  wordsBgHeight = 21;
  textareaBgHeight = 90;
  confirmBtnHeight = 27;
  cartPercent = "";
  findGoods = true;
  showFindGoodsBtn = true;
  saveHours = "";
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
    self.picSpaceHeight = (560 / 667) * window.innerHeight;
    self.wordsBgHeight = (21 / 667) * window.innerHeight;
    self.textareaBgHeight = (90 / 667) * window.innerHeight;
    self.confirmBtnHeight = (27 / 667) * window.innerHeight;
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
            imgUrl: "http://xymobile.xingyun361.com/share_review_icon.jpg",
            success() {
              console.log("wx share success");
            },
            error() {
              console.log("wx share fail");
            }
          });
          if (self.custNo != "-1") {
            self.wxShareDesc =
              "2020第三季度我在型云的采钢关键字是" +
              self.titleInfo(self.reviewObj.all_weight) +
              "，点击查看属于自己的关键字吧！";
            wx.onMenuShareAppMessage({
              title: self.wxShareTitle,
              desc: self.wxShareDesc,
              link: self.visitUrl + "?source=3",
              imgUrl: "http://xymobile.xingyun361.com/share_review_icon.jpg",
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
      if (this.swiperSildeIndex == 6) {
        this.modalShow = true && this.modalShowNever;
        console.log("末页遮罩层" + this.modalShow);
        this.modalShowNever = false;
      }
    }
  }
  async loadData() {
    self = this;
    console.log("loadData");
    const data = await self.ironRequest(
      "promote/customerOrderInfo.shtml?custNo=" +
        self.custNo +
        "&recordTime=2020Q4",
      {},
      "get"
    );
    if (data.returncode == "0") {
      console.log(data);
      self.reviewObj = data;
      self.showPage = true;
      if (self.custNo != -1) {
        self.reviewObj.allWeight = self.reviewObj.all_weight.toFixed(2);
        // eslint-disable-next-line prettier/prettier
        self.reviewObj.allWeightPercent = self.reviewObj.all_weight_percent.toFixed(
          0
        );
        self.reviewObj.allWeightDiff = (
          self.reviewObj.all_weight_diff * 100
        ).toFixed(2);
        self.turnover = self.unitConvert(self.reviewObj.xy_turnover);
        console.log(self.turnover);

        let leftWeight = 0;
        if (self.reviewObj.weight_one) {
          leftWeight = self.reviewObj.all_weight - self.reviewObj.weight_one;
          self.chartData.push({
            value: self.reviewObj.weight_one,
            name: self.reviewObj.goods_name_one
          });
          if (leftWeight > 0) {
            self.chartData.push({
              value: leftWeight,
              name: "其他"
            });
          }
          if (self.reviewObj.weight_two) {
            leftWeight =
              self.reviewObj.all_weight -
              self.reviewObj.weight_one -
              self.reviewObj.weight_two;
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
            } else {
              self.chartData = self.chartData.filter(
                item => item.name !== "其他"
              );
            }
            if (self.reviewObj.weight_three) {
              leftWeight =
                self.reviewObj.all_weight -
                self.reviewObj.weight_one -
                self.reviewObj.weight_two -
                self.reviewObj.weight_three;
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
              } else {
                self.chartData = self.chartData.filter(
                  item => item.name !== "其他"
                );
              }
              if (self.reviewObj.weight_four) {
                leftWeight =
                  self.reviewObj.all_weight -
                  self.reviewObj.weight_one -
                  self.reviewObj.weight_two -
                  self.reviewObj.weight_three -
                  self.reviewObj.weight_four;
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
                } else {
                  self.chartData = self.chartData.filter(
                    item => item.name !== "其他"
                  );
                }
                if (self.reviewObj.weight_five) {
                  leftWeight =
                    self.reviewObj.all_weight -
                    self.reviewObj.weight_one -
                    self.reviewObj.weight_two -
                    self.reviewObj.weight_three -
                    self.reviewObj.weight_four -
                    self.reviewObj.weight_five;
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
              }
            }
          }
        }
        const cartPer = Math.floor(
          self.reviewObj.cart_count / self.reviewObj.search_count
        );
        self.cartPercent = cartPer;
        // if (cartPer < 10) {
        //   self.cartPercent = "低于10%";
        // } else if (cartPer > 90) {
        //   self.cartPercent = "超过90%";
        // } else {
        //   self.cartPercent = "超过" + cartPer + "%";
        // }
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
          for (let i = self.reviewObj.rating_sqxy; i >= 0; i--) {
            self.starList[0].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_fwtd !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[1].num = self.reviewObj.rating_fwtd;
          for (let i = self.reviewObj.rating_fwtd; i >= 0; i--) {
            self.starList[1].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_fwzl !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[2].num = self.reviewObj.rating_fwzl;
          for (let i = self.reviewObj.rating_fwzl; i >= 0; i--) {
            self.starList[2].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_shgz !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[3].num = self.reviewObj.rating_shgz;
          for (let i = self.reviewObj.rating_shgz; i >= 0; i--) {
            self.starList[3].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if (self.reviewObj.rating_mycd !== 0) {
          self.showSubmitStarBtn = false;
          self.starList[4].num = self.reviewObj.rating_mycd;
          for (let i = self.reviewObj.rating_mycd; i >= 0; i--) {
            self.starList[4].star[i] =
              "http://xymobile.xingyun361.com/annual_select_star.png";
          }
        }
        if ("cart_confirm" in self.reviewObj) {
          self.findGoods = self.reviewObj.cart_confirm === 0 ? false : true;
          self.showFindGoodsBtn = false;
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
        return "lang";
      case 3:
        return "shaung";
      default:
        return "wen";
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
  async submitFindGoodsSelect() {
    const paramsObj = {
      custNo: this.custNo,
      recordTime: "2020Q4",
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
  getStar(name: string, index: number) {
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
      recordTime: "2020Q4",
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
.font-13
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
.mt-23
  margin-top vh(23)
.mt-310
  margin-top vh(310)
.ml-3
  margin-left vm(3)
.ml-10
  margin-left vm(10)
.ml-50
  margin-left vm(50)
.mr-3
  margin-right vm(3)
.width-30
  width 30%
.width-70
  width 70%
.text-white
  color white
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
    url('http://xymobile.xingyun361.com/annual_bg_1_1x.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_1.png') 2x
  )
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
  .title-pic
    width vm(60)
    height vm(60)
    margin vh(20) auto
    &.fu
      background-image url('http://xymobile.xingyun361.com/annual_fu.png')
      background-size 100% 100%
    &.lang
      background-image url('http://xymobile.xingyun361.com/annual_lang.png')
      background-size 100% 100%
    &.shuang
      background-image url('http://xymobile.xingyun361.com/annual_shuang.png')
      background-size 100% 100%
    &.wen
      background-image url('http://xymobile.xingyun361.com/annual_wen.png')
      background-size 100% 100%
.page3-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_3_1x.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_3.png') 2x
  )
  padding vh(120) 0 0 vm(85)
  font-size vm(13)
  color #888888
  line-height vh(30)
  .submit-btn
    width vm(111)
    height vh(30)
    line-height vh(30)
    text-align center
    color #ffffff
    font-weight bold
    background #B6B9C2
    border-radius 15px
    margin-top vh(5)
    margin-left vm(40)
.page4-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_4_1x.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_4.png') 2x
  )
  .rotate-content
    transform rotate(10deg)
    margin vh(110) 0 0 vm(26)
.page5-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_5_1x.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_5.png') 2x
  )
.page6-bkg
  background-color #FA7268
  .content-area
    width vm(313)
    height vh(480)
    background #FFFFFF
    box-shadow 0px -5px 20px 0px rgba(108, 3, 3, 0.3)
    border-radius 8px
    margin vh(84) auto 0
    padding vh(55) vm(17) vh(20)
    .head-pic
      width vm(90)
      height vm(90)
      position absolute
      top vm(-45)
      left vm(126)
      border-radius 50%
    .star-pic
      width vm(18)
      height vm(18)
    .submit-btn
      width 100%
      height vh(45)
      background linear-gradient(30deg, #FA7268, #FA68F1)
      border-radius 8px
      line-height vh(45)
      text-align center
      color #ffffff
      font-size vm(17)
      margin vh(30) auto 0
.pageGetInfo
  background -webkit-image-set(url('http://xymobile.xingyun361.com/bg_6.png') 1x)
  .title-pic
    background-image url('http://xymobile.xingyun361.com/page6_title.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(291)
    height vh(67)
    margin 0 auto
  .part-bkg
    background-image url('http://xymobile.xingyun361.com/pic_7.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(300)
    height vh(280)
    margin vh(10) auto 0
    .part-title
      font-size vm(15)
      font-weight 800
      color #FFD946
      line-height vh(35)
      z-index 9
      opacity 10
    .part-content
      font-size vm(9)
      font-weight 400
      color #FFFFFF
      line-height vh(14)
    .part-absolute
      width vm(190)
      height vh(59)
      padding 0 vm(13)
      background linear-gradient(90deg, rgba(4, 71, 175, 0.7), rgba(15, 31, 107, 0.1))
      position absolute
      &.first
        top vh(50)
        left 0
      &.second
        top vh(130)
        left 0
      &.third
        top vh(210)
        left 0
      &.forth
        width vm(170)
        background linear-gradient(90deg, rgba(15, 31, 107, 0.1), rgba(4, 71, 175, 0.7))
        top vh(80)
        right 0
        text-align right
      &.fifth
        width vm(170)
        height vh(70)
        background linear-gradient(90deg, rgba(15, 31, 107, 0.1), rgba(4, 71, 175, 0.7))
        top vh(160)
        right 0
        text-align right
    .form-bg
      padding vh(3) vm(15)
      .formword-style
        font-size vm(14)
        color rgba(255, 255, 255, 1)
        font-weight bold
      input
        width vm(257)
        height vh(35)
        background rgba(255, 255, 255, 1)
        border 1px solid rgba(220, 220, 220, 1)
        margin vh(5) auto vh(7)
      span
        color #FFFFFF
        font-size vm(13)
        margin-left vm(4)
        margin-top vh(1)
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
            right vm(32)
      .comfirm-btn
        width vm(142)
        height vh(32)
        margin vh(10) 0 0 vm(60)
        background rgba(255, 217, 70, 1)
        border 0
        border-radius 2px
        font-size vm(16)
        font-weight bold
        letter-spacing vm(4)
        color rgba(20, 29, 94, 1)
.page7-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/annual_bg_8_1x.png') 1x,
    url('http://xymobile.xingyun361.com/annual_bg_8.png') 2x
  )
  .content-bg
    width vm(254)
    padding vh(25) 0
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
