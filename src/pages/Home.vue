<template>
  <div class="home-container">
    <div class="home-content">
      <div class="logo-wrapper">
        <img src="@/assets/images/icon.png" alt="logo" />
      </div>

      <h1 class="title">Electron Template</h1>

      <p class="description">
        一个现代化的 Electron 应用模板，集成 Vue3、Vite 和 Element Plus。
      </p>

      <div class="version-wrapper">
        <el-tag type="primary" size="large">v{{ version }}</el-tag>
      </div>

      <div class="button-group">
        <el-button type="primary" size="large">开始使用</el-button>
        <a href="https://github.com/anghunk/electron-template" target="_blank">
          <el-button size="large">了解更多</el-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
