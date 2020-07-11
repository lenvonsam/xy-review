<template lang="pug">
mask-modal(v-model="localShow")
  .box
    .box-inner
      .title {{msg}}
      .extra-bar(v-if="extraJump", @click="alertResp($event, 'extra')") 无手机号继续查看
      .bottom(@click="alertResp($event, 'confirm')", :style="{marginTop: extraJump ? '15px' : '45px'}")
        .btn {{btnText}}
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import maskModal from "@/components/MaskModal.vue";
@Component({
  components: {
    maskModal
  }
})
class AlertModal extends Vue {
  @Prop({ default: false }) value: boolean;
  @Prop({ default: "友情提示" }) title: string;
  @Prop({ default: "" }) msg: string;
  @Prop({ default: "确定" }) btnText: string;
  @Prop({ default: false }) extraJump: boolean;
  localShow = false;
  @Watch("value", { immediate: true })
  changeShow(newVal: boolean) {
    this.localShow = newVal;
  }
  @Watch("localShow")
  changeLocalShow(newVal: boolean) {
    this.$emit("input", newVal);
  }
  alertResp(e: any, type: string) {
    e.stopPropagation();
    this.$emit("resp", { type });
    this.localShow = false;
  }
}
export default AlertModal;
</script>

<style lang="stylus" scoped>
.xy-modal
  .box
    width 269px
    height 302px
    background #fff
    position relative
    top calc(((100% - 302px) / 2) - 50px)
    z-index 9999
    margin 0 auto
    border-radius 5px
    padding-top 39px
    .box-inner
      width 255px
      min-height 270px
      margin 0 auto
      background-image url('../assets/imgs/alert_rect.png')
      background-size contain
      background-repeat no-repeat
      box-sizing border-box
      padding-top 106px
      .title
        margin 0 auto
        width 150px
        text-align center
        font-size 18px
        height 60px
        overflow hidden
        color #262626
        font-weight 400
      .extra-bar
        width 220px
        height 38.5px
        margin 0 auto
        background-image url('../assets/imgs/review_modal_info_bar.png')
        background-size cover
        color #4d70b5
        text-align center
        font-size 18px
        padding-top 10px
        box-sizing border-box
      .bottom
        margin-top 45px
        .btn
          margin 0 auto
          border-radius 23px
          height 45px
          width 160px
          background #6994F4
          font-size 19px
          font-weight bold
          letter-spacing 2px
          display flex
          align-items center
          justify-content center
          color #fff
</style>
