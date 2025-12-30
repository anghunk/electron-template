<template>
  <div class="layout-title">关于</div>
  <div>
    <!-- 应用信息 -->
    <div class="mb-6 bg-surface rounded-lg border border-border-light p-6">
      <h2 class="text-lg font-semibold text-text mb-4">应用信息</h2>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-secondary">应用名称：</span>
          <span class="text-text font-medium">Electron Template</span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">版本号：</span>
          <span class="text-text font-medium">v{{ version }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">邮箱：</span>
          <span class="text-text font-medium">
            <a
              href="mailto:anghunk@gmail.com"
              target="_blank"
              class="text-primary no-underline transition-colors duration-200 hover:text-accent"
            >
              anghunk@gmail.com
            </a>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">开发团队：</span>
          <span class="text-text font-medium">
            <a
              href="https://github.com/anghunk"
              target="_blank"
              class="text-primary no-underline transition-colors duration-200 hover:text-accent"
            >
              https://github.com/anghunk
            </a>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">Github：</span>
          <span class="text-text font-medium">
            <a
              href="https://github.com/anghunk/electron-template"
              target="_blank"
              class="text-primary no-underline transition-colors duration-200 hover:text-accent"
            >
              https://github.com/anghunk/electron-template
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
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
