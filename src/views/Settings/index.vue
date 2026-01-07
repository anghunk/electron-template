<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-heading font-bold text-text mb-6">设置</h1>

    <div class="bg-surface rounded-lg border border-border-light p-6 space-y-4">
      <!-- 窗口行为设置 -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold text-text">窗口行为</h2>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="text-sm text-secondary flex items-center gap-2">
              关闭窗口时最小化到托盘
              <el-tooltip effect="dark" placement="right">
                <template #content>
                  <div class="tooltip-content">
                    启用后，点击关闭按钮会将窗口隐藏到系统托盘，而不是退出应用。<br>
                    禁用后，点击关闭按钮将直接退出应用。
                  </div>
                </template>
                <PhInfo :size="16" />
              </el-tooltip>
            </div>
            <el-switch v-model="settings.closeToTray" @change="handleSaveSettings" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      settings: {
        closeToTray: true,
      },
    };
  },
  async mounted() {
    await this.loadSettings();
  },
  methods: {
    async loadSettings() {
      try {
        const settings = await window.api.getSettings();
        this.settings = settings;
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    },
    async handleSaveSettings() {
      try {
        // 将 Vue 响应式对象转换为纯对象
        const plainSettings = JSON.parse(JSON.stringify(this.settings));
        await window.api.saveSettings(plainSettings);
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    },
  },
};
</script>
