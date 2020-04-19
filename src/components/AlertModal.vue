<template lang="pug">
mask-modal(v-model="localShow")
  .box
    .title
      .col {{title}}
      .close(@click="alertResp($event, 'close')")
    .content
      .content-box {{msg}}
    .bottom(@click="alertResp($event, 'confirm')")
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
    width 300px
    height 233px
    background-image url('../assets/imgs/alert_rect.png')
    background-size cover
    background-position 100% 100%
    margin 0 auto
    position relative
    top calc(((100% - 233px) / 2) - 50px)
    z-index 9999
    .title
      position relative
      display flex
      align-items center
      height 42px
      overflow hidden
      color #fff
      padding-left 15px
      font-weight 400
      .close
        top 3px
        right 12px
        position absolute
        width 45px
        height 21px
        background-image url('../assets/imgs/alert_close_icon.png')
        background-size cover
        background-position 100% 100%
    .content
      height 125px
      box-sizing border-box
      display flex
      align-items center
      justify-content center
      .content-box
        width 240px
        min-height 50px
        color #262626
        font-size 22px
        font-weight bold
        letter-spacing 1px
        line-height 28px
        max-height 125px
        overflow hidden
    .bottom
      height 45px
      .btn
        margin 0 auto
        border-radius 3px
        height 35px
        width 94px
        background #6000C6
        font-size 16px
        display flex
        align-items center
        justify-content center
        color #fff
</style>
