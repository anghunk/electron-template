<template>
  <div class="title-bar" style="-webkit-app-region: drag">
    <div class="title-text">Electron Template</div>
    <div class="window-controls" style="-webkit-app-region: no-drag">
      <el-button @click="minimize" :icon="Minus" text class="control-btn" />
      <el-button @click="maximize" :icon="FullScreen" text class="control-btn" />
      <el-button @click="close" :icon="Close" text class="control-btn close-btn" />
    </div>
  </div>
</template>

<script>
import { Minus, FullScreen, Close } from "@element-plus/icons-vue";

export default {
  name: "TitleBar",
  components: {
    Minus,
    FullScreen,
    Close,
  },
  data() {
    return {
      Minus,
      FullScreen,
      Close,
    };
  },
  methods: {
    minimize() {
      window.api.minimize();
    },
    maximize() {
      window.api.maximize();
    },
    close() {
      window.api.close();
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/components/titlebar.less";
</style>
