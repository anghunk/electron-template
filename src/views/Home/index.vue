<template>
  <div class="h-full flex flex-col items-center justify-center bg-background">
    <div
      class="text-center p-10"
    >
      <div
        class="w-20 h-20 rounded-theme flex items-center justify-center mx-auto mb-6 bg-fill-light shadow-logo"
      >
        <img src="@/assets/images/icon.png" alt="logo" class="w-full" />
      </div>
      <h1 class="font-heading text-[28px] font-bold text-text mb-4">Electron Template</h1>
      <p class="text-secondary max-w-[400px] mx-auto mb-6 leading-relaxed text-[15px]">
        一个现代化的 Electron 应用模板，集成 Vue3、Vite 和 Element Plus。
      </p>
      <div class="flex gap-4 justify-center">
        <el-button type="primary" size="large">开始使用</el-button>
        <a
          href="https://github.com/anghunk/electron-template"
          target="_blank"
          class="no-underline"
        >
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
    return {};
  },
};
</script>
