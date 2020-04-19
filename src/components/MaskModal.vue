<template lang="pug">
.xy-modal(v-if="value", @click="hideMask", :class="{'animated fadeInUp': (value && animate)}")
  slot
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
class MaskModalPage extends Vue {
  @Prop({ default: false }) value: boolean;
  @Prop({ default: false }) animate: boolean;
  hideMask() {
    this.$emit("input", false);
  }
}
export default MaskModalPage;
</script>

<style lang="stylus" scoped>
.xy-modal
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0, 0, 0, 0.6)
  z-index 9998
</style>
