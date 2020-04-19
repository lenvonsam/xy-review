<template lang="pug">
.music.banner-bg.animated.rotate.infinite(:class="{stop: !toggleMusic}", @click="changeMusic")
  audio(src="http://xymobile.xingyun361.com/share_music.mp3", style="opacity: 0", ref="musicAudio", loop,preload)
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
let me: any;
@Component
class MusicComponent extends Vue {
  toggleMusic = false;
  beforeMount() {
    me = this;
    this.$nextTick(function() {
      me.toggleMusic = me.mobileVersion() === "and";
      console.log("togglemusic:>>", me.toggleMusic);
      if (me.toggleMusic) {
        me.$refs.musicAudio.pause();
        console.log("music audio", me.$refs.musicAudio);
        me.$refs.musicAudio.play();
      }
    });
  }
  changeMusic() {
    this.toggleMusic = !this.toggleMusic;
    if (this.toggleMusic) {
      me.$refs.musicAudio.pause();
      me.$refs.musicAudio.play();
    } else {
      me.$refs.musicAudio.pause();
    }
  }
}
export default MusicComponent;
</script>

<style lang="stylus" scoped>
.music
  background-image url('../assets/imgs/music.png')
  width 40px
  height 40px
  position absolute
  z-index 100
  right 10px
  top 10px
  &.rotate
    animation-name anrotate
    animation-duration 2s
    animation-timing-function linear
    // animation-play-state paused
    &.stop
      animation-play-state paused
@keyframes anrotate
  from
    transform rotate(0deg)
    -webkit-transform rotate(0deg)
    -moz-transform rotate(0deg)
  to
    transform rotate(-360deg)
    -webkit-transform rotate(-360deg)
    -moz-transform rotate(-360deg)
</style>
