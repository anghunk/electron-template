<template>
  <div class="home-container">
    <div class="home-content">
      <div class="logo-wrapper">
        <el-icon :size="40" color="#fff">
          <Lightning />
        </el-icon>
      </div>

      <h1 class="title">Electron 模板</h1>

      <p class="description">
        一个现代化的 Electron 应用模板，集成 Vue3、Vite 和 Element Plus。
      </p>

      <div class="version-wrapper">
        <el-tag type="primary" size="large">v{{ version }}</el-tag>
      </div>

      <div class="button-group">
        <el-button type="primary" size="large">开始使用</el-button>
        <el-button size="large">了解更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Lightning } from "@element-plus/icons-vue";

export default {
  name: "Home",
  components: {
    Lightning,
  },
  data() {
    return {
      version: "",
    };
  },
  async mounted() {
    this.version = await window.api.getAppVersion();
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/home.less";
</style>
