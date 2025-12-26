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

      <div class="button-group">
        <el-button type="primary" size="large">开始使用</el-button>
        <a href="https://github.com/anghunk/electron-template" target="_blank">
          <el-button size="large">了解更多</el-button>
        </a>
      </div>

      <!-- DaisyUI 测试组件 -->
      <div class="mt-8 space-y-4">
        <button class="btn btn-primary">DaisyUI 主按钮</button>
        <button class="btn btn-secondary">DaisyUI 次按钮</button>
        <button class="btn btn-accent">DaisyUI 强调按钮</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/page/home.less";
</style>
