<template lang="pug">
.container(v-if="showPage")
  span(
    style="position: absolute; top: 15px; left: 15px; z-index: 20",
    @click="clearData"
  ) 退出
  music
  share-modal(v-model="modalShow")
  .banner-bg.border-box.full-width.relative.page6-bkg(
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
        div(style="display: flex;flex-direction: row;justify-content: space-between;")
          label(v-for="radio, index in radioGroup", :key="index", style="display: flex;flex-direction: row;position:relative;")
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
            .mt-10(style="font-size:10px; color: #504E49") 微信扫码体验型云小程序
          .bottom(
            v-else,
            style="display: flex;flex-direction: column;align-items: center;"
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
          .content-bg.flex-column.text-center.lh-34.font-15
            span 过去卖出的钢已经变成了千万基建的一部分，
            span 未来要买的钢还在型云的商城里等待被发现。
            span 提供越来越便捷省心的服务，
            span 在变革的路上从未停下脚步。
            span 经历与创造，
            span 总是需要最长情的陪伴，
            span 我们一起，
            span 见证这一季度的美好与伟大。
          .pic-1
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page2-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-bg.flex-column.text-center.lh-30.font-15
            span 在2020年第三季度中
            .flex-row
              span 您在型云一共采购了
              .font-25.ml-3 {{ reviewObj.allWeight }}
              span 吨 钢材
            .flex-row
              span 打败了
              .font-25.ml-3.mr-3 {{ reviewObj.allWeightPercent }}%
              span 的客户
            .flex-row
              span 相较于上季度提升
              .font-25.ml-3 {{ reviewObj.allWeightDiff }}%
            .flex-row
              span 其中
              .font-25.ml-3.mr-3 {{ reviewObj.goods_name_one }}
              span 为主要采购品种
            .font-35.lh-47 {{ titleInfo(reviewObj.all_weight) }}
            span 是您最合适的称号
            span 不忘采购的初心
            span 更不负挣钱的韶华
          .mt-10
            .charts-style.animated.slideInUp(ref="chartPie")
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page3-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-bg.flex-column.text-center.lh-30.font-15
            .flex-row
              span 您一共成交了
              .font-25.ml-3 {{ reviewObj.dx_num + reviewObj.zz_num }}
              span 笔 合同
            .flex-row
              span 我们的业务员为您提供了
              .font-25.ml-3 {{ reviewObj.dx_num }}
              span 笔 定向开单服务
            .flex-row
              span 您总是习惯在
              .font-25.ml-3.mr-3 {{ getBgTime(reviewObj.page_backgroup) }}
              span 的时候采购
            .flex-row
              span 型云一共为您节约了
              .font-25.ml-3 {{ reviewObj.save_time }}
              span 分钟 的交易时间
            span 您可以利用这些时间
            .flex-row(v-if="[getRelase(reviewObj.save_time)] == 'movie'")
              span 多看
              .font-25.ml-3 {{ relaseNum }}
              span 场 精彩的电影
            .flex-row(v-else)
              span 多听
              .font-25.ml-3 {{ relaseNum }}
              span 首 美妙的歌曲
            span 更多的陪伴家人
            span 与朋友分享自己的快乐
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page4-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-bg.flex-column.text-center.lh-30.font-15
            .flex-row
              .font-25.ml-3.mr-3 {{ registerYear }}
              span 年
              .font-25.ml-3.mr-3 {{ registerMonth }}
              span 月
              .font-25.ml-3.mr-3 {{ registerDay }}
              span 日
            span 您注册了型云
            .flex-row
              span 成为了型云第
              .font-25.ml-3.mr-3 {{ reviewObj.register_ranking }}
              span 位客户
            span 您的一小步，型云的一大步
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page5-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .pic-8-space(:style="{ height: picSpaceHeight + 'px' }")
            .relative.pic-8.text-center.font-13
              .words-bg(:style="{ height: wordsBgHeight + 'px' }")
                .flex-row
                  span 本季度型云成交额超
                  .text-bold {{ turnover }}
              .words-bg(:style="{ height: wordsBgHeight + 'px' }")
                .flex-row
                  span 为
                  .text-bold {{ reviewObj.xy_customer }}
                  span 位客户完成了
                  .text-bold {{ reviewObj.xy_contract }}
                  span 笔合同
              .words-bg(:style="{ height: wordsBgHeight + 'px' }")
                .flex-row
                  span 提供了
                  .text-bold {{ reviewObj.xy_search }}
                  span 次物资的搜索与比价
              .words-bg(:style="{ height: wordsBgHeight + 'px' }")
                .flex-row
                  span 不忘初心、至臻服务
              .words-bg(:style="{ height: wordsBgHeight + 'px' }")
                .flex-row
                  span 请您告诉型云，理想的诗和远方。
              .checkbox-bg.flex-column
                label.flex-row(v-for="item in opinionList", :key="item.id")
                  input(
                    type="checkbox",
                    :value="item.value",
                    v-model="pickedOpinions"
                  )
                  span {{ item.value }}
              .textarea-bg(:style="{ height: textareaBgHeight + 'px' }")
                span.text-center 其他希望的内容
                textarea(v-model="writeOpinion", @blur="autoScroll")
              .confirm-btn(
                :style="{ height: confirmBtnHeight + 'px' }",
                @click="getOpinions"
              )
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page7-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .content-bg.flex-column.text-center.lh-30.font-15
            .flex-row
              .font-25.mr-3 {{ reviewObj.days }}
              span 个日日夜夜
            .flex-row
              .font-25.mr-3 {{ reviewObj.days * 8 }}
              span 个小时的采钢服务
            span 这就是最长情的陪伴
            .font-35.lh-47 {{ titleInfo(reviewObj.all_weight) }}
            span 非您莫属
          .page7-pic(:class="titleBkg")
      swiper-slide
        .banner-bg.border-box.full-width.padding-xl.relative.page8-bkg(
          :style="{ height: screenHeight + 'px' }"
        )
          .page8-content-bg.relative
            .flex-column.text-center.text-brown
              .font-15 2020第三季度我的钢圈称号是
              .page8-title {{ titleInfo(reviewObj.all_weight) }}
              .font-15 点击查看属于
              .font-15 自己的钢圈称号吧
            .dotted
            .check-btn(@click="clickToShare")
          img.qrcode.animated.fadeIn(
            src="../assets/imgs/qrcode.jpg",
            style="animation-duration: 1.5s; animation-delay: 1s"
          )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import music from "@/components/Music.vue";
import echarts from "echarts";
import shareModal from "@/components/ShareModal.vue";
// eslint-disable-next-line
let self: any;
@Component({
  components: {
    music,
    shareModal
  }
})
class ReviewPageThird extends Vue {
  showPage = false;
  wxShareTitle = "型云季度回顾";
  wxShareDesc = "型云分享描述";
  // eslint-disable-next-line
  echarts: any = echarts;
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
  registerYear = "2020";
  registerMonth = "01";
  registerDay = "01";
  opinionList = [
    { id: 0, value: "希望增加更多型钢配套物资" },
    { id: 1, value: "希望增加远期订货服务" },
    { id: 2, value: "希望增加仓单质押服务" },
    { id: 3, value: "希望增加特价竞拍服务" }
  ];
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
        "&recordTime=2020Q3",
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
        setTimeout(function() {
          self.setChart();
        }, 300);
        self.registerYear = self.reviewObj.register_time.substr(0, 4);
        self.registerMonth = self.reviewObj.register_time.substr(5, 2);
        self.registerDay = self.reviewObj.register_time.substr(8, 2);
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
  async getOpinions() {
    self = this;
    if (self.pickedOpinions.length == 0 && self.writeOpinion == "") {
      self.$alert.show({ msg: "请输入相关意见" });
    } else {
      let opinionStr = self.pickedOpinions.join(",");
      opinionStr = opinionStr + "," + self.writeOpinion;
      console.log(opinionStr);
      const paramObj = {
        custNo: self.custNo,
        recordTime: "2020Q3",
        key: "wish",
        value: opinionStr
      };
      const data = await self.ironRequest(
        "promote/choose.shtml",
        paramObj,
        "post"
      );
      if (data.returncode == "0") {
        self.$alert.show({ msg: data.errormsg });
      }
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

  //点击提示分享至朋友圈
  clickToShare() {
    self.$alert.show({ msg: "点击右上角分享至朋友圈" });
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
  // 画饼图
  setChart() {
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
          top: 15,
          type: "pie",
          radius: ["30%", "53%"],
          minAngle: 25,
          // avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            formatter: "{a|{b}}\n{hr|}\n  {per|{d}%}  ",
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
          color: [
            "#C5EAFF",
            "#86E8E7",
            "#C3F8CD",
            "#9EE4AF",
            "#70DB93",
            "#32CD99"
          ],
          data: this.chartData
        }
      ]
    });
  }
}
export default ReviewPageThird;
</script>
<style lang="stylus" scoped>
vm(val)
  return (val / 375) * 100vw
vh(val)
  return (val / 667) * 100vh
.flex-column
  display flex
  flex-direction column
.flex-row
  display flex
  flex-direction row
  align-items baseline
  justify-content center
.font-13
  font-size vm(13)
.font-15
  font-size vm(15)
.font-25
  font-size vm(25)
.font-35
  font-size vm(35)
.lh-30
  line-height vh(30)
.lh-34
  line-height vh(34)
.lh-47
  line-height vh(47)
.ml-3
  margin-left vm(3)
.mr-3
  margin-right vm(3)
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
    url('http://xymobile.xingyun361.com/bg_1_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_1.png') 2x
  )
  .pic-1
    background-image url('http://xymobile.xingyun361.com/pic_1.png')
    background-size 100% 100%
    background-repeat no-repeat
    width vm(209)
    height vh(225)
    position absolute
    bottom vh(52)
    left vm(93)
.page2-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/bg_2_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_2.png') 2x
  )
  .charts-style
    width vm(335)
    height vh(210)
.page3-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/bg_3_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_3.png') 2x
  )
.page4-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/bg_4_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_4.png') 2x
  )
.page5-bkg
  background -webkit-image-set(
    url('http://xymobile.xingyun361.com/bg_5_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_5.png') 2x
  )
  .pic-8-space
    width vm(330)
    // height vh(560)
    margin vh(24) auto
    z-index 9
    .pic-8
      background-image url('http://xymobile.xingyun361.com/pic_8.png')
      background-size 100% 100%
      background-repeat no-repeat
      width 100%
      height 100%
      padding vh(22) 0
      overflow hidden
      .words-bg
        width vm(240)
        // height vh(21)
        // line-height vh(21)
        display flex
        justify-content center
        align-item center
        background #E3DAC9
        margin vh(4) auto 0
      .checkbox-bg
        width vm(205)
        padding vh(16) 0
        margin 0 auto
        align-items flex-start
        label
          align-items center
          padding vh(4) 0
          span
            margin-left vm(8)
      .textarea-bg
        width vm(210)
        // height vh(90)
        background-color #E3DBCA
        margin 0 auto
        padding-top vh(10)
        z-index 9
        textarea
          -webkit-user-select auto
          contenteditable true
          width 80%
          height 60%
          background none
          outline none
          border none
          margin-top vh(4)
          z-index 999
      .confirm-btn
        background-image url('http://xymobile.xingyun361.com/confirm_btn.png')
        background-size 100% 100%
        background-repeat no-repeat
        width vm(89)
        // height vh(27)
        margin vh(13) auto 0
.page6-bkg
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
    url('http://xymobile.xingyun361.com/bg_7_1x.png') 1x,
    url('http://xymobile.xingyun361.com/bg_7.png') 2x
  )
  .content-bg
    width vm(254)
    padding vh(25) 0
  .page7-pic
    &.first
      background-image url('http://xymobile.xingyun361.com/pic_2.png')
      background-size cover
      width vm(257)
      height vh(242)
      margin vh(28) auto 0
    &.second
      background-image url('http://xymobile.xingyun361.com/pic_3.png')
      background-size cover
      width vm(271)
      height vh(256)
      margin vh(23) auto 0
    &.third
      background-image url('http://xymobile.xingyun361.com/pic_4.png')
      background-size cover
      width vm(273)
      height vh(246)
      margin vh(37) auto 0
    &.forth
      background-image url('http://xymobile.xingyun361.com/pic_5.png')
      background-size cover
      width vm(235)
      height vh(258)
      margin vh(20) auto 0
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
