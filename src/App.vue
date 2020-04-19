<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
class AppPage extends Vue {
  @Action("setConfig") setConfig: any;
  time: any;
  beforeMount() {
    this.setConfig({ key: "screenWidth", val: window.innerWidth });
    this.setConfig({ key: "screenHeight", val: window.innerHeight });
  }
}
export default AppPage;
</script>

<style lang="stylus">
@import './assets/stylus/comm'
#app
  color #262626
</style>
