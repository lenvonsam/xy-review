<template lang="pug">
mask-modal(v-model="localShow", :animate="true")
  .wrapper
    .mask-ellipse.banner-bg
      .arrow.banner-bg
      div 点击右上角“···”
      div 分享给您的好友吧~
    .share-btn.banner-bg
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import maskModal from "@/components/MaskModal.vue";
@Component({
  components: {
    maskModal
  }
})
class ShareModal extends Vue {
  @Prop({ default: false }) value: boolean;
  localShow = false;
  @Watch("value", { immediate: true })
  changeShow(newVal: boolean) {
    this.localShow = newVal;
  }
  @Watch("localShow")
  changeLocalShow(newVal: boolean) {
    this.$emit("input", newVal);
  }
}
export default ShareModal;
</script>

<style lang="stylus" scoped>
.wrapper
  position relative
  height 100vh
  overflow hidden
  z-index 20
.mask-ellipse
  width 212px
  height 69px
  background-image url('../assets/imgs/share_ellipse.png')
  color #fff
  position relative
  left calc(((100% - 212px) / 2))
  top 30%
  font-weight bold
  box-sizing border-box
  display flex
  flex-direction column
  align-items center
  justify-content center
  .arrow
    position absolute
    background-image url('../assets/imgs/share_arrow.png')
    width 57.5px
    height 122.5px
    right 0px
    top -120px
    right -55px
.share-btn
  width 132.5px
  height 69.5px
  position absolute
  bottom 20%
  left calc(((100% - 132.5px) / 2))
  background-image url('../assets/imgs/share_btn.png')
@media screen and (width 320px)
  .mask-ellipse
    width 180px
    height 58.6px
    font-size 12px
    left calc(((100% - 180px) / 2))
    .arrow
      width 45px
      height 96px
      top -90px
      right -43px
</style>
